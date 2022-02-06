import { Entity } from "./entity";
import { Cowboy } from "./cowboy";
import { Game } from "../game";

export enum RopeState {
    RETRACTING = -1,
    STABLE = 0,
    EXTENDING = 1
}

export class Rope extends Entity {
    private owner : Cowboy;                     // who's throwing it
    angle : number;
    lassoDist : number;
    state : RopeState;
    ropeSpeed : number;
    ropeMaxLen : number;

    constructor(owner : Cowboy)
    {
        super(owner.x, owner.y);
        this.owner = owner;
        this.angle = 0;
        this.lassoDist = 0;
        this.state = RopeState.EXTENDING;

        this.ropeSpeed = 1;                 // default numbers
        this.ropeMaxLen = 500;               // ie placeholders, please change

        this.x = this.owner.x
        this.y = this.owner.y
    }

    updatePosition(delta: number)
    {
        this.lassoDist += this.ropeSpeed * delta * this.state;

        this.x = this.owner.x+this.lassoDist*Math.cos(this.angle)
        this.y = this.owner.y+this.lassoDist*Math.sin(this.angle)
    }

    set length (d : number) {
        this.lassoDist = d;
    }

    update(g: Game, delta: number)
    {
        if(this.lassoDist <= 0 && this.state == -1)
        {
            this.state = 0;
            g.removeEntity(this)
            this.owner.rope = null
        }
        else
        {
            if (this.lassoDist >= this.ropeMaxLen)
                this.state = RopeState.RETRACTING
            this.updatePosition(delta)
        }
    }

    render(game: Game) {
        game.context.beginPath();
        game.context.arc(
            this.x, 
            this.y, 
            90, 0, 2 * Math.PI
        );
        game.context.stroke(); 
    }
}