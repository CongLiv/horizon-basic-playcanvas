import { Vec3 } from "playcanvas";
import { Game } from "../../game";
export function CameraFollow() {
  var cameraFollow = pc.createScript("cameraFollow");

  cameraFollow.attributes.add("offset", {
    type: "vec3",
    default: [0, 0, 0],
    title: "Offset",
  });

  // initialize code called once per entity
  cameraFollow.prototype.initialize = function () {
    // Code để thiết lập camera theo dõi
    this.entity.lookAt(Game.player.getPosition());
    this._following = false; // Biến theo dõi trạng thái follow
    this._smoothTime = 1; // Thời gian mượn camera
    this._velocity = new pc.Vec3(); // Vận tốc của camera
    this._lastX = 0; // Vị trí x cuối cùng của camera
    this.offset = new pc.Vec3(
      0,
      6,
      Game.player.forwardSpeed - 15 - Game.player.forwardSpeed * 0.01
    );
    this.entity.setLocalEulerAngles(-8, 180, 0);
    this.app.on("cameraFollow:startGame", this._startGame, this);
    this.app.on("cameraFollow:endGame", this._endGame, this);

    this._isStart = false;
    this._isEnd = false;

    this._turnDetectLastCount = 0;
    this._turnDetectCount = 0;

    this._shakeCounter = 0;
    this._shakeDuration = 0.5;

    this._moveCameraStart = 7;
  };

  // update code called every frame
  cameraFollow.prototype.update = function (dt) {
    if (!this._isStart) {
      // make camera move around the plane when the game starts
      this._moveCameraStart += dt / 10;

      this.entity.setPosition(Math.sin(this._moveCameraStart) * 5, 7, -12);
      this.entity.lookAt(Game.player.getPosition() + new Vec3(0, 2, 0));

      return;
    }
    var x = 0;
    if (!this._isEnd) {
      if (Game.player.isTurnLeft) {
        x += 1;
        this._turnDetectCount++;
      }
      if (Game.player.isTurnRight) {
        x -= 1;
        this._turnDetectCount++;
      }
    }

    // Kiểm tra xem target có di chuyển thẳng hay không

    if (Game.player.isMovingStraight) {
      this._lastX = this.entity.getPosition().x;
    }

    // Nếu target đang di chuyển thẳng và chưa đang theo dõi, bắt đầu follow
    if (Game.player.isMovingStraight && !this._following) {
      this._following = true;
      this._lastX = this.entity.getPosition().x;
    }

    // Nếu target đang di chuyển trái hoặc phải và đang theo dõi, dừng follow
    if (!Game.player.isMovingStraight && this._following) {
      this._following = false;
    }

    // Nếu đang theo dõi, cập nhật vị trí camera
    if (this._following && !this._isEnd) {
      var targetPosition = Game.player.getPosition().clone();
      var offset = new pc.Vec3().copy(this.offset);
      // Sử dụng phương pháp lerp để mượn camera
      var position = this.entity.getPosition().clone();
      position.lerp(
        position,
        targetPosition.add(offset),
        this._smoothTime * dt
      );
      this.entity.setPosition(position);
      this._lastX = this.entity.getPosition().x;
    } else if (!this._isEnd) {
      let movement = new Vec3(0, 0, Game.player.forwardSpeed * dt);
      // Nếu target di chuyển ra ngoài camera, camera sẽ di chuyển để đuổi kịp

      if (this._turnDetectLastCount != this._turnDetectCount) {
        this._turnDetectLastCount = this._turnDetectCount;
        this._lastX = this.entity.getPosition().x;
      }

      let distanceToTarget = Math.abs(
        this._lastX - Game.player.getPosition().x
      );

      let plusCameraSpeed = 1;
      let currentDistanceToTarget = Math.abs(
        this.entity.getPosition().x - Game.player.getPosition().x
      );
      if (currentDistanceToTarget > 0.1) {
        plusCameraSpeed = 1;
        // this._lastX = this.entity.getPosition().x;
      }
      if (distanceToTarget > 4) {
        // camera move slightly to make sure the plane is in the view

        let moveSpeed = this._lastX - Game.player.getPosition().x > 0 ? -1 : 1;
        movement = new Vec3(
          moveSpeed * Game.player.turnSpeed * plusCameraSpeed * dt,
          0,
          Game.player.forwardSpeed * dt
        );
      }
      this.entity.translate(movement);
    }
  };

  cameraFollow.prototype._startGame = function () {
    this._isStart = true;
  };

  cameraFollow.prototype._endGame = function () {
    this._isEnd = true;

    // Make camera shake when the game ends
    this.app.on("update", this._shakeUpdate, this);
  };

  cameraFollow.prototype._shakeUpdate = function (dt) {
    this._shakeCounter += dt;
    if (this._shakeCounter > this._shakeDuration) {
      this.app.off("update", this._shakeUpdate, this);
      this._shakeCounter = 0;
    }

    var shakeIntensity = 0.5; // Adjust the intensity of the shake

    // Store the initial camera position
    var initialPosition = this.entity.getPosition().clone();

    // Shake the camera for a specified duration
    var shakeTimer = 0;
    shakeTimer += dt;

    // Calculate the shake offset
    var randomOffset = new pc.Vec3(
      Math.random() * shakeIntensity - shakeIntensity / 2,
      Math.random() * shakeIntensity - shakeIntensity / 2,
      Math.random() * shakeIntensity - shakeIntensity / 2
    );

    // Apply the shake offset to the camera position
    this.entity.setPosition(initialPosition.add(randomOffset));
  };
}
