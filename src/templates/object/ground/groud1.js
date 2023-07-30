import { assets } from "../../../assetLoader/assets";
import { ObjectScript } from "../../../script/object/objectScript";
import { SuperObject } from "../superObject";
import { Game } from "../../../game";
import { Entity } from "playcanvas"
export class Ground1 extends SuperObject {
  constructor() {
    super();
    this.tags.add("ground");


    this.groundMaterial = Game.currentGroundMaterial;
    // // this.groundMaterial.diffuseMap = assets.sandTexture.resource;
    // // this.groundMaterial.diffuseMapTiling = new pc.Vec2(10, 10);
    // this.groundMaterial.diffuse = new pc.Color(0.5, 0.5, 0.5);
    // this.groundMaterial.update();

    
    for (var i = 0; i < 20; i++) {
      let ground = new Entity();
      ground.addComponent("model", {
        type: "plane",
      });
      this.addChild(ground);
      ground.setLocalPosition(0, 0, -350 + i * 35);
      ground.setLocalScale(700, 1, 35);
      ground.model.material = this.groundMaterial;
    }

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(350, 0.001, 350),
    });

    this.addComponent("rigidbody", {
      type: "static",
      frition: 1,
    });

    // //make rigidbody dont fall down
    // this.rigidbody.angularFactor = pc.Vec3.ZERO;
    // this.rigidbody.linearFactor = pc.Vec3.ZERO;

    this.rigidbody.group = 0;
    this.rigidbody.mask = 0;
    this.rigidbody.group |= pc.BODYGROUP_USER_3;
    this.rigidbody.mask |= pc.BODYGROUP_USER_1;
    this.rigidbody.mask |= pc.BODYGROUP_USER_3;
  }

  spawnToPosition(position, spawnContainer) {
    this.setLocalPosition(position);
    spawnContainer.addChild(this);

  }

  
}
