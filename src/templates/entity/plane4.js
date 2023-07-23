import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";
import { FlyMesh } from "./flyMesh";
export class Plane4 extends Entity {
  constructor() {
    super();
    this.tags.add("player");
    this.tags.add("plane4");

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

    this.addComponent("script");
    this.script.create("planeControl");

    this.initTurnSpeed = 15;
    this.turnSpeed = this.initTurnSpeed;
    this.initForwardSpeed = 50;
    this.forwardSpeed = this.initForwardSpeed;

    this.isTurnLeft = false;
    this.isTurnRight = false;
    this.isMovingStraight = true;

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
