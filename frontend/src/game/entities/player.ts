import { Cowboy } from ".";
import { Game } from "../game";

export class Player extends Cowboy {
    game: Game
    id?: string
    name?: string

    resetPosition () {
        let radius = Math.random() * 180 + 100
        let theta = Math.random() * 2 * Math.PI
        this.x = 400 + radius * Math.cos(theta)
        this.y = 300 + radius * Math.sin(theta)
    }

    constructor(game: Game, id?: string, name?: string) {
        super(0, 0)
        this.resetPosition()
        this.game = game;
        this.id = id
        this.name = name
    }

    update(game: Game, delta: number) {
        super.update(game, delta)

    }

    render(game: Game) {
        super.render(game)

        if(!this.name) return
        game.context.font = ("600 12pt Open Sans");
        game.context.fillStyle = ("white")
        const size = game.context.measureText(this.name)
        game.context.fillText(this.name, this.x - size.width / 2, this.y - 60)
    }
}