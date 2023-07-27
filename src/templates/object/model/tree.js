import { Entity } from "playcanvas";
import { assets } from "../../../assetLoader/assets";
import { Game } from "../../../game";
export class Tree extends Entity {
  constructor() {
    super();
    this.tags.add("obstacle");

    this.addComponent("model", {
      type: "asset",
      asset: assets.treeModel,
    });

    this.setLocalScale(1, 1, 1);

    this.addComponent("collision", {
      type: "mesh",
      asset: assets.treeModel,
      linearOffset: new pc.Vec3(0, 0, 0),
      angularOffset: new pc.Vec3(0, 0, 0),
    });

    this.addComponent("rigidbody", {
      type: "dynamic",
      restitution: 0.5,
    });
    this.rigidbody.angularFactor = pc.Vec3.ZERO;
    this.rigidbody.linearFactor = pc.Vec3.ZERO;

    this.model.model.meshInstances[0].material = Game.currentObjectMaterial;
  }
}
