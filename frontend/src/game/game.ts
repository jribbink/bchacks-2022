import { Entity, Cowboy, Rope, Hole } from "./entities"
import { LocalPlayer } from "./entities/localplayer";

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private entityList: Entity[];
  private img: HTMLImageElement;
  private localPlayer: LocalPlayer;
  private hole: Hole;

  private lastFrame?: number;

  constructor() {

    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!!;
    this.img = document.getElementById("img") as HTMLImageElement;

    this.canvas.style.width = "800px";
    this.canvas.style.height = "600px";
    this.entityList = [];
    this.hole = new Hole(this.canvas.width/2, this.canvas.height/2, 90);

    this.entityList.push(new Cowboy(), new Cowboy());
    this.entityList[1].x=200;

    this.localPlayer = new LocalPlayer(this.entityList[0] as Cowboy);

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
        
        if(entity.isCowboy()) {
          let pos : number[] = entity.position;
          let h : number[] = this.hole.position;
          if(Math.sqrt(Math.pow(pos[0]-h[0],2) + Math.pow(pos[1]-h[1], 2)) > this.hole.r)
          {
                  // have player fall
          }
        }
      })

      //do other background stuff
  }

  render () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //clears canvas

      this.context.beginPath();//draws the hole
      this.context.arc(this.hole.x, this.hole.y, this.hole.r, 0, 2 * Math.PI);
      this.context.stroke();


    this.entityList.forEach(entity => {
      
      this.context.beginPath();
      this.context.arc(entity.x, entity.y, 2, 0, 2 * Math.PI);
      this.context.stroke(); 
      this.context.drawImage(this.img, entity.x, entity.y);
    })
  }
}