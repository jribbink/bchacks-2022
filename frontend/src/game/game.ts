import { Entity, Cowboy, Rope, Hole } from "./models"
import { LocalPlayer } from "./models/localplayer";

export class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private entityList: Entity[];
  private img: HTMLImageElement;
  private localPlayer: LocalPlayer

  constructor() {

    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!!;
    this.img = document.getElementById("img") as HTMLImageElement;

    this.canvas.style.width = "800px";
    this.canvas.style.height = "600px";
    this.entityList = [];

    this.entityList.push(new Cowboy(), new Cowboy());
    this.entityList[1].x=200;

    this.localPlayer = new LocalPlayer(this.entityList[0] as Cowboy);

    console.log(this.canvas);
    console.log(this.context);
    
    this.loop();
  }

  loop () {  
    this.update();
    this.render();
    setTimeout(this.loop.bind(this), 0);
  }

  update () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.arc(this.canvas.width/2, this.canvas.height/2, 90, 0, 2 * Math.PI);
      this.context.stroke();
      //do other background stuff
  }

  render () {
      for(var i =0; i<this.entityList.length; i++){//draws the cowboys,
          let _cowboy = this.entityList[i] as Cowboy;
          this.context.beginPath();
          this.context.arc(_cowboy.x/*+ imges height*/, _cowboy.y/*+ the images heigth*/, 3, 0, 2 * Math.PI);
          this.context.stroke();
          this.context.drawImage(this.img, _cowboy.x, _cowboy.y)
          if(_cowboy.rope)
          console.log("the rope is thrown");
      }
  }
}