import { SuperObject } from "../superObject";
import { Game } from "../../../game";
import { assets } from "../../../assetLoader/assets";
import { Utils } from "../../../utils/utils";
export class Obstacle1 extends SuperObject {
  constructor(player) {
    super(player);
    this.player = player;
    this.addObjectScript();
    this.tags.add("obstacle");

    this.addComponent("model", {
      type: "box",
    });

    this.setLocalScale(4, 40, 4);

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(2, 20, 2),
    });

    this.addComponent("rigidbody", {
      type: "dynamic",
      restitution: 0.5,
    });
   
    this.rigidbody.angularFactor = pc.Vec3.ZERO;
    this.rigidbody.linearFactor = pc.Vec3.ZERO;

    this.obstacleMaterial = new pc.StandardMaterial();
    this.obstacleMaterial.diffuseMap = assets.rockTexture.resource;
    this.obstacleMaterial.diffuseMapTiling = new pc.Vec2(Utils.getRandomInt(1, 2), Utils.getRandomInt(1, 3));
    this.obstacleMaterial.update();
    this.model.material = this.obstacleMaterial;
  }

  spawnToPosition(position) {

    this.setLocalPosition(position);
    Game.app.root.addChild(this);
  }
}
