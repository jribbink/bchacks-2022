import { Game } from "../game"
import { Entity } from "./entity"
import { Rope } from "./rope"

export class Cowboy extends Entity {
    status: string;                        // directions, throw direction, grabbed
    rope? : Rope;

    constructor(){
        super(500,23);                 // placeholder initial coords
        this.status = "init status";
        console.log("Yeehaw: " + this.status + "[" + this.x + "," + this.y + "]");
    }

    throwLasso(targ: number[]){
        this.rope = new Rope(this);
        this.rope.length = 0;
        this.rope.angle = Math.atan2((targ[1] - this.y), (targ[0] - this.x));
        console.log(this.rope.angle)

        this.rope.state = 1;
        this.status = "throwing";
    }

    update(game: Game) {
        let pos : number[] = this.position;
        let h : number[] = game.hole.position;
        if(Math.sqrt(Math.pow(pos[0]-h[0],2) + Math.pow(pos[1]-h[1], 2)) > game.hole.r)
        {
                // have player fall
        }
    }

    render(game: Game) {
        
    }
}