import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";
import { SkinBar } from "./skinBar";

export class Viewport extends Entity {
  constructor() {
    super();

    this.addComponent("element", {
      type: "image",
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 130,
      height: 150,
      margin: new pc.Vec4(-60, -60, -60, -90),
      color: new pc.Color(0, 0, 0, 1),
      rect: new pc.Vec4(0, 0, 1, 1),
      mask: true,
    });

    this.content = new Entity();

    this.content.addComponent("element", {
      type: "group",
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      margin: new pc.Vec4(-65, -80, -65, -80),
      width: 130,
      height: 180,
      useInput: true,
    });

    this.listSkinBar = [];

    this._addListSkinBar();

    this.addComponent("script");
    this.script.create("listSkinScript", {
      attributes: {
        listSkinBar: this.listSkinBar,
      },
    });
    
    this.addChild(this.content);
  }

  _addListSkinBar() {
    this.listSkinBar.push(new SkinBar("skin1", 0));
    this.listSkinBar.push(new SkinBar("skin2", 1));
    this.listSkinBar.push(new SkinBar("skin3", 2));
    this.listSkinBar.push(new SkinBar("skin4", 3));
    this.listSkinBar.push(new SkinBar("skin5", 4));

    this.listSkinBar.forEach((skinBar) => {
      this.content.addChild(skinBar);
    });
  }

}
