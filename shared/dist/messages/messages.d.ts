import { MessageType } from "../enum/message-type";
import { Player } from '../models/player';
export declare abstract class Message {
    abstract type: MessageType;
}
export declare class PlayerUpdateMessage extends Message {
    type: MessageType;
    player?: Player;
    constructor(data: Partial<PlayerUpdateMessage>);
}
export declare class EntityListUpdateMessage extends Message {
    type: MessageType;
    entities?: Player[];
    constructor(data: Partial<EntityListUpdateMessage>);
}
//# sourceMappingURL=messages.d.ts.map