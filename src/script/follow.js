export function Follow() {
  let follow = pc.createScript("follow");
  follow.attributes.add("targetEntity", {
    type: "entity",
    title: "Target Entity",
  });

  follow.attributes.add("offset", {
    type: "vec3",
    default: [0, 2, -5],
    title: "Offset",
  });

  // initialize code called once per entity
  follow.prototype.initialize = function () {
    // Code để thiết lập camera theo dõi
    this.entity.lookAt(this.targetEntity.getPosition());
    this.following = false; // Biến theo dõi trạng thái follow
    this.smoothTime = 1; // Thời gian mượn camera
    this.velocity = new pc.Vec3(); // Vận tốc của camera
    this.lastPos = new pc.Vec3(); // Vị trí tạm thời của camera
  };

  // update code called every frame
  follow.prototype.update = function (dt) {
    var x = 0;

    if (this.app.keyboard.isPressed(pc.KEY_A)) {
      x += 1;
    }
    if (this.app.keyboard.isPressed(pc.KEY_D)) {
      x -= 1;
    }

    // Kiểm tra xem target có di chuyển thẳng hay không
    var isMovingStraight = x == 0;

    // Nếu target đang di chuyển thẳng và chưa đang theo dõi, bắt đầu follow
    if (isMovingStraight && !this.following) {
      this.following = true;
    }

    // Nếu target đang di chuyển trái hoặc phải và đang theo dõi, dừng follow
    if (!isMovingStraight && this.following) {
      this.following = false;
    }

    // Nếu đang theo dõi, cập nhật vị trí camera
    if (this.following) {
      var targetPosition = this.targetEntity.getPosition().clone();
      var offset = new pc.Vec3().copy(this.offset);
      // Sử dụng phương pháp lerp để mượn camera
      var position = this.entity.getPosition().clone();
      position.lerp(position, targetPosition.add(offset), this.smoothTime * dt);
      this.entity.setPosition(position);
      this.lastPos = position;
    }
    else {
      this.entity.translate(0, 0, this.targetEntity.speed * dt);

      // if current pos is further 5 units from last pos, move camera temporarily
      if (this.entity.getPosition().distance(this.lastPos) > 5) {
        

      }
    }

  };
}
