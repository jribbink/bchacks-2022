import { Message } from "./message";
import { MessageType } from "../enum/message-type";
import { Player } from '../models/player'

export class EntityListUpdateMessage extends Message {
    type: MessageType = MessageType.ENTITY_LIST_UPDATE
    entities?: Player[]

    constructor(data: Partial<EntityListUpdateMessage>) {
        super()
        Object.assign(this, data)
    }
}