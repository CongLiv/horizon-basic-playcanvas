import { Game } from "../../../game";

export function SkinBarScript() {
  var skinBarScript = new pc.createScript("skinBarScript");

  skinBarScript.prototype.initialize = function () {
    this.entity.element.on("click", this._onClick, this);
  };

  skinBarScript.prototype._onClick = function (event) {
    Game.Sound.play("click");
    this.app.fire("listSkinScript:skinSelect", this.entity.skinName);
  };
  skinBarScript.prototype.update = function (dt) {};
}
