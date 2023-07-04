import { Entity } from "playcanvas";

export class EndUI extends Entity{

    constructor(player) {

        super();

        this.player = player;

        this.screen = new Entity();
        this.screen.addComponent("screen", {
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

        this.background = new Entity();
        this.background.addComponent("element", {
            type: "image",
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
            width: 1280,
            height: 720,
            color: new pc.Color(0, 0, 0, 0),
            opacity: 0,
        });
    
        this.background.addComponent("script");
        this.background.script.create("endBackgroundScript", {
            attributes: {
                player: this.player,
            },
        });

        this.screen.addChild(this.background);
        this.addChild(this.screen);


    }

}