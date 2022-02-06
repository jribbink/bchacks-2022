import { Cowboy } from "./cowboy";

export class LocalPlayer {
    cowboy: Cowboy

    constructor(cowboy: Cowboy) {
        this.cowboy = cowboy
        window.onkeydown = (e: KeyboardEvent) => {
            switch(e.key) {
                case "w":
                    cowboy.y -= 10
                    break;
                case "a":
                    cowboy.x -= 10
                    break;
                case "s":
                    cowboy.y += 10
                    break;
                case "d":
                    cowboy.x += 10
                    break;
            }

            console.log("hey")
        }
    }
}