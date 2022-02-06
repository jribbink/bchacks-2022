import { Entity, Cowboy, Rope, Hole, RopeState } from "./entities"
import { LocalPlayer } from "./entities/localplayer";
import { GameServer } from "./gameserver";

export class Game {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  private localPlayer: LocalPlayer;
  entityList: Entity[];
  
  private img: HTMLImageElement;
  private ropehead: HTMLImageElement;
  private ropebody: HTMLImageElement;
  

  public hole: Hole;

  private lastFrame?: number;

  private gameServer: GameServer;

  constructor() {
    this.gameServer = new GameServer(this)

    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!!;
    this.img = document.getElementById("img") as HTMLImageElement;
    this.ropehead = document.getElementById("ropehead") as HTMLImageElement;
    this.ropebody = document.getElementById("ropebody") as HTMLImageElement;

    this.canvas.style.width = "800px";
    this.canvas.style.height = "600px";
    
    this.entityList = [];
    this.localPlayer = new LocalPlayer(this);
    this.hole = new Hole(this.canvas.width/2, this.canvas.height/2, 90)
    this.entityList.push(this.hole);
    this.entityList.push(this.localPlayer);

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
      this.context.arc(entity.x, entity.y, 5, 0, 2 * Math.PI);
      this.context.stroke(); 
      if(entity instanceof Cowboy){
       // this.context.drawImage(this.img, entity.x-entity.width/2, entity.y-entity.height/2);
      }
      if(entity instanceof Rope){

        this.context.save()
        this.context.translate(entity.owner.x, entity.owner.y - 28 + 28*(-1 * Math.cos(entity.angle) + 1));
        this.context.rotate(entity.angle);
        this.context.drawImage(this.ropebody, 0,0);
        this.context.restore();
        


        this.context.drawImage(this.ropehead, entity.x-entity.width/2, entity.y-entity.height/2);//ropehead
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