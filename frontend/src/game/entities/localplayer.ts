import { Cowboy } from "./cowboy";
import { Rope } from "./rope";
import { Player } from './player';
import { Keyboard } from '../util/keyboard';
import { Game } from "../game";

const controls: { [key:string]: (player: LocalPlayer, delta: number) => void } = {
    'w': (player, delta) => {
        player.cowboy.y -= 0.5 * delta
    },
    'a': (player, delta) => {
        player.cowboy.x -= 0.5 * delta
    },
    's': (player, delta) => {
        player.cowboy.y += 0.5 * delta
    },
    'd': (player, delta) => {
        player.cowboy.x += 0.5 * delta
    },
}

export class LocalPlayer extends Player {
    cowboy: Cowboy
    game: Game

    constructor(cowboy: Cowboy, game: Game) {
        super()
        this.cowboy = cowboy;
        this.game = game;

        // Register mousedown handler for clicks
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        this.game.canvas.onmousedown = this.mouseHandler.bind(this);
    }

    mouseHandler (e: MouseEvent) {
        console.log(e)
        console.log(e.clientX +" " + e.clientY);
        console.log(this.cowboy);
        this.cowboy.throwLasso([e.clientX, e.clientY]);
    }

    updatePosition (delta: number) {
        for (let key in controls)
        {
            if(Keyboard.Instance.isKeyDown(key))
            {
                controls[key](this, delta)
            }
        }
    }
}