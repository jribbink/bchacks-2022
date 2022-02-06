"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const message_type_1 = require("shared/enum/message-type");
const messages_1 = require("shared/messages");
const wss = new ws_1.WebSocketServer({
    port: 8080,
    perMessageDeflate: {
        zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        serverMaxWindowBits: 10,
        // Below options specified as default values.
        concurrencyLimit: 10,
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
    }
});
const entityList = {};
const clientList = {};
function broadcast(message) {
    if (message instanceof Function) {
        for (let id in clientList) {
            clientList[id].send(message(id));
        }
    }
    else {
        for (let id in clientList) {
            clientList[id].send(message);
        }
    }
}
function getUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
}
wss.on('connection', (ws) => {
    const id = getUniqueID();
    clientList[id] = ws;
    ws.on('message', (rawdata) => {
        const data = JSON.parse(rawdata.toString());
        switch (data.type) {
            case message_type_1.MessageType.PLAYER_UPDATE:
                const message = data;
                let player = message.player;
                player.id = id;
                entityList[id] = player;
                broadcast((id) => {
                    return JSON.stringify(new messages_1.EntityListUpdateMessage({
                        entities: Object.values(entityList).filter(entity => {
                            return entity.id != id;
                        })
                    }));
                });
                break;
        }
    });
    ws.on('close', (code, reason) => {
        delete clientList[id];
    });
    ws.send(JSON.stringify(new messages_1.EntityListUpdateMessage({ entities: Object.values(entityList) })));
});
