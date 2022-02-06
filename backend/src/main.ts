import { WebSocketServer, WebSocket } from "ws";
import { Player } from 'shared/models'
import { MessageType } from 'shared/enum/message-type'
import { EntityListUpdateMessage } from 'shared/messages'

const wss = new WebSocketServer({
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

const entityList: {[id:string]:Player} = {};
const clientList: {[id:string]:WebSocket} = {};

function broadcast(message: (id: string) => string | string) {
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
            case MessageType.PLAYER_UPDATE:
                const message = data;
                let player = message.player;
                player.id = id;
                entityList[id] = player;

                broadcast((id: string) => {
                    return JSON.stringify(new EntityListUpdateMessage({
                        entities: Object.values(entityList).filter(entity => {
                            return entity.id != id;
                        })
                    }))
                });
                break;
        }
    });

    ws.on('close', (code, reason) => {
        delete clientList[id];
    });

    ws.send(JSON.stringify(new EntityListUpdateMessage({entities: Object.values(entityList)})))
});
