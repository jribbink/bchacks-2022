import { Cowboy } from ".";
import { Game } from "../game";

export class Player extends Cowboy {
    game: Game
    id?: string

    resetPosition () {
        let radius = Math.random() * 180 + 100
        let theta = Math.random() * 2 * Math.PI
        this.x = 400 + radius * Math.cos(theta)
        this.y = 300 + radius * Math.sin(theta)
    }

    constructor(game: Game, id?: string) {
        super(0, 0)
        this.resetPosition()
        this.game = game;
        this.id = id
    }
}