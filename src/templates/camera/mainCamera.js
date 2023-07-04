import { Entity, Color } from "playcanvas";

export class MainCamera extends Entity {
  constructor(targetEntity) {
    super();
    this.targetEntity = targetEntity;
    this.addComponent("camera", {
      clearColor: new Color(0.5, 0.5, 0.8),
      farClip: 1000,
      fov: 60,
      nearClip: 0.1,
    });

    
    this.addComponent("script");
    this.script.create("cameraFollow", {
        attributes: {
            targetEntity: this.targetEntity,
            offset: new pc.Vec3(0, 3, this.targetEntity.forwardSpeed - 15 - this.targetEntity.forwardSpeed * 0.01),
        },

    });
  }
}
