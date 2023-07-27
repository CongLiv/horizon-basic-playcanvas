import { Entity } from "playcanvas";
import { Game } from "../../../game";
export class Sphere extends Entity {
  constructor(x, y, z) {
    super();
    this.tags.add("obstacle");

    this.addComponent("model", {
      type: "sphere",
    });

    this.setLocalScale(x, y, z);

    this.addComponent("collision", {
      type: "sphere",
      radius: x / 2,
    });

    this.addComponent("rigidbody", {
      type: "dynamic",
      restitution: 0.5,
    });

    this.model.material = Game.currentObjectMaterial;
  }
}
