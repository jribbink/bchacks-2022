"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rope = void 0;
const _1 = require(".");
class Rope extends _1.Entity {
    constructor(owner) {
        super(owner.x, owner.y);
        this.owner = owner;
        this.targetTheta = 0;
        this.lassoDist = 0;
        this.visible = false;
        this.x = this.owner.x;
        this.y = this.owner.y;
    }
    moveLasso(amt) {
        // increment lassoDist by amt
    }
}
exports.Rope = Rope;
