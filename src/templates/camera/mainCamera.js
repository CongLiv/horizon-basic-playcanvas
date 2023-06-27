import { Entity, Color } from "playcanvas";
import { Follow } from "../../script/follow";

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
    this.setLocalPosition(0, 0, -50);
    this.setLocalEulerAngles(-30, 180, 0);

    Follow();
    this.addComponent("script");
    this.script.create("follow", {
        attributes: {
            targetEntity: this.targetEntity,
            offset: new pc.Vec3(0, 3, -5),
        },

    });
  }
}