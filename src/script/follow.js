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
  };

  // update code called every frame
  follow.prototype.update = function (dt) {
    // Code để cập nhật vị trí camera
    var targetPosition = this.targetEntity.getPosition().clone();
    var offset = new pc.Vec3().copy(this.offset);
    var cameraPosition = targetPosition.add(offset);

    this.entity.setPosition(cameraPosition);
  };
}
