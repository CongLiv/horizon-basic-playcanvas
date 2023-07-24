
import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";

export class SkinPattern extends Entity {
  constructor() {
    super();

    this.addComponent("element", {
      type: "image",
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 800,
      height: 203,
      margin: new pc.Vec4(-400, -166.5, -400, -36.5),
      rect: new pc.Vec4(0, 0, 1, 1),
      textureAsset: assets.skinpatternTexture,
    });

  }
}