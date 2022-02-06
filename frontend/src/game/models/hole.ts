import { Entity } from "./entity"

export class Hole extends Entity {
    public x : number;
    public y : number;

    constructor(x: number, y: number) {
        super(x,y);
    }
    
    checkFall(){
        
    }
}