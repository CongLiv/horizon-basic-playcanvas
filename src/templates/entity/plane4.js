import { assets } from "../../assetLoader/assets";
import { FlyMesh } from "./flyMesh";
import { SuperPlayer } from "./superPlayer";
export class Plane4 extends SuperPlayer {
  constructor() {
    super();
    this.tags.add("player");
    this.name = "skin4";

    this.addComponent("model", {
      type: "asset",
      asset: assets.plane4Model,
    });

    this.setLocalScale(0.03, 0.03, 0.025);
    this.setEulerAngles(0, 0, 0);

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(1.447, 0.19, 0.5),
      linearOffset: new pc.Vec3(0.155, 0, 0.865),
    });

    // this.addComponent("rigidbody", {
    //   type: "static",
    //   restitution: 0.5,

    // });
    // this.rigidbody.angularFactor = pc.Vec3.ZERO;
    // this.rigidbody.linearFactor = pc.Vec3.ZERO;
    this.addGroupAndMask();

    this.flyMesh = new FlyMesh();

    this.addChild(this.flyMesh);
    this.flyMesh.setLocalPosition(-8, -2, 5);
    this.flyMesh.setEulerAngles(0, 0, 90);

    this.flyMesh2 = new FlyMesh();

    this.addChild(this.flyMesh2);
    this.flyMesh2.setLocalPosition(17, -2, 5);
    this.flyMesh2.setEulerAngles(0, 0, 90);
  }

  update(dt) {}

  destroyPlayer() {
    this.destroy();
  }
}
