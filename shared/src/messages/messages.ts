import { MessageType } from "../enum/message-type";
import { Player } from '../models/player'

export abstract class Message {
    abstract type: MessageType
}