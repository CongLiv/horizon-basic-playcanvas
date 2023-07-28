import { Entity } from "playcanvas";

export class SuperPlayer extends Entity {
  constructor() {
    super();
    this.addComponent("script");
    this.script.create("planeControl");

    this.initTurnSpeed = 15;
    this.turnSpeed = this.initTurnSpeed;
    this.initForwardSpeed = 50;
    this.forwardSpeed = this.initForwardSpeed;

    this.isTurnLeft = false;
    this.isTurnRight = false;
    this.isMovingStraight = true;

    this.flyHeight = 5;
  }

  update(dt) {}

  destroyPlayer() {
    this.destroy();
  }

  addGroupAndMask() {
    this.addComponent("rigidbody", {
      type: "kinematic",
      restitution: 0,
    });
    this.rigidbody.group = 0;
    this.rigidbody.mask = 0;
    this.rigidbody.group |= pc.BODYGROUP_USER_1;
    this.rigidbody.mask |= pc.BODYGROUP_USER_1;
    this.rigidbody.mask |= pc.BODYGROUP_USER_2;
    this.rigidbody.mask |= pc.BODYGROUP_USER_3;
  }
}
