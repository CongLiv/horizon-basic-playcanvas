import { Entity } from "playcanvas";
import { Game } from "../../../game";

export class Box extends Entity {
  constructor(x, y, z) {
    super();
    this.tags.add("obstacle");

    this.addComponent("model", {
      type: "box",
    });

    this.setLocalScale(x, y, z);

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(x / 2, y / 2, z / 2),
      linearOffset: new pc.Vec3(0, 0, 0),
      angularOffset: new pc.Vec3(0, 0, 0),
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
