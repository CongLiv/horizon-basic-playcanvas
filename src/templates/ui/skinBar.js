import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";
import { Text } from "./text";
import { Game } from "../../game";
import { Plane1 } from "../entity/plane1";
import { Plane2 } from "../entity/plane2";
import { Plane3 } from "../entity/plane3";
import { Plane4 } from "../entity/plane4";
import { Plane5 } from "../entity/plane5";
import { SceneManager } from "../scene/sceneManager";

export class SkinBar extends Entity {
  constructor(skinName, skinIndex) {
    super();
    this.skinName = skinName;
    this.skinIndex = skinIndex;
    this.setLocalPosition(0, 20 - 20 * this.skinIndex, 0);
    this.addComponent("element", {
      type: "group",
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      margin: [-65, 10 - 20 * this.skinIndex, -65, -30],
      width: 130,
      height: 20,
      useInput: true,
    });

    this.skinText = new Text(this.skinName, 32);
    this.addChild(this.skinText);

    this.skinText.element.margin = new pc.Vec4(
      -67.656,
      -15.904,
      -37.656,
      -15.904
    );
    this.skinText.setLocalPosition(-15, 0, 0);
    this.skinText.setLocalScale(0.2, 0.2, 0.2);

    this.skinImage = new Entity();
    this.addChild(this.skinImage);
    this.skinImage.addComponent("element", {
      type: "image",
      anchor: [0.5, 0.5, 0.5, 0.5],
      pivot: [0.5, 0.5],
      margin: [-130, -149.5, -170, -149.5],
      width: 300,
      height: 300,
      color: new pc.Color(1, 1, 1),
      rect: [0, 0, 1, 1],
    });
    this._loadSkinImage();
    this.skinImage.setLocalPosition(20, 0, 0);
    this.skinImage.setLocalScale(0.05, 0.05, 0.05);

    this.isUsing = false;
    this.unUseSkin();

    this.addComponent("script");
    this.script.create("skinBarScript");
  }

  _loadSkinImage() {
    switch (this.skinName) {
      case "skin1":
        this.skinImage.element.textureAsset = assets.skin1Texture;
        break;
      case "skin2":
        this.skinImage.element.textureAsset = assets.skin2Texture;
        break;
      case "skin3":
        this.skinImage.element.textureAsset = assets.skin3Texture;
        break;
      case "skin4":
        this.skinImage.element.textureAsset = assets.skin4Texture;
        break;
      case "skin5":
        this.skinImage.element.textureAsset = assets.skin5Texture;
        break;
      default:
        break;
    }
  }

  useSkin() {
    this.skinText.element.opacity = 1;
    this.skinImage.element.opacity = 1;
    Game.player.destroy();
    switch (this.skinName) {
      case "skin1":
        Game.player = new Plane1();
        break;
      case "skin2":
        Game.player = new Plane2();
        break;
      case "skin3":
        Game.player = new Plane3();
        break;
      case "skin4":
        Game.player = new Plane4();
        break;
      case "skin5":
        Game.player = new Plane5();
        break;
      default:
        break;
    }
    SceneManager.currentScene.addChild(Game.player);
  }

  unUseSkin() {
    this.skinText.element.opacity = 0.5;
    this.skinImage.element.opacity = 0.5;
  }
}
