// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//TODO: make the cowboy objects

import { Cowboy, Rope } from "./models"


export class DrawingApp{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private entityList: Cowboy[];

    constructor() {

      this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
      this.context = this.canvas.getContext("2d")!!;

      this.canvas.style.width = "800px";
      this.canvas.style.height = "600px";
      this.entityList = [];

      this.entityList.push(new Cowboy());

      console.log(this.canvas);
      console.log(this.context);

      //this.redraw();
      //this.createUserEvents();
      this.loop()
    }

    loop () {  
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for(var i =0; i<this.entityList.length; i++){
        this.context.strokeRect(this.entityList[i].x, this.entityList[i].y, this.entityList[i].x+150,this.entityList[i].y+100);
      } 
      this.update();
      this.render();



      setImmediate(this.loop)
    }

    update () {

    }

    render () {

    }
  }
  
  new DrawingApp();