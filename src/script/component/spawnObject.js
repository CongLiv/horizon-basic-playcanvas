import { Vec3 } from "playcanvas";
import { Ground1 } from "../../templates/object/ground/groud1";
import { Utils } from "../../utils/utils";
import { SetBox } from "../../templates/object/obstacle/setBox";
import { SingleBox } from "../../templates/object/obstacle/singleBox";
import { Cone } from "../../templates/object/model/cone";
import { SingleCone } from "../../templates/object/obstacle/singleCone";
import { SetCone } from "../../templates/object/obstacle/setCone";
import { FallBox } from "../../templates/object/obstacle/fallBox";
import { SingleCylinder } from "../../templates/object/obstacle/singleCylinder";
import { SingleTree } from "../../templates/object/obstacle/singleTree";
import { AdjoinBox } from "../../templates/object/obstacle/adjoinBox";
import { AdjoinBox2 } from "../../templates/object/obstacle/adjoinBox2";
export function SpawnObject() {
  var spawnObject = new pc.createScript("spawnObject");

  spawnObject.attributes.add("player", {
    type: "entity",
    title: "Player",
  });

  spawnObject.attributes.add("spawnContainer", {
    type: "entity",
    title: "Spawn Container",
  });

  spawnObject.prototype.initialize = function () {
    this.entity.setLocalPosition(
      this.player.getPosition().x,
      0,
      this.player.getPosition().z + this.entity.spawnDistance
    );

    this._spawnGroundCounter = 0;
    this._spawnObstacleCounter = 0;

    this.app.on("spawnObject:startGame", this._startGame, this);
    this.app.on("spawnObject:endGame", this._endGame, this);
    this._isStart = false;
    this._isEnd = false;

    this._spawnChance = 0.15;

    // init spawn
    this._spawnGround();

  };

  spawnObject.prototype.update = function (dt) {
    if (this._isStart === false) return;

    this.entity.setPosition(
      this.player.getPosition().x,
      0,
      this.player.getPosition().z + this.entity.spawnDistance
    );

    if (this._isEnd === true) return;
    this._spawnGroundCounter -= dt;
    this._spawnObstacleCounter -= dt;

    if (this._spawnGroundCounter <= 0) {
      this._spawnGround();
      this._spawnGroundCounter = 5;
    }

    if (this._spawnObstacleCounter <= 0) {
      this._spawnObstacle();
      this._spawnObstacleCounter = Utils.getRandomFloat(0.5, 1);;
    }
  };

  
  spawnObject.prototype._spawnGround = function () {
    let ground = new Ground1(this.player);
    let position = new Vec3(
      this.player.getPosition().x,
      0,
      this.player.getPosition().z + this.entity.spawnDistance * 2
    );
    ground.spawnToPosition(position, this.spawnContainer);
  };

  spawnObject.prototype._spawnObstacle = function () {
    // spawn obstacles random along the x-axis of the object
    let pivotLeft =
      this.entity.getPosition().x - this.entity.getLocalScale().x / 2;
    let pivotRight =
      this.entity.getPosition().x + this.entity.getLocalScale().x / 2;

    for (let i = pivotLeft; i < pivotRight; i += 10) {
      if (Utils.getChance(this._spawnChance)) {
        let obstacle = new SingleTree();
        obstacle.spawnToPosition(new Vec3(i, 0, this.entity.getPosition().z), this.spawnContainer);
        i += obstacle.objectWidth;
      }
    }
  };

  spawnObject.prototype._startGame = function (isStart) {
    this._isStart = true;
  };

  spawnObject.prototype._endGame = function (isEnd) {
    this._isEnd = true;
  }

}
