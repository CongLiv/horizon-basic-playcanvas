import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";

export class Text extends Entity{

    constructor(text, fontSize){
        super();
        this.text = text;
        this.fontSize = fontSize;
        this.addComponent("element", {
            type: "text",
            anchor: [0.5, 0.5, 0.5, 0.5],
            pivot: [0.5, 0.5],
            autoWidth: true,
            autoHeight: true,
            margin: [0, 0, 0, 0],
            alignment: [0.5, 0.5],
            fontAsset: assets.font1,
            fontSize: this.fontSize,
            lineHeight: this.fontSize,
            text: this.text,
            color: new pc.Color(1, 1, 1),
            outlineColor: new pc.Color(1, 1, 1),
            outlineThickness: 0.2,
        });
    
    }

}