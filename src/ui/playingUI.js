import { Entity } from "playcanvas";
import { assets } from "../assetLoader/assets";
import { Game } from "../game.js";

export class PlayingUI extends Entity {
  constructor(player) {
    super();
    this.player = player;
    this.screen = new Entity();
    this.screen.addComponent("screen", {
      screenSpace: true,
      scaleMode: "blend",
      referenceResolution: new pc.Vec2(128, 72),
      scaleBlend: 0.5,
      scaleToWindow: true,
      useRenderResolution: false,
      maxScale: 1,
      minScale: 0.5,
      renderMode: "blend",
      resolutionScale: 1,
      screenSpaceScaleMode: "blend",
    });

    this.scoreText = new Entity();
    this.scoreText.addComponent("element", {
      type: "text",
      text: "0",
      fontSize: 3.5,
      outline: true,
      outlineColor: new pc.Color(1, 1, 0.8, 1),
      outlineThickness: 0.5,
      fontAsset: assets.font1,
      color: new pc.Color(1, 1, 0.8, 1),
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
    });

    // reference to the app screen height
    this.screenHeight = Game.app.graphicsDevice.height;
    // set the score text position based on the screen height
    if (this.screenHeight < 720) {
      this.scoreText.setLocalPosition(0, 30, 0);
    } else {
      this.scoreText.setLocalPosition(0, 50, 0);
      this.scoreText.element.fontSize = 5;
    }
    

    this.scoreText.addComponent("script");
    this.scoreText.script.create("scoreTextScript", {
      attributes: {
        player: this.player,
      },
    });

    this.screen.addChild(this.scoreText);
    this.addChild(this.screen);
  }

}
