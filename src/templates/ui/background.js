
import { Entity } from "playcanvas";

export class BackGround extends Entity {
    constructor() {
        super();
        this.addComponent("element", {
            type: "image",
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
            width: 1280,
            height: 720,
            color: new pc.Color(0, 0, 0, 0),
            opacity: 0.3,
        });
    }
}