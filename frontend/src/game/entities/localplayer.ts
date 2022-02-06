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
        this.game.canvas.onmousedown = this.mouseHandler.bind(this);
    }

    mouseHandler (e: MouseEvent) {
        if(this.cowboy.rope) return;
        if(this.cowboy.status == "grabbed") return;

        var rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const coords = [e.clientX - rect.left, e.clientY - rect.top]
        this.cowboy.throwLasso(coords);
        this.game.pushEntity(this.cowboy.rope);
    }

    updatePosition (delta: number) {
        if(this.cowboy.rope) return;
        if(this.cowboy.status == "grabbed") return;

        
        let hitboxX= 16; let hitboxY = 32;              //replace with cowboy.width/2 and cowboy.height/2

        for (let key in controls)
        {
            if(Keyboard.Instance.isKeyDown(key))
            {
                controls[key](this, delta)
                if(this.cowboy.x<hitboxX)
                    this.cowboy.x=hitboxX;
                if(this.cowboy.x>800-hitboxX)
                    this.cowboy.x=800-hitboxX;
                if(this.cowboy.y<hitboxY)
                    this.cowboy.y=hitboxY;
                if(this.cowboy.y>600-hitboxY)
                    this.cowboy.y=600-hitboxY;
            }
        }
    }
}