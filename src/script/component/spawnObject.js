import { Vec3 } from "playcanvas";
import { Ground1 } from "../../templates/object/ground/groud1";
import { Utils } from "../../utils/utils";
import { Obstacle1 } from "../../templates/object/obstacle/obstacle1";
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

    // init spawn
    this._spawnGround();
    this._spawnObstacle();
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
      if (Utils.getChance(0.3)) {
        let obstacle = new Obstacle1(this.player);
        let randHeight = Utils.getRandomInt(10, 60);
        obstacle.setLocalScale(4, randHeight, 4);
        obstacle.spawnToPosition(new Vec3(i, randHeight / 2, this.entity.getPosition().z), this.spawnContainer);
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