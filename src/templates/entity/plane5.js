import { assets } from "../../assetLoader/assets";
import { FlyMesh } from "./flyMesh";
import { SuperPlayer } from "./superPlayer";
export class Plane5 extends SuperPlayer {
  constructor() {
    super();
    this.tags.add("player");
    this.name = "skin5";

    this.addComponent("model", {
      type: "asset",
      asset: assets.plane5Model,
    });

    this.setLocalScale(0.035, 0.035, 0.035);
    this.setEulerAngles(0, 0, 0);

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(1.734, 0.218, 0.576),
      linearOffset: new pc.Vec3(0.17, -0.36, 0.745),
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
    this.flyMesh.setLocalPosition(4.5, -15, 0);
    this.flyMesh.setEulerAngles(0, 0, 90);

    this.flyMesh2 = new FlyMesh();

    this.addChild(this.flyMesh2);
    this.flyMesh2.setLocalPosition(4.5, -15, 0);
    this.flyMesh2.setEulerAngles(0, 0, 90);

    this.flyMesh3 = new FlyMesh();

    this.addChild(this.flyMesh3);
    this.flyMesh3.setLocalPosition(4.5, -15, 0);
    this.flyMesh3.setEulerAngles(0, 0, 90);
  }

  update(dt) {}

  destroyPlayer() {
    this.destroy();
  }
}
