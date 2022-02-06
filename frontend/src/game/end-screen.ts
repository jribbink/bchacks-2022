import { Game } from "./game"

const dead_image = require("../assets/images/dead.png")

const trombone = new Audio(require('../assets/sound/trombone.mp3'));

export class EndScreen {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    game: Game

    constructor(game: Game) {
        this.canvas = game.canvas
        this.context = game.context
        this.game = game
    }

    render() {
        trombone.play()
        this.canvas.style.display = "none"
        const deadContent = document.querySelectorAll(".dead-screen")[0] as HTMLElement
        deadContent.style.display = "flex"

        const deadImage = document.getElementById("dead-image") as HTMLImageElement
        deadImage.src = dead_image

        const playButton = document.querySelectorAll(".dead-screen div button")[0] as HTMLElement
        playButton.onclick = () => {
            this.game.exitGameLoop = false
            this.game.localPlayer.status = "right"
            this.game.localPlayer.deathCount = 0
            this.game.localPlayer.resetPosition()
            deadContent.style.display = "none"
        }
    }
}