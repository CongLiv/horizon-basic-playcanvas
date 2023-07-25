import { Plane1 } from "../../../templates/entity/plane1";
import { Plane2 } from "../../../templates/entity/plane2";
import { Plane3 } from "../../../templates/entity/plane3";
import { Plane4 } from "../../../templates/entity/plane4";
import { Plane5 } from "../../../templates/entity/plane5";
import { Game } from "../../../game";

export function ListSkinScript() {
  var listSkinScript = pc.createScript("listSkinScript");

  listSkinScript.attributes.add("listSkinBar", { type: "entity", array: true });

  listSkinScript.prototype.initialize = function () {
    let currentSkin = Game.player.name;
    this.listSkinBar.forEach((skinBar) => {
      if (skinBar.skinName == currentSkin) {
        skinBar.isUsing = true;
        skinBar.useSkin();
      }
    });

    this.app.on("listSkinScript:skinSelect", this._skinSelect, this);
  };

  listSkinScript.prototype._skinSelect = function (skinName) {
    this.listSkinBar.forEach((skinBar) => {
      if (skinBar.skinName != skinName) {
        skinBar.isUsing = false;
        skinBar.unUseSkin();
      } else {
        skinBar.isUsing = true;
        skinBar.useSkin();
      }
    });
  };

  listSkinScript.prototype.update = function (dt) {};
}
