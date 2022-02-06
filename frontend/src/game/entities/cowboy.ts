import { RopeState } from ".";
import { Game } from "../game"
import { Entity } from "./entity"
import { Rope } from "./rope"
import { Hole } from "./hole"

export class Cowboy extends Entity {
    status: string;                        // directions, throw direction, grabbed
    rope? : Rope;

    constructor(x: number, y: number){
        super(x, y);                 // placeholder initial coords
        this.width = 64
        this.height = 96
    }

    throwLasso(targ: number[]){
        this.rope = new Rope(this);
        this.rope.length = 0;
        this.rope.angle = Math.atan2((targ[1] - this.y), (targ[0] - this.x));
        this.rope.state = RopeState.EXTENDING;
    }

    update(game: Game) {
        let pos : number[] = this.position;
        let h : number[] = game.hole.position;
        if(Math.sqrt(Math.pow(pos[0]-h[0],2) + Math.pow(pos[1]-h[1], 2)) < game.hole.r){
                this.status="fallen"
        }
    }

    render(game: Game) {

    }
}