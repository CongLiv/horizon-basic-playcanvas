import { Game } from "../../game";

export function ObjectScript() {
  var objectScript = new pc.createScript("objectScript");

  objectScript.prototype.initialize = function () {
    this._destroyDistance = 30;
  };

  objectScript.prototype.update = function (dt) {
    // if object after player 300 unit, destroy object
    if (
      this.entity.getPosition().z <
      Game.player.getPosition().z - this._destroyDistance
    ) {
      this.entity.destroyObject();
    }
  };
}
