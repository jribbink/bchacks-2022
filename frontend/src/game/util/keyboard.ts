export class Keyboard
{
    private static _instance: Keyboard;

    private keyMask: {[key:string]: boolean} = {}

    private constructor()
    {
        window.onkeydown = (e: KeyboardEvent) => {
            this.keyMask[e.key] = true
        }
        window.onkeyup = (e: KeyboardEvent) => {
            this.keyMask[e.key] = false
        }
    }

    public isKeyDown(key: string) {
        return this.keyMask[key] ?? false
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
}
