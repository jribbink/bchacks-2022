import { Entity, Cowboy, Rope, Hole, RopeState } from "./entities"
import { LocalPlayer } from "./entities/localplayer";
import { GameServer } from "./gameserver";

export class Game {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  private localPlayer: LocalPlayer;
  entityList: Entity[];
  
  private img: HTMLImageElement;
  public hole: Hole;

  private lastFrame?: number;

  private gameServer: GameServer;

  constructor() {
    this.gameServer = new GameServer()

    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!!;
    this.img = document.getElementById("img") as HTMLImageElement;

    this.canvas.style.width = "800px";
    this.canvas.style.height = "600px";
    this.entityList = [];
    this.hole = new Hole(this.canvas.width/2, this.canvas.height/2, 90)
    this.entityList.push(this.hole);
    this.localPlayer = new LocalPlayer(new Cowboy(200, 300), this);
    this.entityList.push(this.localPlayer.cowboy);

    ///while, server has cowboys/players????
    //this.entitylist.push(player.cowboy)
    this.entityList.push(new Cowboy(600,400))
    console.log(this.canvas);
    console.log(this.context);
    
    this.loop();
  }

  calculateDelta (): number {
    const timeNow = window.performance.now()
    const delta = timeNow - (this.lastFrame ?? timeNow)
    this.lastFrame = timeNow
    return delta
  }

  loop () {  
    this.update();
    this.render();
    setTimeout(this.loop.bind(this), 0);
  }

  update () {
      const delta = this.calculateDelta()
      this.localPlayer.updatePosition(delta)

      this.entityList.forEach(entity => {
        entity.update(this, delta);
      })

      //do other background stuff
  }

  render () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //clears canvas

      this.context.beginPath(); //draws the hole
      this.context.arc(this.hole.x, this.hole.y, this.hole.r, 0, 2 * Math.PI);
      this.context.stroke();


    this.entityList.forEach(entity => {
      entity.render(this)
      
      this.context.beginPath();
      this.context.arc(entity.x, entity.y, 2, 0, 2 * Math.PI);
      this.context.stroke(); 
      this.context.drawImage(this.img, entity.x, entity.y);
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