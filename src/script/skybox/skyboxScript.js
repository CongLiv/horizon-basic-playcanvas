import { Game } from "../../game.js";
import { Utils } from "../../utils/utils.js";
export function SkyboxScript() {
  var skyboxScript = pc.createScript("skyboxScript");

  skyboxScript.prototype.initialize = function () {
    this._alpha = 0;

    this._listColor = [
      Utils.getColor(194, 222, 220), // gray
      Utils.getColor(244, 177, 131), // orange
      Utils.getColor(160, 191, 224), // blue
      Utils.getColor(179, 200, 144), // green
      Utils.getColor(236, 229, 199), // yellow
    ];
  };

  skyboxScript.prototype.update = function (dt) {
    let currentPoint = Math.floor(Game.player.getPosition().z / 10);
    // if player fly 100m, change skybox color
    if (currentPoint != 0 && currentPoint % 100 === 0 && this._alpha == 0) {
      this._alpha += dt;

      // make target color is squential color
      let targetColorIndex =
        Math.floor(currentPoint / 100) % this._listColor.length;
      this.targetColor = this._listColor[targetColorIndex];
      this.currentColor = this.entity._scene.ambientLight;
    }

    if (this._alpha > 0) {
      this._alpha += dt;
      this._changeSkybox(this.currentColor, this.targetColor, this._alpha);
      if (this._alpha > 1) {
        this._alpha = 0;
      }
    }


    // Debug on
    if (Game.onDebug) {
      this.entity._scene.fogEnd = 100000;
    } else {
      this.entity._scene.fogEnd = 250;
    }
  };

  skyboxScript.prototype._changeSkybox = function (
    lastColor,
    targetColor,
    alpha
  ) {
    // caculate next color by lerp current color to target color
    let nextColor = new pc.Color();
    nextColor.lerp(lastColor, targetColor, alpha);
    this.entity._changeSkyboxColor(nextColor);
  };
}
