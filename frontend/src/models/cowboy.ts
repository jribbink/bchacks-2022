import { Entity, Rope } from "./index"

export class Cowboy extends Entity {
    status: string;
    rope? : Rope;

    constructor(){
        super(0,0);                 // placeholder initial coords
        this.status = "init status";
        console.log("Yeehaw: " + this.status + "[" + this.x + "," + this.y + "]");
    }

    throwLasso(targ: number[]){
        this.rope = new Rope(this);
    }
}