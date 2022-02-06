import { Game } from "./game"
import { MessageType } from "shared/enum/message-type"
import { Player as PlayerData } from 'shared/models/player'
import { Player } from "./entities/player"
import { Rope, RopeState } from "./entities"

import { Message } from 'shared/messages'
import { EntityListUpdateMessage } from 'shared/messages/entity-list-update'
import { PlayerIdentificationMessage } from 'shared/messages/player-identification'
import { PlayerUpdateMessage } from 'shared/messages/player-update'
import { RopeFireMessage } from 'shared/messages/rope-fire'

export class GameServer {
    public static readonly updateFrequencyMs: number = 5

    private ws: WebSocket
    private game: Game
    public rollingDelta: number
    public connected = false

    constructor (game: Game) {
        this.game = game
        this.ws = new WebSocket(`ws://${window.location.hostname}:8080`)
        this.ws.onopen = (e:Event) => {
            console.log("Websocket Connected!")
            this.connected = true
        }
        this.ws.onmessage = (e: MessageEvent) => {
            const message: Message = JSON.parse(e.data)
            switch(message.type) {
                case MessageType.PLAYER_IDENTIFICATION:
                    let playerIdentification: PlayerIdentificationMessage = message
                    game.localPlayer.id = playerIdentification.id
                    console.log("Local player id:", game.localPlayer.id)
                    break;
                case MessageType.ENTITY_LIST_UPDATE:
                    if (!game.loaded) break

                    let entityListMessage: EntityListUpdateMessage = message

                    //console.log("entity list ", entityListMessage)
                    let clients_dropped: Player[] = []
                    game.entityList.forEach((entity, idx) => {
                        if(entity instanceof Player && this.game.localPlayer != entity) {
                            const entityDataIndex = entityListMessage.entities!!.findIndex(e => e.id === entity.id)
                            if(entityDataIndex == -1) {
                                console.log("Client dropped! id:", entity.id)
                                clients_dropped.push(entity)
                                return
                            }
                            const entityData = entityListMessage.entities[entityDataIndex]
                            entity.x = entityData.x
                            entity.y = entityData.y
                            entity.status = entityData.status
                            entityListMessage.entities!!.splice(entityDataIndex, 1)
                        }
                    })

                    clients_dropped.forEach(client => {
                        game.entityList.splice(game.entityList.indexOf(client), 1)
                    })

                    entityListMessage.entities.forEach(entity => {
                        const newEntity = new Player(this.game, entity.id)
                        newEntity.x = entity.x
                        newEntity.y = entity.y
                        newEntity.status = entity.status
                        this.game.entityList.push(newEntity)
                    })
                    break;
                case MessageType.ROPE_FIRE:
                    if (!game.loaded) break;
                    
                    let ropeFireMessage: RopeFireMessage = message
                    let entityId = game.entityList.findIndex(e => e instanceof Player && e.id == ropeFireMessage.player_id);

                    let rope = new Rope(game.entityList[entityId] as Player);
                    rope.length = 0;
                    rope.angle = ropeFireMessage.angle
                    rope.state = RopeState.EXTENDING;
                    game.entityList.push(rope)
                    break;
            }
        }
    }

    updatePosition (delta: number) {
        this.rollingDelta += delta
        if(this.rollingDelta < GameServer.updateFrequencyMs) return;
        if(this.ws.readyState != WebSocket.OPEN) return

        const message = new PlayerUpdateMessage({
            player: {
                x: this.game.localPlayer.x,
                y: this.game.localPlayer.y,
                status: this.game.localPlayer.status,
            }
        })
        this.ws.send(JSON.stringify(message))
        this.rollingDelta -= GameServer.updateFrequencyMs
    }

    throwLasso (rope: Rope) {
        const message = new RopeFireMessage({
            player_id: (rope.owner as Player).id,
            angle: rope.angle,
            time_fired: undefined,
        })
        this.ws.send(JSON.stringify(message))
    }
}