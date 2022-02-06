import { WebSocketServer } from "ws"
import { MessageType } from "./enum/message-type";
import { EntityListUpdateMessage, Message, PlayerUpdateMessage } from './messages'
import { Player } from './models/player'
import { IDSocket } from './models/id-socket'

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
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
    }
});

const entityList: {[id:string]:Player} = {}
const clientList: {[id:string]:IDSocket} = {}

function broadcast (message: (id: string) => string | any) {
    if(message instanceof Function) {
        for (let id in clientList) {
            clientList[id].send(message(id))
        }
    } else {
        for (let id in clientList) {
            clientList[id].send(message)
        }
    }
}

wss.on('connection', (ws: IDSocket) => {
    console.log(ws.id)
    clientList[ws.id] = ws

    ws.on('message', (data: Message) => {
        switch (data.type) {
            case MessageType.PLAYER_UPDATE:
                const message = data as PlayerUpdateMessage
                let player = message.player!!
                player.id = ws.id

                entityList[ws.id] = player

                broadcast((id) => {
                    ws.send(new EntityListUpdateMessage({
                        entities: Object.values(entityList).filter(entity => {
                            return entity.id != id
                        })
                    }))
                })
                break;
        }
    })

    ws.on('close', (code, reason) => {
        delete clientList[ws.id]
    })

    ws.send(new EntityListUpdateMessage({entities: Object.values(entityList)}))
})