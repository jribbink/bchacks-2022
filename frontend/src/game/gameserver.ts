export class GameServer {
    private ws: WebSocket

    constructor () {
        this.ws = new WebSocket(`ws://${window.location.hostname}:8080`)
        this.ws.onopen = (e:Event) => {
            console.log(e)
        }
    }
}