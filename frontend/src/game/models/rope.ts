import { Entity } from "./entity";
import { Cowboy } from "./cowboy";

export class Rope extends Entity {
    private owner : Cowboy;                     // who's throwing it
    private targetTheta : number;
    private lassoDist : number;
    private state? : string;                   // out / retracting / idle

    constructor(owner : Cowboy)
    {
        super(owner.x, owner.y);
        this.owner = owner;
        this.targetTheta = 0;
        this.lassoDist = 0;
        this.state = "idle";


        this.x = this.owner.x
        this.y = this.owner.y
    }

    moveLasso(amt: Number)
    {
        // increment lassoDist by amt
    }

    set length (d : number) {
        this.lassoDist = d;
    }

    set angle (theta : number)
    {
        this.targetTheta = theta;
    }

    set status (s : string)
    {
        this.state = s;
    }
}