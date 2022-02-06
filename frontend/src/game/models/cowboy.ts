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

        this.rope.angle = Math.atan((targ[1] - this.y)/(targ[0] - this.x));
        if(targ[0] < this.x) this.rope.angle += Math.PI;

        this.rope.status = "thrown";
        this.status = "throwing";
    }
}