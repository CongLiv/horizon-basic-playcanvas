import { Entity } from "playcanvas";
import { assets } from "../../../assetLoader/assets";
import { Game } from "../../../game";
import { GemParticle } from "../../particle/gemParticle";

export class Gem extends Entity {
  constructor() {
    super();
    this.tags.add("collectable");
    this.tags.add("gem");
    this.addComponent("model", {
      type: "asset",
      asset: assets.gemModel,
    });

    this.setLocalScale(2, 2, 2);
    this.addComponent("collision", {
      type: "mesh",
      asset: assets.gemModel,
    });

    this.addComponent("rigidbody", {
      type: "dynamic",
      restitution: 0.5,
    });
    this.rigidbody.angularFactor = pc.Vec3.ZERO;
    this.rigidbody.linearFactor = pc.Vec3.ZERO;
    this.rigidbody.group = 0;
    this.rigidbody.mask = 0;
    this.rigidbody.group |= pc.BODYGROUP_USER_2;
    this.rigidbody.mask |= pc.BODYGROUP_USER_1;
    this.rigidbody.mask |= pc.BODYGROUP_USER_2;

    this.model.model.meshInstances[0].material = Game.GEM_MATERIAL;

    this.gemParticle = new GemParticle();
    this.addChild(this.gemParticle);
    this.gemParticle.particleEntity.particlesystem.on("end", () => {
      this.destroy();
    });
  }

  gemCollected() {
    this.model.enabled = false;
    this.gemParticle.play();
    Game.gemPoint += 5; 
  }
}
