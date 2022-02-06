import { Message } from "./message";
import { MessageType } from "../enum/message-type";
import { Player } from '../models/player'

export class PlayerUpdateMessage extends Message {
    type: MessageType = MessageType.PLAYER_UPDATE
    player?: Player

    constructor(data: Partial<PlayerUpdateMessage>) {
        super()
        Object.assign(this, data)
    }
}
