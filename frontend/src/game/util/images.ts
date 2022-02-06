export class Images
{
    private static _instance: Images;
    private static readonly _imageList: {[key:string]:string} = {
        "ropehead": require("../../assets/sprites/ropehead.png"),
        "ropebody": require("../../assets/sprites/rope1.png"),
        "cowboy_stand": require('../../assets/sprites/l0_cowman_stand.png')
    }

    public images: {[name:string]:HTMLImageElement} = {}
    public loaded: boolean = false
    private loadedCount = 0

    private constructor()
    {
        console.log("OK")
        for (let key in Images._imageList) {
            this.images[key] = new Image()
            this.images[key].onload = (e: Event) => {
                this.loadedCount++
                if (this.loadedCount == Object.keys(Images._imageList).length) {
                    this.loaded = true
                }
            }
            this.images[key].src = Images._imageList[key]
        }
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
}
