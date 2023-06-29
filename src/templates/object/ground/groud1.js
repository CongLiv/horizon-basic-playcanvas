import { assets } from "../../../assetLoader/assets";
import { ObjectModel } from "../objectModel";

export class Ground1 extends ObjectModel{
  constructor() {
    super();

    this.addComponent("model", {
      type: "plane",
    });

    this.setLocalScale(300, 1, 300);
    this.groundMaterial = new pc.StandardMaterial();
    this.groundMaterial.diffuseMap = assets.groundTexture.resource;

    // make ground material repeat in ground
    this.groundMaterial.diffuseMapTiling = new pc.Vec2(15, 15);
    this.groundMaterial.update();
    this.model.material = this.groundMaterial;

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(150, 0.5, 150),
    });

    this.addComponent("rigidbody", {
        type: "static",
    });
  }

  spawnToPosition(position) {
    this.setLocalPosition(position.x, this.collision.halfExtents.y , position.z);
  }

  
}
