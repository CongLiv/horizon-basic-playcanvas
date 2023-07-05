import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";
import { PlaneControl } from "../../script/entity/planeControl";
import { ExplosionEffect } from "../../script/entity/explosiveEffect";

export class Plane1 extends Entity {
  constructor() {
    super();
    this.tags.add("player");
    this.addComponent("model", {
      type: "asset",
      asset: assets.planeModel,
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
      type: "mesh",
      asset: assets.planeModel,
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


    //TODO: add particle system behind plane
    this.addComponent("particlesystem", {
      enabled: true,
      autoPlay: true,
      localSpace: true,
      
      rate: 0.1,
      lifetime: 5,
      particleSize: 0.1,
      colorMap: assets.sandTexture.resource,
      loop: true,
      preWarm: true,
      lightAffected: false,
    });
  }

  update(dt) {}

  destroyPlayer() {
    this.destroy();
  }
}
