import { Cowboy } from "./cowboy";
import { Rope } from "./rope";
import { Player } from './player';
import { Keyboard } from '../util/keyboard';
import { Game } from "../game";

const controls: { [key:string]: (player: LocalPlayer, delta: number) => void } = {
    'w': (player, delta) => {
        player.y -= 0.5 * delta
    },
    'a': (player, delta) => {
        player.x -= 0.5 * delta
    },
    's': (player, delta) => {
        player.y += 0.5 * delta
    },
    'd': (player, delta) => {
        player.x += 0.5 * delta
    },
}

export class LocalPlayer extends Player {

    constructor(game: Game) {
        super(game)

        // Register mousedown handler for clicks
        this.game.canvas.onmousedown = this.mouseHandler.bind(this);
    }

    mouseHandler (e: MouseEvent) {
        if(this.rope) return;
        if(this.status == "grabbed"|| this.status == "fallen") return;
        var rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const coords = [e.clientX - rect.left, e.clientY - rect.top]
        this.throwLasso(coords);
        this.game.pushEntity(this.rope);
    }

    updatePosition (delta: number) {
        if(this.rope) return;
        if(this.status == "grabbed" || this.status == "fallen") return;

        
        let hitboxX = 16; let hitboxY = 32;              //replace with cowboy.width/2 and cowboy.height/2

        for (let key in controls)
        {
            if(Keyboard.Instance.isKeyDown(key))
            {
                controls[key](this, delta)
                if(this.x<hitboxX)
                    this.x=hitboxX;
                if(this.x>800-hitboxX)
                    this.x=800-hitboxX;
                if(this.y<hitboxY)
                    this.y=hitboxY;
                if(this.y>600-hitboxY)
                    this.y=600-hitboxY;
            }
        }
    }

    update (game: Game, delta:number) {
        this.updatePosition(delta)
        super.update(game, delta)
    }

    render (game: Game) {

    }
}