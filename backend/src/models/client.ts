import { Player } from "./player";

export class Client {
    player: Player
    ws: WebSocket

    constructor(player: Player, ws: WebSocket) {
        this.player = player
        this.ws = ws
    }
}