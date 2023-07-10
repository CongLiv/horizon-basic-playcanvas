import { Entity } from "playcanvas";
import { assets } from "../assetLoader/assets";
import { Game } from "../game.js";
import { Screen2D } from "../templates/ui/screen2D";
import { BackGround } from "../templates/ui/background";
import { PointBar } from "../templates/ui/pointBar";

export class StartUI extends Entity {
  constructor() {
    super();
    this.screen = new Screen2D();
    this.addChild(this.screen);

    this.background = new BackGround();
    this.screen.addChild(this.background);


    // title 
    this.title = new Entity();
    this.screen.addChild(this.title);
    this.title.addComponent("element", {
      type: "image",
      textureAsset: assets.logoTexture,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      opacity: 1,
    });
    if (Game.isPortrait()) {
      this.title.element.width = 70;
      this.title.element.height = 54;
      this.title.setLocalPosition(0, 35, 0);
    } else {
      this.title.element.width = 80;
      this.title.element.height = 60
      this.title.setLocalPosition(0, 15, 0);
    }


    // point bar
    this.lastPointBar = new PointBar();
    this.screen.addChild(this.lastPointBar);
    this.lastPointBar.header.element.text = "Score";
    this.lastPointBar.point.element.text = Math.floor(Game.lastPoint).toString();
    

    this.highestPointBar = new PointBar();
    this.screen.addChild(this.highestPointBar);
    this.highestPointBar.header.element.text = "Best";
    this.highestPointBar.point.element.text = Math.floor(Game.highestPoint).toString();
    
    if (Game.isPortrait()) {
      this.lastPointBar.setLocalPosition(-18, 18, 0);
      this.highestPointBar.setLocalPosition(18, 18, 0);
    
    }
    else {
      this.lastPointBar.setLocalPosition(-20, 0, 0);
      this.highestPointBar.setLocalPosition(20, 0, 0);
    }
  
    

    // start button
    this.startButton = new Entity();
    this.screen.addChild(this.startButton);
    this.startButton.addComponent("element", {
      type: "image",
      textureAsset: assets.playButtonTexture,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 20,
      height: 8,
      useInput: true,
    });
    if (Game.isPortrait()) {
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

   
    // skin button
    this.skinButton = new Entity();
    this.screen.addChild(this.skinButton);
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
    if (Game.isPortrait()) {
      this.skinButton.element.width = 30;
      this.skinButton.element.height = 12;
      this.skinButton.setLocalPosition(0, -30, 0);
    } else {
      this.skinButton.element.width = 20;
      this.skinButton.element.height = 8;
      this.skinButton.setLocalPosition(0, -20, 0);
    }

    
      
    
  }
}
