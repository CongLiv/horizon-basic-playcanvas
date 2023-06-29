import { SuperObject } from "../superObject";
import { Game } from "../../../game";

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
      type: "static",
    });
    
    this.obstacleMaterial = new pc.StandardMaterial();
    this.obstacleMaterial.diffuse = new pc.Color(0.6, 0.3, 0);
    this.obstacleMaterial.update();
    this.model.material = this.obstacleMaterial;
    

  }

  spawnToPosition(position) {
    this.setLocalPosition(position);
    Game.app.root.addChild(this);
  }
}
