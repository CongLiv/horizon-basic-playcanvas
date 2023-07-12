    import { Entity } from "playcanvas";
    import { assets } from "../../assetLoader/assets";


    export class Viewport extends Entity {

        constructor() {
            super();

            this.addComponent('element', {
                type: "image",
                anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
                pivot: new pc.Vec2(0.5, 0.5),
                width: 130,
                height: 90,
                margin: new pc.Vec4(-60, -45, -60, -45),
                color: new pc.Color(0, 0, 0, 1),
                rect: new pc.Vec4(0, 0, 1, 1),
                mask: true,
            });


            this.content = new Entity();
        
            this.content.addComponent('element', {
                type: "group",
                anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
                pivot: new pc.Vec2(0.5, 0.5),
                margin: new pc.Vec4(-60, -65, -60, -65),
                width: 130,
                height: 130,
                useInput: true,
            });

            this.image = new Entity();
            this.content.addChild(this.image);
            this.image.addComponent('element', {
                type: "image",
                anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
                pivot: new pc.Vec2(0.5, 0.5),
                
                width: 100,
                height: 300,
                margin: new pc.Vec4(-50, -100, -50, -100),
                color: new pc.Color(1, 1, 1, 1),
                rect: new pc.Vec4(0, 0, 1, 1),
                textureAsset: assets.sandTexture,
        
            });


            this.addChild(this.content);
        }
    }