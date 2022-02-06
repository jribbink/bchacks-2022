"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDSocket = void 0;
const ws_1 = require("ws");
class IDSocket extends ws_1.WebSocket {
    constructor(url, protocols) {
        super(url, protocols);
    }
    getUniqueID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        this.id = s4() + s4() + '-' + s4();
    }
}
exports.IDSocket = IDSocket;
