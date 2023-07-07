import { Entity } from "playcanvas";
import { assets } from "../assetLoader/assets";
import { Game } from "../game.js";

export class StartUI extends Entity {
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

    this.title = new Entity();

    this.title.addComponent("element", {
      type: "image",
      textureAsset: assets.logoTexture,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      opacity: 1,
    });

    // responsive
    let isPortrait =
      Game.app.graphicsDevice.height > Game.app.graphicsDevice.width;

    if (isPortrait) {
      this.title.element.width = 64;
      this.title.element.height = 9.6;
    } else {
      this.title.element.width = 80;
      this.title.element.height = 12;
    }


    this.screen.addChild(this.title);
    this.title.setLocalPosition(0, 15, 0);

    this.startButton = new Entity();
    this.startButton.addComponent("element", {
      type: "image",
      textureAsset: assets.playButtonTexture,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 20,
      height: 8,
      useInput: true,
    });
    
    if (isPortrait) {
      this.startButton.element.width = 30;
      this.startButton.element.height = 12;
      this.startButton.setLocalPosition(0, -15, 0);
    } else {
      this.startButton.element.width = 20;
      this.startButton.element.height = 8;
      this.startButton.setLocalPosition(0, -10, 0);
    }


    this.startButton.addComponent("script");
    this.startButton.script.create("startButtonScript");

    this.screen.addChild(this.startButton);


    this.skinButton = new Entity();
    this.skinButton.addComponent("element", {
      type: "image",
      textureAsset: assets.skinButtonTexture,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 20,
      height: 8,  
      useInput: true,
    });
    this.skinButton.addComponent("script");
    this.skinButton.script.create("skinButtonScript");
    this.screen.addChild(this.skinButton);

    if (isPortrait) {
      this.skinButton.element.width = 30;
      this.skinButton.element.height = 12;
      this.skinButton.setLocalPosition(0, -30, 0);
    } else {
      this.skinButton.element.width = 20;
      this.skinButton.element.height = 8;
      this.skinButton.setLocalPosition(0, -20, 0);
    }

    
      

    this.addChild(this.screen);
  }
}
