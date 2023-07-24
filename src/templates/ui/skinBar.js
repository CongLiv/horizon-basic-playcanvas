import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";
import { Text } from "./text";

export class SkinBar extends Entity{
    constructor(skinName, skinIndex){
        super();
        this.skinName = skinName;
        this.skinIndex = skinIndex;
        
        this.addComponent("element", {
            type: "group",
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            margin: [-36.3, 4 - 32 * this.skinIndex, 4.38, -36],
            width: 32,
            height: 32,
        });


        this.skinText = new Text(this.skinName, 32)
        this.addChild(this.skinText);
   
        this.skinText.element.margin = new pc.Vec4(-44.818, -15.904, -60.494, -15.904);
        this.skinText.setLocalPosition(7.838, 0, 0);
        this.skinText.setLocalScale(0.2, 0.2, 0.2);

        this.skinImage = new Entity();
        this.addChild(this.skinImage);
        this.skinImage.addComponent("element", {
            type: "image",
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            margin: [-108.349, -147.273, -191.651, -151.727],
            width: 300,
            height: 300,
            color: new pc.Color(1, 1, 1),
            rect: [0, 0, 1, 1],
            textureAsset: assets.skin1Texture,
        });
        this.skinImage.setLocalPosition(41.651, 0, 0);
        this.skinImage.setLocalScale(0.05, 0.05, 0.05);



    }


}