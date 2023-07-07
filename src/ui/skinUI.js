import { Entity } from "playcanvas";
import { assets } from "../assetLoader/assets";
import { Game } from "../game.js";

export class SkinUI extends Entity {
  constructor() {
    super();
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

    this.background = new Entity();

    this.background.addComponent("element", {
      type: "image",
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      color: new pc.Color(0, 0, 0, 0),
      width: 720,
      height: 1280,
      opacity: 0.2,
    });

    this.screen.addChild(this.background);
    // responsive
    let isPortrait =
      Game.app.graphicsDevice.height > Game.app.graphicsDevice.width;

    this.backButton = new Entity();
    this.backButton.addComponent("element", {
      type: "image",
      textureAsset: assets.backButtonTexture,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      opacity: 1,
      useInput: true,
    });

    this.backButton.addComponent("script");
    this.backButton.script.create("backButtonScript");

    if (isPortrait) {
        this.backButton.element.width = 30;
        this.backButton.element.height = 12;
        this.backButton.setLocalPosition(0, -50, 0);
      } else {
        this.backButton.element.width = 20;
        this.backButton.element.height = 8;
        this.backButton.setLocalPosition(0, -25, 0);
      }


    this.screen.addChild(this.backButton);

   

    this.addChild(this.screen);
  }
}
