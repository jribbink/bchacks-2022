import { Game } from "./game/game";
const image = require('./assets/sprites/rope1.png');

(document.getElementById("hellome") as HTMLImageElement).src = image

new Game()