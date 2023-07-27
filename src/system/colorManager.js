import { log } from "playcanvas";
import { Game } from "../game";
import { Utils } from "../utils/utils";
export function ColorManager() {
  var colorManager = new pc.createScript("colorManager");

  colorManager.prototype.initialize = function () {
    Game.skyboxColorList = [
      Utils.getColor(161, 204, 209), // gray
      Utils.getColor(253, 216, 156), // orange
      Utils.getColor(161, 204, 209), // blue
      Utils.getColor(160, 216, 179), // green
      Utils.getColor(229, 220, 195), // yellow
    ];

    Game.groundColorList = [
      Utils.getColor(128, 128, 128), // gray
      Utils.getColor(241, 194, 123), 
      Utils.getColor(233, 179, 132), 
      Utils.getColor(162, 163, 120),
      Utils.getColor(199, 190, 162),
    ];

    Game.objectColorList = [
      Utils.getColor(128, 128, 128),    // gray
      Utils.getColor(133, 163, 137), 
      Utils.getColor(124, 157, 150),
      Utils.getColor(131, 118, 79),
      Utils.getColor(154, 148, 131),
    ];
    this._alpha = 0;
    Game.currentGroundColor = new pc.Color();
    Game.currentObjectColor = new pc.Color();
    Game.currentGroundColor = Game.groundColorList[0];
    Game.currentObjectColor = Game.objectColorList[0];
    Game.currentGroundMaterial = new pc.StandardMaterial();
    Game.currentObjectMaterial = new pc.StandardMaterial();
    Game.currentGroundMaterial.diffuse = Game.currentGroundColor;
    Game.currentObjectMaterial.diffuse = Game.currentObjectColor;
    Game.currentGroundMaterial.update();
    Game.currentObjectMaterial.update();
    this.app.on("colorManager:reset", this._resetColor, this);
  };

  colorManager.prototype.update = function (dt) {
    let currentPoint = Math.floor(Game.player.getPosition().z / 10);
    // if player fly 100m, change skybox color
    if (currentPoint != 0 && currentPoint % 100 === 0 && this._alpha == 0) {
      this._alpha += dt;

      // make target color is squential color
      let targetColorIndex = Math.floor(currentPoint / 100);
      if (targetColorIndex > 4) targetColorIndex = 4;
      this.targetGroundColor = Game.groundColorList[targetColorIndex];
      this.targetObjectColor = Game.objectColorList[targetColorIndex];
      this.currentGroundColor = Game.currentGroundColor;
      this.currentObjectColor = Game.currentObjectColor;
    }

    if (this._alpha > 0) {
      this._alpha += dt;
      this._changeObjectColor(
        this.currentObjectColor,
        this.targetObjectColor,
        this._alpha
      );
      this._changeGroundColor(
        this.currentGroundColor,
        this.targetGroundColor,
        this._alpha
      );
      if (this._alpha > 0.99) {
        this._alpha = 0;
      }
    }
  };

  colorManager.prototype._changeGroundColor = function (
    currentColor,
    targetColor,
    alpha
  ) {
    // caculate next color by lerp current color to target color
    let nextColor = new pc.Color();
    nextColor.lerp(currentColor, targetColor, alpha);
    Game.currentGroundColor = nextColor;
    Game.currentGroundMaterial.diffuse = Game.currentGroundColor;
    Game.currentGroundMaterial.update();
  };

  colorManager.prototype._changeObjectColor = function (
    currentColor,
    targetColor,
    alpha
  ) {
    // caculate next color by lerp current color to target color
    let nextColor = new pc.Color();
    nextColor.lerp(currentColor, targetColor, alpha);
    Game.currentObjectColor = nextColor;
    Game.currentObjectMaterial.diffuse = Game.currentObjectColor;
    Game.currentObjectMaterial.update();
  };

  colorManager.prototype._resetColor = function () {
    this._alpha = 0;
    Game.currentGroundColor = Game.groundColorList[0];
    Game.currentObjectColor = Game.objectColorList[0];
    Game.currentGroundMaterial.diffuse = Game.currentGroundColor;
    Game.currentObjectMaterial.diffuse = Game.currentObjectColor;
    Game.currentGroundMaterial.update();
    Game.currentObjectMaterial.update();
  };
}
