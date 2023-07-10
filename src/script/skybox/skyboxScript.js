
import { Utils } from "../../utils/utils.js";
export function SkyboxScript() {
  var skyboxScript = pc.createScript("skyboxScript");

  skyboxScript.prototype.initialize = function () {
    this._changeSkyboxCounter = 0;
    this._alpha = 0;
  };

  skyboxScript.prototype.update = function (dt) {
    this._changeSkyboxCounter += dt;
    if (this._changeSkyboxCounter > 5 && this._alpha == 0) {
      this._alpha += dt;
      this.targetColor = Utils.getColor(
        Utils.getRandomInt(0, 255),
        Utils.getRandomInt(0, 255),
        Utils.getRandomInt(0, 255)
      );
      this.currentColor = this.entity._scene.ambientLight;
    }

    if (this._alpha > 0) {
      this._alpha += dt;
      this._changeSkybox(this.currentColor, this.targetColor, this._alpha);
      if (this._alpha > 1) {
        this._alpha = 0;
        this._changeSkyboxCounter = 0;
      }
    }
  };

  skyboxScript.prototype._changeSkybox = function(lastColor, targetColor, alpha) {
    // caculate next color by lerp current color to target color
    let nextColor = new pc.Color();
    nextColor.lerp(lastColor, targetColor, alpha);
    this.entity._changeSkyboxColor(nextColor);
  }
}
