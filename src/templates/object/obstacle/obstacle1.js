
import { ObjectModel } from "../objectModel";

export class Obstacle1 extends ObjectModel{
  constructor() {
    super();

    this.addComponent("model", {
      type: "box",
    });

    this.setLocalScale(4, 40, 4);

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(2, 20, 2),
    });

    this.addComponent("rigidbody", {
        type: "static",
    });
  }

  spawnToPosition(position) {
    this.setLocalPosition(position.x, this.collision.halfExtents.y , position.z);
  }

  
}
