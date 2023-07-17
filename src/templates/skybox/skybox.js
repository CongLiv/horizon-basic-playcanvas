import { Entity } from "playcanvas";
import { Game } from "../../game";
import { Utils } from "../../utils/utils";

export class Skybox extends Entity {
  constructor() {
    super();
    this._scene = Game.app.scene;
    this._device = Game.app.graphicsDevice;
    this._whiteColor = new pc.Color(1, 1, 1, 1);
    this._dimension = 2;
    this._texture = new pc.Texture(this._device, {
        width: this._dimension,
        height: this._dimension,
        format: pc.PIXELFORMAT_R8_G8_B8,
        addressU: pc.ADDRESS_CLAMP_TO_EDGE,
        addressV: pc.ADDRESS_CLAMP_TO_EDGE,
      });

    this.addComponent("script");
    this.script.create("skyboxScript");

    // init skybox
    this._changeSkyboxColor(Utils.getColor(194, 222, 220));
  }


  _changeSkyboxColor(color) {
    // fill texture with gradient


    let pixels = this._texture.lock();
    let count = 0;
    let resultColor = new pc.Color();

    for (let i = 0; i < this._dimension; i++) {
      for (let j = 0; j < this._dimension; j++) {
        resultColor.lerp(color, this._whiteColor, j / (this._dimension - 1));
        pixels[count++] = resultColor.r * 255;
        pixels[count++] = resultColor.g * 255;
        pixels[count++] = resultColor.b * 255;
        pixels[count++] = resultColor.a * 255;
      }
    }

    this._texture.unlock();

    this._scene.skybox = this._texture;

    // skybox properties
    this._scene.skyboxRotation = new pc.Quat().setFromEulerAngles(150, -20, 90);
    this._scene.skyboxMip = 0;
    this._scene.fogColor = color;
    this._scene.fog = pc.FOG_LINEAR;
    this._scene.fogStart = 1;
    this._scene.fogEnd = 250;
    this._scene.fogDensity = 0.01;
    this._scene.ambientLight = color;
    this._scene.ambientLightIntensity = 0.5;
    this._scene.gammaCorrection = pc.GAMMA_SRGB;
  }
}
