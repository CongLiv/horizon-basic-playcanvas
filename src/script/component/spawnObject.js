import { Vec3 } from "playcanvas";
import { Ground1 } from "../../templates/object/ground/groud1";
import { Utils } from "../../utils/utils";
import { SetBox } from "../../templates/object/obstacle/setBox";
import { SingleBox } from "../../templates/object/obstacle/singleBox";
import { SingleCone } from "../../templates/object/obstacle/singleCone";
import { SetCone } from "../../templates/object/obstacle/setCone";
import { FallBox } from "../../templates/object/obstacle/fallBox";
import { SingleCylinder } from "../../templates/object/obstacle/singleCylinder";
import { SingleTree } from "../../templates/object/obstacle/singleTree";
import { AdjoinBox } from "../../templates/object/obstacle/adjoinBox";
import { AdjoinBox2 } from "../../templates/object/obstacle/adjoinBox2";
import { Game } from "../../game";
import { MatrixCone } from "../../templates/object/obstacle/matrixCone";
import { MatrixCylinder } from "../../templates/object/obstacle/matrixCylinder";
import { RotateBox } from "../../templates/object/obstacle/rotateBox";
import { MoveSphere } from "../../templates/object/obstacle/moveSphere";
import { SpawnLevel } from "../component/spawnLevel";
import { SetGem } from "../../templates/object/collectable/setGem";

export function SpawnObject() {
  var spawnObject = new pc.createScript("spawnObject");

  spawnObject.attributes.add("spawnContainer", {
    type: "entity",
    title: "Spawn Container",
  });

  spawnObject.prototype.initialize = function () {
    this.entity.setLocalPosition(
      Game.player.getPosition().x,
      0,
      Game.player.getPosition().z + this.entity.spawnDistance
    );

    this._spawnGroundCounter = 0;
    this._spawnObstacleCounter = 0;

    this.app.on("spawnObject:startGame", this._startGame, this);
    this.app.on("spawnObject:endGame", this._endGame, this);
    this._isStart = false;
    this._isEnd = false;

    this._spawnChance = 0.3;
    this._spawnCollectableChance = 0.1;
    this._lastObstacleType = null;
    this._changeObstacleCounter = 0;

    // init spawn
    this._spawnGround();
  };

  spawnObject.prototype.update = function (dt) {
    if (this._isStart === false || Game.onDebug == true) return;

    this.entity.setPosition(
      Game.player.getPosition().x,
      0,
      Game.player.getPosition().z + this.entity.spawnDistance
    );

    if (this._isEnd === true) return;
    this._spawnGroundCounter -= dt;
    this._spawnObstacleCounter -= dt;
    this._changeObstacleCounter -= dt;
    // calculate level
    this._level =
      Math.floor(Math.floor(Game.player.getPosition().z / 100) / 10) + 1;

    if (this._level > 5) this._level = 5;
    this._levelName = "level" + this._level.toString();

    // counters
    if (this._spawnGroundCounter <= 0) {
      this._spawnGround();
      this._spawnGroundCounter = 5;
    }

    if (this._spawnObstacleCounter <= 0) {
      this._spawnObstacle();
      this._spawnObstacleCounter = Utils.getRandomFloat(0.5, 1);
    }

    if (this._changeObstacleCounter <= 0) {
      this._lastObstacleType =
        SpawnLevel[this._levelName].general[
          Utils.getRandomInt(0, SpawnLevel[this._levelName].general.length - 1)
        ];
      // console.log(this._lastObstacleType);
      if (this._lastObstacleType == "moveSphere") {
        this._changeObstacleCounter = 2.5;
        this._spawnChance = 0.5;
      } else {
        this._changeObstacleCounter = 5;
        this._spawnChance = 0.3;
      }
    }
  };

  spawnObject.prototype._spawnGround = function () {
    let ground = new Ground1(Game.player);
    let position = new Vec3(
      Game.player.getPosition().x,
      0,
      Game.player.getPosition().z + this.entity.spawnDistance * 2
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
        let obstacle = null;
        let spawnGeneralChance = Utils.getChance(0.4);
        if (spawnGeneralChance || this._lastObstacleType == "moveSphere") {
          obstacle = this._getObstacle(this._lastObstacleType);
        } else {
          obstacle = this._getObstacle(
            SpawnLevel[this._levelName].single[
              Utils.getRandomInt(
                0,
                SpawnLevel[this._levelName].single.length - 1
              )
            ]
          );
        }

        obstacle.spawnToPosition(
          new Vec3(i, 0, this.entity.getPosition().z),
          this.spawnContainer
        );
        i += obstacle.objectWidth;
      }

      else if (Utils.getChance(this._spawnCollectableChance)) {
        let collectable = new SetGem();
        collectable.spawnToPosition(
          new Vec3(i, 0, this.entity.getPosition().z),
          this.spawnContainer
        );
      }
    }
  };

  spawnObject.prototype._startGame = function (isStart) {
    this._isStart = true;
  };

  spawnObject.prototype._endGame = function (isEnd) {
    this._isEnd = true;
  };

  spawnObject.prototype._getObstacle = function (type) {
    switch (type) {
      case "setBox":
        return new SetBox();
      case "singleBox":
        return new SingleBox();
      case "singleCone":
        return new SingleCone();
      case "setCone":
        return new SetCone();
      case "fallBox":
        return new FallBox();
      case "singleCylinder":
        return new SingleCylinder();
      case "singleTree":
        return new SingleTree();
      case "adjoinBox":
        return new AdjoinBox();
      case "adjoinBox2":
        return new AdjoinBox2();
      case "matrixCone":
        return new MatrixCone();
      case "matrixCylinder":
        return new MatrixCylinder();
      case "rotateBox":
        return new RotateBox();
      case "moveSphere":
        return new MoveSphere();
      default:
        return new SetBox();
    }
  };
}
