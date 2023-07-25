import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";
import { FlyMesh } from "./flyMesh";
import { SuperPlayer } from "./superPlayer";
export class Plane3 extends SuperPlayer {
  constructor() {
    super();
    this.tags.add("player");
    this.name = "skin3";

    this.addComponent("model", {
      type: "asset",
      asset: assets.plane3Model,
    });


    this.setLocalScale(0.023, 0.025, 0.025);
    this.setEulerAngles(0, 0, 0);

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(1.937, 0.222, 0.5),
      linearOffset: new pc.Vec3(0, -0.33, 0.44),
    });

    // this.addComponent("rigidbody", {
    //   type: "static",
    //   restitution: 0.5,

    // });
    // this.rigidbody.angularFactor = pc.Vec3.ZERO;
    // this.rigidbody.linearFactor = pc.Vec3.ZERO;

  
    this.flyMesh = new FlyMesh();

    this.addChild(this.flyMesh);
    this.flyMesh.setLocalPosition(-13, -25, 0.2);
    this.flyMesh.setEulerAngles(0, 0, 90);

    this.flyMesh2 = new FlyMesh();

    this.addChild(this.flyMesh2);
    this.flyMesh2.setLocalPosition(13, -25, 0.2);
    this.flyMesh2.setEulerAngles(0, 0, 90);
  }

  update(dt) {}
}
