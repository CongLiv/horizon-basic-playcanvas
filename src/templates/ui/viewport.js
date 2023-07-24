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
      height: 160,
      useInput: true,
    });

    this.skinBar1 = new SkinBar("skin1", 0);
    this.content.addChild(this.skinBar1);
    

    this.skinBar2 = new SkinBar("skin2", 1);
    this.content.addChild(this.skinBar2);

    this.skinBar3 = new SkinBar("skin3", 2);
    this.content.addChild(this.skinBar3);

    this.skinBar4 = new SkinBar("skin4", 3);
    this.content.addChild(this.skinBar4);

    this.skinBar5 = new SkinBar("skin5", 4);
    this.content.addChild(this.skinBar5);

    this.addChild(this.content);
  }
}
