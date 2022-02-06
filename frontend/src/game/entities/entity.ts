export class Entity {
    public x : number;
    public y : number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isCowboy() {
        return false;
    }

    isRope() {
        return false;
    }
    
    get position () {
        return [this.x,this.y]
    }
}