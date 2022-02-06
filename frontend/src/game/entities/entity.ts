import { Game } from "../game";

export abstract class Entity {
    public x : number;
    public y : number;
    width: number;
    height: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get position () {
        return [this.x,this.y]
    }

    set position (position: number[]) {
        this.x = position[0]
        this.y = position[1]
    } 

    abstract update (game: Game, delta: number): void
    abstract render (game: Game): void
}