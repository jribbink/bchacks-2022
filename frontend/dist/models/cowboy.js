"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cowboy = void 0;
const index_1 = require("./index");
class Cowboy extends index_1.Entity {
    constructor() {
        super(0, 0); // placeholder initial coords
        this.status = "init status";
        console.log("Yeehaw: " + this.status + "[" + this.x + "," + this.y + "]");
    }
    throwLasso(targ) {
        this.rope = new index_1.Rope(this);
    }
}
exports.Cowboy = Cowboy;
