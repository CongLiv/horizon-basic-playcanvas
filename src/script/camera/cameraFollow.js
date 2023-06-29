import { Vec3 } from "playcanvas";

export function Follow() {
  var follow = pc.createScript("follow");
  follow.attributes.add("targetEntity", {
    type: "entity",
    title: "Target Entity",
  });

  follow.attributes.add("offset", {
    type: "vec3",
    default: [0, 0, 0],
    title: "Offset",
  });

  // initialize code called once per entity
  follow.prototype.initialize = function () {
    // Code để thiết lập camera theo dõi
    this.entity.lookAt(this.targetEntity.getPosition());
    this.following = false; // Biến theo dõi trạng thái follow
    this.smoothTime = 1; // Thời gian mượn camera
    this.velocity = new pc.Vec3(); // Vận tốc của camera
    this.lastX = 0; // Vị trí x cuối cùng của camera
    this.offset = new pc.Vec3(
      0,
      3,
      this.targetEntity.forwardSpeed -
        15 -
        this.targetEntity.forwardSpeed * 0.01
    );
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
    var isMovingLeft = x > 0;
    var isMovingRight = x < 0;

    if (isMovingStraight) {
      this.lastX = this.entity.getPosition().x;
    }

    // Nếu target đang di chuyển thẳng và chưa đang theo dõi, bắt đầu follow
    if (isMovingStraight && !this.following) {
      this.following = true;
      this.lastX = this.entity.getPosition().x;
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
      this.lastX = this.entity.getPosition().x;
    } else {
      
      let movement = new Vec3(0, 0, this.targetEntity.forwardSpeed * dt);
      // Nếu target di chuyển ra ngoài camera, camera sẽ di chuyển để đuổi kịp
      let distanceToTarget = Math.abs(this.lastX - this.targetEntity.getPosition().x);

      let plusCameraSpeed = 1;
      let currentDistanceToTarget = Math.abs(this.entity.getPosition().x - this.targetEntity.getPosition().x);
      if (currentDistanceToTarget > 0.1) {
        plusCameraSpeed = 1;
        // this.lastX = this.entity.getPosition().x;
      }

      if (distanceToTarget > 5) {
        // camera move slightly to make sure the plane is in the view
        let moveSpeed =
          this.lastX - this.targetEntity.getPosition().x > 0 ? -1 : 1;
        movement = new Vec3(
          moveSpeed * this.targetEntity.turnSpeed * plusCameraSpeed * dt,
          0,
          this.targetEntity.forwardSpeed * dt
        );
        
     
      
      }
      this.entity.translate(movement);
    }
  };
}
