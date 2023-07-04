import { assets } from "../../../assetLoader/assets";
import { ObjectScript } from "../../../script/object/objectScript";
import { SuperObject } from "../superObject";
import { Game } from "../../../game";

export class Ground1 extends SuperObject {
  constructor(player) {
    super();
    this.player = player;
    this.addObjectScript();
    this.tags.add("ground");
    this.addComponent("model", {
      type: "plane",
    });

    this.setLocalScale(500, 1, 500);

    this.groundMaterial = new pc.StandardMaterial();
    // this.groundMaterial.diffuseMap = assets.sandTexture.resource;
    // this.groundMaterial.diffuseMapTiling = new pc.Vec2(10, 10);
    this.groundMaterial.diffuse = new pc.Color(0.5, 0.5, 0.5);
    this.groundMaterial.update();
    this.model.material = this.groundMaterial;
    // make sand texture repeat


    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(250, 0.5, 250),
    });

    this.addComponent("rigidbody", {
      type: "static",
    });

    // //make rigidbody dont fall down
    // this.rigidbody.angularFactor = pc.Vec3.ZERO;
    // this.rigidbody.linearFactor = pc.Vec3.ZERO;
  }

  spawnToPosition(position, spawnContainer) {
    this.setLocalPosition(position);
    spawnContainer.addChild(this);

  }
}
