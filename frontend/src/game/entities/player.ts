import { Cowboy } from ".";
import { Game } from "../game";

export class Player extends Cowboy {
    game: Game
    id?: string

    constructor(game: Game, id?: string) {
        super(200, 300)
        this.game = game;
        this.id = id
    }
}