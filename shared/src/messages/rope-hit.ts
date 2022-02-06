import { Message } from "./message";
import { MessageType } from "../enum/message-type";

export class RopeHitMessage extends Message {
    type: MessageType = MessageType.ROPE_HIT
    sender_id?: string
    target_id?: string
    time_fired?: number

    constructor(data: Partial<RopeHitMessage>) {
        super()
        Object.assign(this, data)
    }
}