import { Game } from "./game"
import { Images } from "./util/images"

const start_background = require("../assets/images/start_background.jpg")
const title_img = require("../assets/images/homestead.png")

const music = new Audio(require('../assets/sound/background.mp3'));

export class StartScreen {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    game: Game

    constructor(game: Game) {
        this.canvas = game.canvas
        this.context = game.context
        this.game = game
        music.play()
    }

    begin() {
        let start_button = document.getElementById("start-button") as HTMLImageElement;
        this.canvas.style.display = "none"
        start_button.style.display = "block"
        let start_image = document.getElementById("start_image") as HTMLImageElement;
        let title_image: HTMLImageElement = document.getElementById("title_image") as HTMLImageElement;
        start_image.src = start_background;
        (title_image.src as any) = title_img
        start_image.style.height = this.canvas.style.height
        start_image.style.width = this.canvas.style.width

        let firstClick = true

        start_button.onclick = () => {
            let name_input = document.getElementById("name-input") as HTMLElement;
            name_input.style.display = "flex"
            start_button.style.display = "none"
            
            let goButton = document.querySelectorAll("#name-input button")[0] as HTMLButtonElement
            goButton.onclick = () => {
                this.canvas.style.display = "block"
                name_input.style.display = "none"
                start_button.style.display = "block"
                this.game.startGame()
            }
        }
    }
}