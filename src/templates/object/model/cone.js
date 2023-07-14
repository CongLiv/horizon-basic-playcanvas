import { Entity } from "playcanvas";

export class Cone extends Entity {
  constructor(x, y, z) {
    super();

    this.addComponent("model", {
      type: "cone",
    });

    this.setLocalScale(x, y, z);

    this.addComponent("collision", {
        type: "cone",
        radius: x/2,
        height: y,
        axis: 1,
    });

    this.addComponent("rigidbody", {
      type: "dynamic",
      restitution: 0.5,
    });
  }
}
