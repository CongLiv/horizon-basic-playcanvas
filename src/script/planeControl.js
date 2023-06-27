export function PlaneControl() {
  let control = pc.createScript("planeControl");

 
  // initialize code called once per entity
  control.prototype.initialize = function () {
    this.waveCounter = 1;
    this.leanAngle = 0; // Góc nghiêng hiện tại của máy bay
    this.leanSpeed = 6; // Tốc độ nghiêng (tùy chỉnh theo nhu cầu)
    this.maxLean = 2.5; // Góc nghiêng tối đa (tùy chỉnh theo nhu cầu)
    this.flyHeight = 10; // Độ cao khi máy bay bay
    this.entity.setPosition(0, this.flyHeight, 0);
  };

  // update code called every frame
  control.prototype.update = function (dt) {
    var x = 0;

    if (this.app.keyboard.isPressed(pc.KEY_A)) {
      x += 1;
    }
    if (this.app.keyboard.isPressed(pc.KEY_D)) {
      x -= 1;
    }

    // use direction from input to apply a force to the character
    if (x !== 0) {
      // TODO un-optimized code!
      const movement = new pc.Vec3(x, 0, 0).normalize().scale(dt * this.entity.speed);
      this.entity.translate(movement);
    }

    // make plane always fly forward
    this.entity.translate(0, 0, dt * this.entity.speed);

    // make plane fly wave pattern
    let pos = this.entity.getPosition();
    this.waveCounter += dt * 2;
    pos.y = this.flyHeight + Math.sin(this.waveCounter);
    this.entity.setPosition(pos);

    // make plane lean left and right slightly
    let rot = this.entity.getRotation();

    // Tính toán góc nghiêng mới dựa trên hướng di chuyển
    if (x !== 0) {
      if (x > 0) {
        this.leanAngle += this.leanSpeed * dt;
      }
      if (x < 0) {
        this.leanAngle -= this.leanSpeed * dt;
      }
    } else {
      if (this.leanAngle > 0) {
        this.leanAngle -= this.leanSpeed * dt;
      }
      if (this.leanAngle < 0) {
        this.leanAngle += this.leanSpeed * dt;
      }
    }
    this.leanAngle = pc.math.clamp(this.leanAngle, -this.maxLean, this.maxLean);

    rot.z = this.leanAngle * 0.1;
    this.entity.setRotation(rot);
  };
}
