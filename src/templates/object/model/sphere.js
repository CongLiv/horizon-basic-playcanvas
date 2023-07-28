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
      restitution: 0, 
    });
    this.rigidbody.linearFactor = new pc.Vec3(1, 1, 0);
    this.rigidbody.group = 0;
    this.rigidbody.mask = 0;
    this.rigidbody.group |= pc.BODYGROUP_USER_3;
    this.rigidbody.mask |= pc.BODYGROUP_USER_1;
    this.rigidbody.mask |= pc.BODYGROUP_USER_3;

    this.model.material = Game.currentObjectMaterial;
  }
}
