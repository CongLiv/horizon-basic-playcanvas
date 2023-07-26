import { Entity } from "playcanvas";
import { assets } from "../../assetLoader/assets";
import { Utils } from "../../utils/utils";

export class Sound extends Entity {
  constructor() {
    super();
    this.addComponent("sound");
    this._initSound();

    this.currentThemeSound = 1;
  }

  _initSound() {
    this.sound.addSlot("themesound", {
      asset: assets.themeSound,
      pitch: 1,
      loop: true,
      autoPlay: false,
    });

    this.sound.addSlot("click", {
      asset: assets.clickSound,
      pitch: 1,
      loop: false,
      autoPlay: false,
    });

    this.sound.addSlot("explosion", {
      asset: assets.explosiveSound,
      pitch: 1,
      loop: false,
      autoPlay: false,
      overlap: true,
    });

    this.sound.addSlot("theme1", {
      asset: assets.themeSound1,
      pitch: 1,
      loop: true,
      autoPlay: false,
    });

    this.sound.addSlot("theme2", {
      asset: assets.themeSound2,
      pitch: 1,
      loop: true,
      autoPlay: false,
    });

    this.sound.addSlot("theme3", {
      asset: assets.themeSound3,
      pitch: 1,
      loop: true,
      autoPlay: false,
    });

    this.sound.addSlot("theme4", {
      asset: assets.themeSound4,
      pitch: 1,
      loop: true,
      autoPlay: false,
    });

    this.sound.addSlot("theme5", {
      asset: assets.themeSound5,
      pitch: 1,
      loop: true,
      autoPlay: false,
    });

    this.sound.addSlot("theme6", {
      asset: assets.themeSound6,
      pitch: 1,
      loop: true,
      autoPlay: false,
    });
  }

  play(soundName) {
    this.sound.play(soundName);
  }

  stop(soundName) {
    this.sound.stop(soundName);
  }

  playThemeSound() {
    let rand = Utils.getRandomInt(1, 6);
    this.currentThemeSound = rand;
    switch (rand) {
      case 1:
        this.sound.play("theme1");
        break;
      case 2:
        this.sound.play("theme2");
        break;
      case 3:
        this.sound.play("theme3");
        break;
      case 4:
        this.sound.play("theme4");
        break;
      case 5:
        this.sound.play("theme5");
        break;
      case 6:
        this.sound.play("theme6");
        break;
      default:
        break;
    }
  }

  stopThemeSound() {
    switch (this.currentThemeSound) {
      case 1:
        this.sound.stop("theme1");
        break;
      case 2:
        this.sound.stop("theme2");
        break;
      case 3:
        this.sound.stop("theme3");
        break;
      case 4:
        this.sound.stop("theme4");
        break;
      case 5:
        this.sound.stop("theme5");
        break;
      case 6:
        this.sound.stop("theme6");
        break;
      default:
        break;
    }
  }
}
