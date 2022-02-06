import { WebSocketServer, WebSocket } from "ws";
import { Player } from 'shared/models'
import { MessageType } from 'shared/enum/message-type'
import { EntityListUpdateMessage } from 'shared/messages/entity-list-update'
import { PlayerIdentificationMessage } from 'shared/messages/player-identification'
import { PlayerUpdateMessage } from 'shared/messages/player-update'
import { RopeFireMessage } from 'shared/messages/rope-fire'
import { NameListUpdateMessage } from 'shared/messages/name-list-update'

const wss = new WebSocketServer({
    port: 4221,
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

let entityChanges = true;
const entityList: {[id:string]:Player} = {};
const clientList: {[id:string]:WebSocket} = {};
const nameList: {[id:string]:string} = {};

function broadcast(message: ((id: string) => string) | string, excludeId?: string) {
    if (message instanceof Function) {
        for (let id in clientList) {
            if(id != excludeId) clientList[id].send(message(id));
        }
    }
    else {
        for (let id in clientList) {
            if(id != excludeId) clientList[id].send(message);
        }
    }
}

function getUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
}

let idd = 0;

wss.on('connection', (ws) => {
    const id = getUniqueID();
    clientList[id] = ws;

    ws.on('message', (rawdata) => {
        const data = JSON.parse(rawdata.toString());
        switch (data.type) {
            case MessageType.PLAYER_UPDATE:
                const updateMessage: PlayerUpdateMessage = data;
                let player = updateMessage.player!!;
                player.id = id;

                entityList[id] = player;

                broadcast((id: string) => {
                    return JSON.stringify(new EntityListUpdateMessage({
                        entities: Object.values(entityList).filter(entity => {
                            return entity.id != id;
                        })
                    }))
                })
                break;
            case MessageType.ROPE_FIRE:
                const ropeFireMessage: RopeFireMessage = data
                broadcast(rawdata.toString(), id)
                break;
            case MessageType.PLAYER_IDENTIFICATION:
                const identificationMessage: PlayerIdentificationMessage = data
                nameList[id] = identificationMessage.id!!.toUpperCase()
                break;
        }
    });

    ws.on('close', (code, reason) => {
        delete clientList[id]
        delete entityList[id]
        delete nameList[id]
    });

    ws.send(JSON.stringify(new PlayerIdentificationMessage({id: id})))
    ws.send(JSON.stringify(new EntityListUpdateMessage({entities: Object.values(entityList)})))
});

const broadcastNames = () => {
    broadcast(JSON.stringify(new NameListUpdateMessage({nameList})))
    setTimeout(broadcastNames, 500)
}
broadcastNames()


/*const now = () => {
    const hrTime = process.hrtime();
    return hrTime[0] * 1000000 + hrTime[1] / 1000;
};
let startTime = now()
function stateLoop () {
    
    setImmediate(stateLoop)
}
stateLoop()*/