import { Vec3 } from "playcanvas";
import { Ground1 } from "../../templates/object/ground/groud1";

export function SpawnObject() {
  let spawnObject = new pc.createScript("spawnObject");

  spawnObject.attributes.add("player", {
    type: "entity",
    title: "Player",
  });
  spawnObject.prototype.initialize = function () {
    this.entity.setLocalPosition(
      this.player.getPosition().x,
      0,
      this.player.getPosition().z + this.entity.spawnDistance
    );

    this.spawnGroundInterval = 3; // in seconds
  };

  spawnObject.prototype.update = function (dt) {
    this.entity.setPosition(
      this.player.getPosition().x,
      0,
      this.player.getPosition().z + this.entity.spawnDistance
    );
    this.spawnGroundInterval -= dt;

    if (this.spawnGroundInterval <= 0) {
      this._spawnGround();
      this.spawnGroundInterval = 3;
    }
  };

  spawnObject.prototype._spawnGround = function () {
    let ground = new Ground1(this.player);
    let position = new Vec3(this.player.getPosition().x, 0, this.player.getPosition().z)
    ground.spawnToPosition(position);
  };
}
