import { WebSocket } from "ws";

export class IDSocket extends WebSocket {
    id?: string

    constructor(url: string | URL, protocols: string | string[]) {
        super(url, protocols)
    }

    
}