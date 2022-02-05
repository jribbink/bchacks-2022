import { Entity } from ".";
import { Cowboy } from "./cowboy";

export class Rope extends Entity {
    private owner : Cowboy;                     // who's throwing it
    private targetTheta : number;
    private lassoDist : number;
    visible: boolean;

    constructor(owner : Cowboy)
    {
        super(owner.x, owner.y);
        this.owner = owner;
        this.targetTheta = 0;
        this.lassoDist = 0;
        this.visible = false;


        this.x = this.owner.x
        this.y = this.owner.y
    }

    moveLasso(amt: Number)
    {
        // increment lassoDist by amt
    }
}