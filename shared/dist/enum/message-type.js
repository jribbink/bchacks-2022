"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["PLAYER_UPDATE"] = 0] = "PLAYER_UPDATE";
    MessageType[MessageType["ENTITY_LIST_UPDATE"] = 1] = "ENTITY_LIST_UPDATE";
    MessageType[MessageType["PLAYER_IDENTIFICATION"] = 2] = "PLAYER_IDENTIFICATION";
    MessageType[MessageType["ROPE_FIRE"] = 3] = "ROPE_FIRE";
    MessageType[MessageType["ROPE_HIT"] = 4] = "ROPE_HIT";
    MessageType[MessageType["NAME_LIST_UPDATE"] = 5] = "NAME_LIST_UPDATE";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
