import { Message } from "./message";
import { MessageType } from "../enum/message-type";
import { Player } from '../models/player'

export class PlayerIdentificationMessage extends Message {
    type: MessageType = MessageType.PLAYER_IDENTIFICATION
    id?: string

    constructor(data: Partial<PlayerIdentificationMessage>) {
        super()
        Object.assign(this, data)
    }
}
