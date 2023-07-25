import { Entity } from "playcanvas";
import { assets } from "../assetLoader/assets";
import { Game } from "../game.js";
import { Screen2D } from "../templates/ui/screen2D";

export class PlayingUI extends Entity {
  constructor() {
    super();

    this.screen = new Screen2D();
    this.addChild(this.screen);

    this.scoreText = new Entity();
    this.screen.addChild(this.scoreText);
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
    if (!Game.isPortrait()) {
      this.scoreText.setLocalPosition(0, 30, 0);
    } else {
      this.scoreText.setLocalPosition(0, 50, 0);
      this.scoreText.element.fontSize = 5;
    }
    this.scoreText.addComponent("script");
    this.scoreText.script.create("scoreTextScript");

  

  }

}
