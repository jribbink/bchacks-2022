"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawingApp = void 0;
//TODO: make the cowboy objects
const models_1 = require("./models");
class DrawingApp {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.canvas.style.width = "800px";
        this.canvas.style.height = "600px";
        this.entityList = [];
        this.entityList.push(new models_1.Cowboy());
        console.log(this.canvas);
        console.log(this.context);
        //this.redraw();
        //this.createUserEvents();
        this.loop();
    }
    loop() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.entityList.length; i++) {
            this.context.strokeRect(this.entityList[i].x, this.entityList[i].y, this.entityList[i].x + 150, this.entityList[i].y + 100);
        }
        this.update();
        this.render();
        setImmediate(this.loop);
    }
    update() {
    }
    render() {
    }
}
exports.DrawingApp = DrawingApp;
new DrawingApp();
