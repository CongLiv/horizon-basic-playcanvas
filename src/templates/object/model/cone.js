import { Entity } from "playcanvas";
import { Game } from "../../../game";
export class Cone extends Entity {
  constructor(x, y, z) {
    super();
    this.tags.add("obstacle");

    this.addComponent("model", {
      type: "cone",
    });

    this.setLocalScale(x, y, z);

    this.addComponent("collision", {
      type: "cone",
      radius: x / 2,
      height: y,
      axis: 1,
    });

    this.addComponent("rigidbody", {
      type: "dynamic",
      restitution: 0.5,
    });
    this.rigidbody.angularFactor = pc.Vec3.ZERO;
    this.rigidbody.linearFactor = pc.Vec3.ZERO;
    this.rigidbody.group = 0;
    this.rigidbody.mask = 0;
    this.rigidbody.group |= pc.BODYGROUP_USER_3;
    this.rigidbody.mask |= pc.BODYGROUP_USER_1;
    this.rigidbody.mask |= pc.BODYGROUP_USER_3;

    this.model.material = Game.currentObjectMaterial;
  }
}
