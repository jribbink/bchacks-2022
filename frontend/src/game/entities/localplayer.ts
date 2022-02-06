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
        player.status = "left"
    },
    's': (player, delta) => {
        player.y += 0.5 * delta
    },
    'd': (player, delta) => {
        player.x += 0.5 * delta
        player.status = "right"
    },
}

export class LocalPlayer extends Player {

    constructor(game: Game) {
        super(game)

        // Register mousedown handler for clicks
        this.game.canvas.onmousedown = this.mouseHandler.bind(this);
    }

    mouseHandler (e: MouseEvent) {
        if(!this.game.loaded) return;
        if(this.delay > 0) return;
        if(this.rope) return;
        if(this.status == "grabbedLeft"|| this.status == "grabbedRight" || this.status == "fallen" || this.status == "dead") return;
        var rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const coords = [e.clientX - rect.left, e.clientY - rect.top]
        this.throwLasso(coords, this.game);
        this.game.pushEntity(this.rope);
    }

    updatePosition (delta: number) {
        if(this.rope) return;
        if(this.status == "grabbedLeft"|| this.status == "grabbedRight" || this.status == "fallen" || this.status == "dead") return;

        
        let hitboxX = this.width/2; let hitboxY = this.height/2;

        for (let key in controls)
        {
            if(this.status!="fallen"&&this.status!="dead"&&Keyboard.Instance.isKeyDown(key))
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
        if(this.delay > 0) {
            this.delay -= delta;
            if(this.delay < 0) this.delay = 0;
        }

        if(this.status == "dead") {
            this.game.exitGameLoop = true
            this.game.endScreen.render()
        }
    }

    render (game: Game) {
        super.render(game)
    }
}