"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get position() {
        return [this.x, this.y];
    }
}
exports.Entity = Entity;
