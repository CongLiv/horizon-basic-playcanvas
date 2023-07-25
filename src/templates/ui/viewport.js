import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";
import { SkinBar } from "./skinBar";
import { Game } from "../../game";
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

    if (Game.isPortrait() == false) {
      this.element.height = 50;
      this.element.margin = new pc.Vec4(-65, -25, -65, -25);


    }

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

    if (Game.isPortrait() == false) {
      this.content.setLocalScale(0.6, 0.6, 0.6);
      this.content.element.height = 70;
      this.content.element.margin = new pc.Vec4(-65, -20, -65, -5);
      this.content.setLocalPosition(0, 20, 0);

    }
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
