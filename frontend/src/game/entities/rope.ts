import { Entity } from "./entity";
import { Cowboy } from "./cowboy";

export class Rope extends Entity {
    private owner : Cowboy;                     // who's throwing it
    targetTheta : number;
    lassoDist : number;
    state? : string;                   // thrown / retracting / idle
    ropeSpeed : number;
    ropeMaxLen : number;

    constructor(owner : Cowboy)
    {
        super(owner.x, owner.y);
        this.owner = owner;
        this.targetTheta = 0;
        this.lassoDist = 0;
        this.state = "idle";

        this.ropeSpeed = 1;                 // default numbers
        this.ropeMaxLen = 10;               // ie placeholders, please change


        this.x = this.owner.x
        this.y = this.owner.y
    }

    updatePosition(delta: number)
    {
        if(this.state === "thrown")
        {
            this.lassoDist += this.ropeSpeed * delta;
        }
        if(this.state === "retracting")
        {
            this.lassoDist -= this.ropeSpeed * delta;
        }
    }

    isRope(): boolean {
        return true;
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