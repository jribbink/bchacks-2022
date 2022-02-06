import { Entity } from "./entity";
import { Cowboy } from "./cowboy";
import { Game } from "../game";
import { Images } from "../util/images";

export enum RopeState {
    RETRACTING = -1.5,
    PULLING = -1,
    STABLE = 0,
    EXTENDING = 1
}

const whipcrack = require('../../assets/sound/whip.mp3')
const crack = new Audio(whipcrack);

export class Rope extends Entity {
    owner : Cowboy;                     // who's throwing it
    angle : number;
    lassoDist : number;
    private _state : RopeState;
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

        this.width=84
        this.height=76
    }

    set state(state:RopeState) {
        if(state == RopeState.EXTENDING) {
            crack.play();
        }
        this._state = state
    }

    get state() {
        return this._state
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
        if(this.owner.delay > 0){
            this.owner.delay -= delta;
        }
        if(!this.grabbed){
            g.entityList.every(entity => {
                if(entity instanceof Cowboy && entity !== this.owner && entity.status != "grabbedLeft" && entity.status != "grabbedRight" && entity.status != "fallen"&& entity.status != "dead"){
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
                if(Math.abs(this.angle) < Math.PI/2) collidingWith.status = "grabbedLeft"
                else collidingWith.status = "grabbedRight"
                this.grabbed = collidingWith;
                this.state = RopeState.PULLING;
            }
        }

        if(this.lassoDist <= 0 && (this.state == RopeState.RETRACTING || this.state == RopeState.PULLING))
        {
            this.state = RopeState.STABLE
            g.removeEntity(this)
            
            if(this.grabbed){
                if(this.grabbed.status == "grabbedRight")
                    this.grabbed.status = "right"
                else
                    this.grabbed.status = "left"
            }
            this.grabbed = null
            this.owner.rope = null
            this.owner.delay = 420;
            console.log(this.owner.delay);
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
        game.context.save()
        
        //let sprites = document.getElementById("ropeCycle").children;
        //let sprite: HTMLImageElement = sprites[0] as HTMLImageElement
        game.context.translate(this.owner.x + 28 * Math.sin(this.angle) * this.lassoDist/500, this.owner.y - 28 * Math.cos(this.angle) * this.lassoDist/500);
        game.context.rotate(this.angle);
        game.context.scale(this.lassoDist/410,.5);
        
        game.context.drawImage(Images.Instance.images["ropebody"], 0,0);
        game.context.setTransform(1,0,0,1,0,0)
        
        game.context.restore();
        //sprites.appendChild(sprite);
        
        if(!this.grabbed)
        game.context.drawImage(Images.Instance.images["ropehead"], this.x - 42,this.y - 38)
        // else no need to draw rope head -- grabbed entity is a cowboy with rope around him anyway

    }
}