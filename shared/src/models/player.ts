export class Player {
    x: number
    y: number
    id?: string
    status?: string

    constructor(x: number, y: number, status?: string) {
        this.x = x
        this.y = y
        this.status = status
    }
}