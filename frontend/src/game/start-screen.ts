import { Game } from "./game"
import { Images } from "./util/images"

const start_background = require("../assets/images/start_background.jpg")
const title_img = require("../assets/images/homestead.png")

export class StartScreen {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    game: Game

    constructor(game: Game) {
        this.canvas = game.canvas
        this.context = game.context
        this.game = game
    }

    begin() {
        this.canvas.style.display = "none"
        let start_image = document.getElementById("start_image") as HTMLImageElement;
        let title_image: HTMLImageElement = document.getElementById("title_image") as HTMLImageElement;
        start_image.src = start_background;
        (title_image.src as any) = title_img
        start_image.style.height = this.canvas.style.height
        start_image.style.width = this.canvas.style.width

        let start_button = document.getElementById("start-button") as HTMLImageElement;
        start_button.onclick = () => {
            this.canvas.style.display = "block"
            this.game.startGame()
        }
    }
}