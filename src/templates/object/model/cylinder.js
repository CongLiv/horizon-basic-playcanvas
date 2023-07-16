import { Entity } from "playcanvas";

export class Cylinder extends Entity {
  constructor(x, y, z) {
    super();
    this.tags.add("obstacle");

    this.addComponent("model", {
      type: "cylinder",
    });

    this.setLocalScale(x, y, z);

    this.addComponent("collision", {
      type: "cylinder",
      radius: x / 2,
      height: y,
      axis: 1,
    });

    this.addComponent("rigidbody", {
      type: "dynamic",
      restitution: 0.5,
    });
  }
}
