import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";

export class PointBar extends Entity{

    constructor(){
        super();
        this.addComponent('element', {
            type: "group",
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),

        });


        this.header = new Entity();
        this.addChild(this.header);
        this.header.addComponent('element', {
            type: "text",
            text: "header",
            fontSize: 3.5,
            outline: true,
            outlineColor: new pc.Color(1, 1, 1, 1),
            outlineThickness: 0.5,
            fontAsset: assets.font1,
            color: new pc.Color(1, 1, 1, 1),
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
        }); 

        this.header.setLocalPosition(0, 0, 0);

        this.point = new Entity();
        this.addChild(this.point);
        this.point.addComponent('element', {
            type: "text",
            text: "0",
            fontSize: 5,
            outline: true,
            outlineColor: new pc.Color(1, 1, 1, 1),
            outlineThickness: 0.5,
            fontAsset: assets.font1,
            color: new pc.Color(1, 1, 1, 1),
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
        });
        this.point.setLocalPosition(0, 5, 0);



    }

}