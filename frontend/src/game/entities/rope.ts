import { Entity } from "./entity";
import { Cowboy } from "./cowboy";
import { Game } from "../game";

export enum RopeState {
    RETRACTING = -1.5,
    PULLING = -1,
    STABLE = 0,
    EXTENDING = 1
}

export class Rope extends Entity {
     owner : Cowboy;                     // who's throwing it
    angle : number;
    lassoDist : number;
    state : RopeState;
    ropeSpeed : number;
    ropeMaxLen : number;
    grabbed? : Cowboy;

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

        this.width=25
        this.height=25
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

    update(g: Game, delta: number){
        let collidingWith: Entity;
        if(!this.grabbed){
            g.entityList.every(entity => {
                if(entity instanceof Cowboy && entity !== this.owner && entity.status != "grabbed" && entity.status != "fallen"){
                    if(this.x > entity.x-entity.width/2  && this.x<entity.x+entity.width/2 
                        && this.y>entity.y -entity.height/2 && this.y <entity.y+entity.height/2){
                        this.x=entity.x;
                        this.y = entity.y;
                        console.log(this.owner +" grabbed" + entity)
                                collidingWith = entity;
                        return false;
                    } //hit detection ///cowboy x and y, y+- png yval, x+-png yva
                }
                return true;
            })

            if(collidingWith && collidingWith instanceof Cowboy && collidingWith != this.owner)
            {
                collidingWith.status = "grabbed"
                this.grabbed = collidingWith;
                this.state = RopeState.PULLING;
            }
        }

        if(this.lassoDist <= 0 && (this.state == RopeState.RETRACTING || this.state == RopeState.PULLING))
        {
            this.state = RopeState.STABLE
            g.removeEntity(this)
            this.owner.rope = null
            if(this.grabbed){
            if(this.angle - Math.PI > Math.PI/2)
                this.grabbed.status = "right"
            else
                this.grabbed.status = "left"
        }
            this.grabbed = null

        }
        else if(this.grabbed)
        {
            if(this.grabbed.status == "fallen")
            {
                this.grabbed = null;
                this.state = RopeState.RETRACTING;
            }
            else
            {
                this.grabbed.x += this.ropeSpeed * delta * this.state * Math.cos(this.angle)
                this.grabbed.y += this.ropeSpeed * delta * this.state * Math.sin(this.angle)
            }
            this.updatePosition(delta)
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