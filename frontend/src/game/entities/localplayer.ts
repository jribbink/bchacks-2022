import { Cowboy } from "./cowboy";
import { Player } from './player';
import { Keyboard } from '../util/keyboard';

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

    constructor(cowboy: Cowboy) {
        super()
        this.cowboy = cowboy
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