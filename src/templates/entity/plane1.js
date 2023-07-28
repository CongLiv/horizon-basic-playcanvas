import { assets } from "../../assetLoader/assets";
import { FlyMesh } from "./flyMesh";
import { SuperPlayer } from "./superPlayer";
export class Plane1 extends SuperPlayer {
  constructor() {
    super();
    this.tags.add("player");
    this.name = "skin1";
    this.addComponent("model", {
      type: "asset",
      asset: assets.plane1Model,
    });

    this.setLocalScale(2, 2, 2);
    this.setLocalPosition(0, 0, 0);

    this.addComponent("animation", {
      assets: [assets.flyAnim],
      speed: 1.5,
      loop: true,
      activate: true,
    });

    this.animation.play(assets.flyAnim.name, 0.3);

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(2, 0.2, 0.672),
      linearOffset: new pc.Vec3(0, -0.06, 0.48),
    });

    
    // this.rigidbody.angularFactor = pc.Vec3.ZERO;
    // this.rigidbody.linearFactor = pc.Vec3.ZERO;

    this.addGroupAndMask();

    this.flyMesh = new FlyMesh();

    this.addChild(this.flyMesh);
    this.flyMesh.setLocalPosition(-0.85, -0.17, 0.2);
    this.flyMesh.setEulerAngles(0, 0, 90);

    this.flyMesh2 = new FlyMesh();

    this.addChild(this.flyMesh2);
    this.flyMesh2.setLocalPosition(0.85, -0.17, 0.2);
    this.flyMesh2.setEulerAngles(0, 0, 90);
  }

  update(dt) {}
}
