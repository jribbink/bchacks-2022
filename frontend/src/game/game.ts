import { Entity, Cowboy, Rope, Hole, RopeState } from "./entities"
import { LocalPlayer } from "./entities/localplayer";
import { GameServer } from "./gameserver";
import { StartScreen } from "./start-screen";
import { EndScreen } from './end-screen'
import { Images } from "./util/images";

const rope = require("../assets/sprites/ropehead.png")

export class Game {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  private lastFrame?: number;

  public walk1: HTMLImageElement;
  public walk2: HTMLImageElement;
  public walk3: HTMLImageElement;
  public walk4: HTMLImageElement;

  public hole: Hole;
  public localPlayer: LocalPlayer;
  public entityList: Entity[];

  public loaded = false
  public gameServer: GameServer;

  public startScreen: StartScreen;
  public endScreen: EndScreen;

  public exitGameLoop = false;

  constructor() {
    // Start loading images
    Images.Instance

    // Init Canvas
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!!;

    this.canvas.style.width = "800px";
    this.canvas.style.height = "600px";

    // Create localPlayer object
    this.localPlayer = new LocalPlayer(this);

    this.walk1=Images.Instance.images["cowboy_1"];
    this.walk2=Images.Instance.images["cowboy_2"];
    this.walk3=Images.Instance.images["cowboy_3"];
    this.walk4=Images.Instance.images["cowboy_4"];

    // Load websocket server
    this.gameServer = new GameServer(this)

    this.startScreen = new StartScreen(this)
    this.endScreen = new EndScreen(this)
    this.waitUntilLoaded()
  }

  startGame () {
    this.entityList = [];
    this.hole = new Hole(this.canvas.width/2, this.canvas.height/2, 90)
    this.entityList.push(this.hole);
    this.entityList.push(this.localPlayer);
    this.gameServer.identifySelf(this.localPlayer.name)
    this.loop()
  }

  calculateDelta (): number {
    const timeNow = window.performance.now()
    const delta = timeNow - (this.lastFrame ?? timeNow)
    this.lastFrame = timeNow
    return delta
  }

  waitUntilLoaded () {
    if (!Images.Instance.loaded || !this.gameServer.connected) {
      console.log("loading")
      setTimeout(this.waitUntilLoaded.bind(this), 0);
    } else {
      setTimeout(this.startScreen.begin.bind(this.startScreen), 0);
    }
  }

  loop () {
    this.loaded = true
    this.update();
    this.render();
    if(!this.exitGameLoop) setTimeout(this.loop.bind(this), 0);
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
      if(entity instanceof Cowboy){
        if(entity.status=='dead'){}
        else{
        // this.context.drawImage(this.img, entity.x-entity.width/2, entity.y-entity.height/2);
        if(entity instanceof LocalPlayer){
          this.context.beginPath();
          this.context.lineWidth = 4
          this.context.arc(entity.x, entity.y, 52, 0, 2 * Math.PI * entity.delay / 420);
          this.context.strokeStyle = "white"
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
          this.context.save()
          this.context.translate(400,300);
          this.context.rotate(Math.random()*2*Math.PI);
          
          this.context.drawImage(Images.Instance.images["cowboy_grabbed"], entity.deathCount*-1*entity.width/200,-entity.height/200*entity.deathCount);
          
          this.context.restore();
        }
        else if(entity.status == 'left') {
          this.context.translate(entity.x + entity.width, entity.y)
          this.context.scale(-1,1)
          this.context.drawImage(Images.Instance.images["cowboy_stand"], entity.width/2, -entity.height/2)
          this.context.setTransform(1,0,0,1,0,0)
        } else {
          this.context.drawImage(Images.Instance.images["cowboy_stand"],entity.x-entity.width/2,entity.y-entity.height/2);
        }
      }
        //sprites.appendChild(sprite);
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