import { Entity, Cowboy, Rope, Hole, RopeState } from "./entities"
import { LocalPlayer } from "./entities/localplayer";
import { GameServer } from "./gameserver";
import { Images } from "./util/images";

const rope = require("../assets/sprites/ropehead.png")

export class Game {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  public localPlayer: LocalPlayer;
  entityList: Entity[];
  
  //private img: HTMLImageElement;
//  private ropehead: HTMLImageElement;
//  private ropebody: HTMLImageElement;
  //public playerSprite: HTMLImageElement[];
  public walk1: HTMLImageElement;
  public walk2: HTMLImageElement;
  public walk3: HTMLImageElement;
  public walk4: HTMLImageElement;

  public hole: Hole;

  private lastFrame?: number;

  public gameServer: GameServer;

  constructor() {
    // Start loading images
    Images.Instance

    // Load websocket server
    this.gameServer = new GameServer(this)

    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!!;

    this.canvas.style.width = "800px";
    this.canvas.style.height = "600px";
    
    this.entityList = [];
    this.localPlayer = new LocalPlayer(this);
    this.hole = new Hole(this.canvas.width/2, this.canvas.height/2, 90)
    this.entityList.push(this.hole);
    this.entityList.push(this.localPlayer);

    this.walk1=Images.Instance.images["cowboy_1"];
    this.walk2=Images.Instance.images["cowboy_2"];
    this.walk3=Images.Instance.images["cowboy_3"];
    this.walk4=Images.Instance.images["cowboy_4"];

    ///while, server has cowboys/players????
    //this.entitylist.push(player.cowboy)
    this.entityList.push(new Cowboy(600,400))
    console.log(this.canvas);
    console.log(this.context);

    this.waitUntilLoaded()
  }

  calculateDelta (): number {
    const timeNow = window.performance.now()
    const delta = timeNow - (this.lastFrame ?? timeNow)
    this.lastFrame = timeNow
    return delta
  }

  waitUntilLoaded () {
    if (!Images.Instance.loaded) {
      console.log("loading")
      setTimeout(this.waitUntilLoaded.bind(this), 0);
    } else {
      setTimeout(this.loop.bind(this), 0);
    }
  }

  loop () {  
    this.update();
    this.render();
    setTimeout(this.loop.bind(this), 0);
  }

  update () {
      const delta = this.calculateDelta()

      this.entityList.forEach(entity => {
        entity.update(this, delta);
      })

      //do other background stuff
      this.gameServer.updatePosition(delta)
  }

  render () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //clears canvas

          this.context.drawImage(Images.Instance.images["back"],0,0)

    


    this.entityList.forEach(entity => {
      entity.render(this)
      if(entity instanceof Hole){
        this.context.drawImage(Images.Instance.images["hole"],entity.x-90,entity.y-90)
      }
      if(entity instanceof Cowboy){
        
        // this.context.drawImage(this.img, entity.x-entity.width/2, entity.y-entity.height/2);
        if(entity instanceof LocalPlayer){
          this.context.beginPath();
          this.context.arc(entity.x, entity.y, 48, 0, 2 * Math.PI * entity.delay / 420);
          this.context.stroke();
        }

        //let sprites = document.getElementById("cowboyWalk") as HTMLImageElement[]
        //let sprite = sprites[0]
        if(entity.status == 'grabbedLeft' || entity.status == 'grabbedRight'){
          //this.context.drawImage(Images.Instance.images["cowboy_grabbed"],entity.x-entity.width/2,entity.y-entity.height/2)
          if(entity.status == 'grabbedLeft'){
            this.context.translate(entity.x + entity.width, entity.y)
            this.context.scale(-1,1)
            this.context.drawImage(Images.Instance.images["cowboy_grabbed"], entity.width/2, -entity.height/2)        // temp
            this.context.setTransform(1,0,0,1,0,0)
          }
          else
            this.context.drawImage(Images.Instance.images["cowboy_grabbed"],entity.x-entity.width/2,entity.y-entity.height/2);    //temp
        }else if(entity.status == 'fallen'){

        }
        else if(entity.status == 'left') {
          this.context.translate(entity.x + entity.width, entity.y)
          this.context.scale(-1,1)
          this.context.drawImage(Images.Instance.images["cowboy_stand"], entity.width/2, -entity.height/2)
          this.context.setTransform(1,0,0,1,0,0)
        } else {
          this.context.drawImage(Images.Instance.images["cowboy_stand"],entity.x-entity.width/2,entity.y-entity.height/2);
        }
        //sprites.appendChild(sprite);
      }
      if(entity instanceof Rope){

        this.context.save()
        
        //let sprites = document.getElementById("ropeCycle").children;
        //let sprite: HTMLImageElement = sprites[0] as HTMLImageElement
        this.context.translate(entity.owner.x + 28 * Math.sin(entity.angle) * entity.lassoDist/500, entity.owner.y - 28 * Math.cos(entity.angle) * entity.lassoDist/500);
        this.context.rotate(entity.angle);
        this.context.scale(entity.lassoDist/410,.5);
        
        this.context.drawImage(Images.Instance.images["ropebody"], 0,0);
          this.context.setTransform(1,0,0,1,0,0)
        
        this.context.restore();
        //sprites.appendChild(sprite);
        
        if(!entity.grabbed)
          this.context.drawImage(Images.Instance.images["ropehead"], entity.x - 42,entity.y - 38)
        // else no need to draw rope head -- grabbed entity is a cowboy with rope around him anyway
      }
    })

  }

  pushEntity (e: Entity)
  {
    this.entityList.push(e);
  }

  removeEntity (e: Entity)
  {
    this.entityList.splice(this.entityList.indexOf(e), 1)
  }
}