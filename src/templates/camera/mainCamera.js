import { Entity, Color } from "playcanvas";
import { Game } from "../../game";

export class MainCamera extends Entity {
  constructor() {
    super();
    this.addComponent("camera", {
      clearColor: new Color(0.5, 0.5, 0.8),
      farClip: 1000,
      fov: 60,
      nearClip: 0.1,
    });

    
    this.addComponent("script");
    this.script.create("cameraFollow", {
        attributes: {
            offset: new pc.Vec3(0, 3, Game.player.forwardSpeed - 15 - Game.player.forwardSpeed * 0.01),
        },

    });
  }
}
