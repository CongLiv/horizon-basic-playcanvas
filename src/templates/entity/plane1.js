import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";
import { PlaneControl } from "../../script/entity/planeControl";

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
      speed: 1,
      loop: true,
      activate: true,
    });

    this.animation.play(assets.flyAnim.name, 0.3);

    this.addComponent("collision", {
      type: "mesh",
      asset: assets.planeModel,
    });
    this.addComponent("rigidbody", {
      type: "static",
    });

    PlaneControl();
    this.addComponent("script");
    this.script.create("planeControl");

    this.turnSpeed = 10;
    this.forwardSpeed = 5;
  }

  update(dt) {}
}
