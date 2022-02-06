import { Game } from "../game";
import { Entity } from "./entity"

export class Hole extends Entity {
    public x : number;
    public y : number;
    public r : number;

    constructor(x: number, y: number, r: number) {
        super(x,y);
        this.r = r; //radius
    }
    
    checkFall(){
        
    }

    update(g: Game, delta: number) {

    }

    render(game: Game) {
        
    }
}