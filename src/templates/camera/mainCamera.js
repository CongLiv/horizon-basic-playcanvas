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
            Offset: new pc.Vec3(0, 4.8, Game.player.forwardSpeed - 18 - Game.player.forwardSpeed * 0.01),
        },

    });
  }
}
