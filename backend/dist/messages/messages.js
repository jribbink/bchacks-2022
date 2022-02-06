"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityListUpdateMessage = exports.PlayerUpdateMessage = exports.Message = void 0;
const message_type_1 = require("../enum/message-type");
class Message {
}
exports.Message = Message;
class PlayerUpdateMessage extends Message {
    constructor(data) {
        super();
        this.type = message_type_1.MessageType.PLAYER_UPDATE;
        Object.assign(this, data);
    }
}
exports.PlayerUpdateMessage = PlayerUpdateMessage;
class EntityListUpdateMessage extends Message {
    constructor(data) {
        super();
        this.type = message_type_1.MessageType.ENTITY_LIST_UPDATE;
        Object.assign(this, data);
    }
}
exports.EntityListUpdateMessage = EntityListUpdateMessage;
