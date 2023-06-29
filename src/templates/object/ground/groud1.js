import { assets } from "../../../assetLoader/assets";
import { ObjectScript } from "../../../script/object/objectScript";
import { Object } from "../object";
import { Game } from "../../../game";

export class Ground1 extends Object {
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
    this.groundMaterial.diffuse = new pc.Color(0.78, 0.89, 0.9)
    this.groundMaterial.update();
    this.model.material = this.groundMaterial;

    this.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(250, 0.5, 250),
    });

    this.addComponent("rigidbody", {
      type: "dynamic",
    });

    //make rigidbody dont fall down
    this.rigidbody.angularFactor = pc.Vec3.ZERO;
    this.rigidbody.linearFactor = pc.Vec3.ZERO;



  }

  spawnToPosition(position) {
    this.initPosition = new pc.Vec3(
      position.x,
      this.collision.halfExtents.y,
      position.z
    );
   
    this.setLocalPosition(position.x, this.collision.halfExtents.y, position.z);
    Game.app.root.addChild(this);

    // if (!this.addedScript) {
    //   this._addGroundScript();
    //   this.addedScript = true;
    // }
  }

  _addGroundScript() {
    ObjectScript();
    this.addComponent("script");
    this.script.create("groundScript", {
      attributes: {
        initPosition : this.initPosition,
      },
    });
  }

}
