import { Message } from "./message";
import { MessageType } from "../enum/message-type";
import { Player } from '../models/player'

export class NameListUpdateMessage extends Message {
    type: MessageType = MessageType.NAME_LIST_UPDATE
    nameList?: {[id:string]:string}

    constructor(data: Partial<NameListUpdateMessage>) {
        super()
        Object.assign(this, data)
    }
}