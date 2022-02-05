// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string | undefined) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text!!
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })

  class DrawingApp{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private paint: boolean;

    constructor() {
      let canvas = document.getElementById('canvas') as
                 HTMLCanvasElement;
      let context = canvas.getContext("2d");
      
      //this.redraw();
      //this.createUserEvents();
    }
  }

  new DrawingApp();
