import { Message } from "./message";
import { MessageType } from "../enum/message-type";

export class RopeFireMessage extends Message {
    type: MessageType = MessageType.ROPE_FIRE
    player_id?: string
    angle?: number
    time_fired?: number

    constructor(data: Partial<RopeFireMessage>) {
        super()
        Object.assign(this, data)
    }
}
