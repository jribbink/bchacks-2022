import { RopeState } from ".";
import { Game } from "../game"
import { Entity } from "./entity"
import { Rope } from "./rope"
import { Hole } from "./hole"

const scream = require('../../assets/sound/scream.mp3')
const wilhelm = new Audio(scream);

export class Cowboy extends Entity {
    status: string;                        // directions, throw direction, grabbed
    rope? : Rope;
    delay: number;
    deathCount: number;

    constructor(x: number, y: number){
        super(x, y);                 // placeholder initial coords
        this.width = 64
        this.height = 96
        this.deathCount =0;
    }

    throwLasso(targ: number[], game: Game){
        this.rope = new Rope(this);
        this.rope.length = 0;
        this.rope.angle = Math.atan2((targ[1] - this.y), (targ[0] - this.x));
        this.rope.state = RopeState.EXTENDING;
        
        //send to server
        game.gameServer.throwLasso(this.rope)
    }

    update(game: Game, delta: number) {
        if(this.status=='fallen'){
            
            if(this.deathCount>=100){
                
                this.status ='dead'
            }else{
                this.deathCount+=0.7
            }
        }

        let pos : number[] = this.position;
        let h : number[] = game.hole.position;
        if(Math.sqrt(Math.pow(pos[0]-h[0],2) + Math.pow(pos[1]-h[1], 2)) < game.hole.r){
            if(this.status != "fallen" && this.status != "dead")
            {
                this.status="fallen"
                wilhelm.play();
            }
        }
    }

    render(game: Game) {

    }
}