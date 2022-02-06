import { Game } from "./game"
import { EntityListUpdateMessage, Message } from 'shared/messages'
import { MessageType } from "shared/enum/message-type"
import { Player as PlayerData } from 'shared/models/player'
import { Player } from "./entities/player"

export class GameServer {
    private ws: WebSocket

    constructor (game: Game) {
        this.ws = new WebSocket(`ws://${window.location.hostname}:8080`)
        this.ws.onopen = (e:Event) => {
            console.log("Websocket Connected!")
        }
        this.ws.onmessage = (e: MessageEvent) => {
            const message: Message = JSON.parse(e.data)
            switch(message.type) {
                case MessageType.ENTITY_LIST_UPDATE:
                    const m: EntityListUpdateMessage = message
                    game.entityList.forEach((entity) => {
                        if(entity instanceof Player) {
                            ////const entityDataIndex = m.entities!!.findIndex()
                        }
                    })
                    break;
            }
        }
    }
}