import { Entity } from "playcanvas";
import { assets } from "../../../assetLoader/assets";
import { Game } from "../../../game";

export class Gem extends Entity {
  constructor() {
    super();
    this.tags.add("collectable");
    this.tags.add("gem");
    this.addComponent("model", {
      type: "asset",
      asset: assets.gemModel,
    });

    this.setLocalScale(2, 2, 2);
    this.addComponent("collision", {
      // type: "box",
      // halfExtents: new pc.Vec3(1.5, 1.5, 1.5),
      // linearOffset: new pc.Vec3(0, 1, 0),
      // angularOffset: new pc.Vec3(0, 0, 0),

      type: "mesh",
      asset: assets.gemModel,
      
    });

    this.addComponent("rigidbody", {
      type: "dynamic",
      restitution: 0.5,
    });
    this.rigidbody.angularFactor = pc.Vec3.ZERO;
    this.rigidbody.linearFactor = pc.Vec3.ZERO;

    let material = new pc.StandardMaterial();
    material.diffuse = new pc.Color(1, 1, 0.8);
    material.update();

    this.model.model.meshInstances[0].material = material;
  }
}
