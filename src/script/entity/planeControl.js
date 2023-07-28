import { log } from "playcanvas";
import { Game } from "../../game";
import { ExplosiveParticle } from "../../templates/particle/explosiveParticle";
import { GemParticle } from "../../templates/particle/gemParticle";

export function PlaneControl() {
  var planeControl = pc.createScript("planeControl");

  // initialize code called once per entity
  planeControl.prototype.initialize = function () {
    this._waveCounter = 1;
    this._leanAngle = 0; // Góc nghiêng hiện tại của máy bay
    this._leanSpeed = 8; // Tốc độ nghiêng (tùy chỉnh theo nhu cầu)
    this._maxLean = 2.5; // Góc nghiêng tối đa (tùy chỉnh theo nhu cầu)
    this._flyHeight = Game.player.flyHeight; // Độ cao khi máy bay bay
    this.entity.setPosition(0, this._flyHeight, 0);
    this.entity.collision.on("collisionstart", this.onTriggerEnter, this);
    this._isStart = false;
    this._isEnd = false;

    this._touchStartPosition = null;
    this._delta = 0;
    this._leftMost = 9999;
    this._rightMost = -9999;

    this._updateTouchCounter = 0;
    this._tmpTouchPosition = 0;

    this.app.touch.on("touchstart", this.onTouchStart, this);
    this.app.touch.on("touchmove", this.onTouchMove, this);
    this.app.touch.on("touchend", this.onTouchEnd, this);
    this.app.on("planeControl:startGame", this._startGame, this);

    this.explosiveParticle = new ExplosiveParticle();
    this.entity.addChild(this.explosiveParticle);
    this.explosiveParticle.particleEntity.particlesystem.on("end", () => {
      this.destroyPlayer();
    });
  };

  // update code called every frame
  planeControl.prototype.update = function (dt) {
    if (this._isStart && this._isEnd == false && Game.onDebug == false) {
      var x = 0;

      if (this.app.keyboard.isPressed(pc.KEY_A) || this._delta > 0) {
        x += 1;
        this.entity.isTurnLeft = true;
        this.entity.isTurnRight = false;
        this.entity.isMovingStraight = false;
      }
      if (this.app.keyboard.isPressed(pc.KEY_D) || this._delta < 0) {
        x -= 1;
        this.entity.isTurnRight = true;
        this.entity.isTurnLeft = false;
        this.entity.isMovingStraight = false;
      }

      if (x === 0) {
        this.entity.isMovingStraight = true;
        this.entity.isTurnLeft = false;
        this.entity.isTurnRight = false;
      }

      // use direction from input to apply a force to the character
      if (x !== 0) {
        // TODO un-optimized code!

        if (this._delta === 0) {
          this.entity.turnSpeed = this.entity.initTurnSpeed;
        } else {
          this.entity.turnSpeed = Math.abs(this._delta) / 10;
        }

        const movement = new pc.Vec3(x, 0, 0)
          .normalize()
          .scale(dt * this.entity.turnSpeed);
        this.entity.translate(movement);
      }

      // make plane fly wave pattern
      let pos = this.entity.getPosition();
      this._waveCounter += dt * 2;
      pos.y = this._flyHeight + Math.sin(this._waveCounter) / 2;
      this.entity.setPosition(pos);

      // make plane always fly forward
      this.entity.translate(0, 0, dt * this.entity.forwardSpeed);
    }

    // make plane lean left and right slightly
    let rot = this.entity.getRotation();

    // Tính toán góc nghiêng mới dựa trên hướng di chuyển
    if (x !== 0) {
      if (x > 0) {
        this._leanAngle += this._leanSpeed * dt;
      }
      if (x < 0) {
        this._leanAngle -= this._leanSpeed * dt;
      }
    } else {
      if (this._leanAngle > 0) {
        this._leanAngle -= this._leanSpeed * dt;
      }
      if (this._leanAngle < 0) {
        this._leanAngle += this._leanSpeed * dt;
      }
    }
    this._leanAngle = pc.math.clamp(
      this._leanAngle,
      -this._maxLean,
      this._maxLean
    );

    rot.z = this._leanAngle * 0.1;
    this.entity.setRotation(rot);

    // console.log("delta on loop: " + this._delta);
  };

  planeControl.prototype.onTriggerEnter = function (env) {
    if (env.other.tags.has("obstacle")) {
      this._isEnd = true;
      Game.Sound.play("explosion");
      this.app.fire("managerUI:endGame", true);
      this.app.fire("cameraFollow:endGame", true);
      this.app.fire("spawnObject:endGame", true);
      Game.lastSkin = Game.player.name;
      // save point
      Game.lastPoint = this.entity.getPosition().z / 10 + Game.gemPoint;
      Game.highestPoint = Math.max(Game.highestPoint, Game.lastPoint);
      Game.gemPoint = 0;
      // play particle before destroy
      this.entity.model.enabled = false;
      this.explosiveParticle.play();
    } else if (env.other.tags.has("collectable")) {
      if (env.other.tags.has("gem")) {
        Game.Sound.playGemSound();
        // rest logic for gem in gemScript
        env.other.gemCollected();
      }
    }
  };

  planeControl.prototype._startGame = function () {
    this._isStart = true;
  };

  planeControl.prototype.onTouchStart = function (event) {
    this._touchStartPosition = event.touches[0].x;
    // console.log("touch start: " + this._touchStartPosition);
  };

  planeControl.prototype.onTouchMove = function (event) {
    let currentTouchPosition = event.touches[0].x;

    if (
      (currentTouchPosition < 80 || currentTouchPosition > 310) &&
      Math.abs(this._delta) > 80 &&
      Game.isPortrait()
    ) {
      if (Math.abs(this._delta) < 150) {
        if (currentTouchPosition < 80) {
          this._delta = 150;
        }
        if (currentTouchPosition > 310) {
          this._delta = -150;
        }
      } else this._delta *= 1.015;
      // console.log("delta: " + this._delta);
    } else {
      // save leftmost touch when turn left and rightmost touch when turn right
      if (this.entity.isTurnLeft) {
        if (currentTouchPosition < this._leftMost) {
          this._leftMost = currentTouchPosition;
          this._rightMost = -9999;
        } else {
          this._touchStartPosition = this._leftMost;
        }
      }
      if (this.entity.isTurnRight) {
        if (currentTouchPosition > this._rightMost) {
          this._rightMost = currentTouchPosition;
          this._leftMost = 9999;
        } else {
          this._touchStartPosition = this._rightMost;
        }
      }

      if (this._touchStartPosition !== null) {
        this._delta = this._touchStartPosition - currentTouchPosition;
      }
    }
  };

  planeControl.prototype.onTouchEnd = function (event) {
    this._touchStartPosition = null;
    this._delta = 0;
    this._updateTouchCounter = 0;
    this._leftMost = 9999;
    this._rightMost = -9999;
    // console.log("last touch start: " + this._touchStartPosition);
  };
}
