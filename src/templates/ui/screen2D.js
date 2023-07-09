
import { Entity } from "playcanvas";

export class Screen2D extends Entity {
    constructor() {
        super();
        this.addComponent("screen", {
            screenSpace: true,
            scaleMode: "blend", 
            referenceResolution: new pc.Vec2(128, 72),
            scaleBlend: 0.5,
            scaleToWindow: true,
            useRenderResolution: false,
            maxScale: 1,
            minScale: 0.5,
            renderMode: "blend",
            resolutionScale: 1,
            screenSpaceScaleMode: "blend",
        });
    }
}