export function PlaneControl() {
  let control = pc.createScript("planeControl");

  let waveCounter = 1;
  let quat = new pc.Quat(0, 0, 0, 0);
  let leanAngle = 0; // Góc nghiêng hiện tại của máy bay
  let leanSpeed = 10; // Tốc độ nghiêng (tùy chỉnh theo nhu cầu)
  let maxLean = 4; // Góc nghiêng tối đa (tùy chỉnh theo nhu cầu)

  control.attributes.add("speed", {
    type: "number",
    default: 10,
    title: "Speed",
  });
  // initialize code called once per entity
  control.prototype.initialize = function () {
    this.entity.setPosition(0, 7, 0);
  };

  // update code called every frame
  control.prototype.update = function (dt) {
    var x = 0;
    var z = 0;

    if (this.app.keyboard.isPressed(pc.KEY_A)) {
      x += 1;
    }
    if (this.app.keyboard.isPressed(pc.KEY_D)) {
      x -= 1;
    }
    if (this.app.keyboard.isPressed(pc.KEY_W)) {
      z += 1;
    }
    if (this.app.keyboard.isPressed(pc.KEY_S)) {
      z -= 1;
    }

    // use direction from input to apply a force to the character
    if (x !== 0 || z !== 0) {
      // TODO un-optimized code!
      const movement = new pc.Vec3(x, 0, z).normalize().scale(dt * this.speed);
      this.entity.translate(movement);
    }

    // make plane fly wave pattern
    let pos = this.entity.getPosition();
    waveCounter += dt * 2;
    pos.y = 7 + Math.sin(waveCounter);
    this.entity.setPosition(pos);

    // make plane lean left and right slightly
    let rot = this.entity.getRotation();

    // Tính toán góc nghiêng mới dựa trên hướng di chuyển
    if (x !== 0) {
      if (x > 0) {
        leanAngle += leanSpeed * dt;
      }
      if (x < 0) {
        leanAngle -= leanSpeed * dt;
      }
    } else {
      if (leanAngle > 0) {
        leanAngle -= leanSpeed * dt;
      }
      if (leanAngle < 0) {
        leanAngle += leanSpeed * dt;
      }
    }
    leanAngle = pc.math.clamp(leanAngle, -maxLean, maxLean);

    rot.z = leanAngle * 0.1;
    this.entity.setRotation(rot);
  };
}
