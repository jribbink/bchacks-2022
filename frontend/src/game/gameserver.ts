import { Game } from "./game"
import { Message } from 'shared/messages'
import { EntityListUpdateMessage } from 'shared/messages/entity-list-update'
import { PlayerIdentificationMessage } from 'shared/messages/player-identification'
import { MessageType } from "shared/enum/message-type"
import { Player as PlayerData } from 'shared/models/player'
import { Player } from "./entities/player"
import { PlayerUpdateMessage } from 'shared/messages/player-update'

export class GameServer {
    public static readonly updateFrequencyMs: number = 30

    private ws: WebSocket
    private game: Game
    public rollingDelta: number

    constructor (game: Game) {
        this.game = game
        this.ws = new WebSocket(`ws://${window.location.hostname}:8080`)
        this.ws.onopen = (e:Event) => {
            console.log("Websocket Connected!")
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
                    let entityListMessage: EntityListUpdateMessage = message

                    //console.log("entity list ", entityListMessage)
                    game.entityList.forEach((entity) => {
                        if(entity instanceof Player) {
                            const entityDataIndex = entityListMessage.entities!!.findIndex(e => e.id === entity.id)
                            if(entityDataIndex == -1) return;
                            const entityData = entityListMessage.entities[entityDataIndex]
                            entity.x = entityData.x
                            entity.y = entityData.y
                            entityListMessage.entities!!.splice(entityDataIndex, 1)
                        }
                    })

                    entityListMessage.entities.forEach(entity => {
                        const newEntity = new Player(this.game, entity.id)
                        newEntity.x = entity.x
                        newEntity.y = entity.y
                        this.game.entityList.push(newEntity)
                    })
                    break;
            }
        }
    }

    updatePosition(delta: number) {
        this.rollingDelta += delta
        if(this.rollingDelta < GameServer.updateFrequencyMs) return;
        if(this.ws.readyState != WebSocket.OPEN) return

        const message = new PlayerUpdateMessage({player: { x: this.game.localPlayer.x, y: this.game.localPlayer.y }})
        this.ws.send(JSON.stringify(message))
    }
}