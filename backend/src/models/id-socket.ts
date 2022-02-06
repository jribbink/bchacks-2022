import { WebSocket } from "ws";

function getUniqueID () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
}

export class IDSocket extends WebSocket {
    id: string

    constructor(url: string | URL, protocols: string | string[]) {
        super(url, protocols)
        this.id = getUniqueID()
    }
}