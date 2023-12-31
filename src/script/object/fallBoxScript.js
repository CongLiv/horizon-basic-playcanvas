import { Game } from "../../game";

export function FallBoxScript() {
  var fallBoxScript = pc.createScript("fallBoxScript");

  fallBoxScript.attributes.add("direction", {
    type: "number",
    title: "Direction",
    default: 1,
  });

  fallBoxScript.prototype.initialize = function () {
    this._startFall = false;
    this._fallDistance = 75;
  };

  fallBoxScript.prototype.update = function (dt) {
    let playerDistance =
      this.entity.getPosition().z - Game.player.getPosition().z;

    if (playerDistance < this._fallDistance) {
      this._startFall = true;
    }
    let fallDirection = this.direction;

    if (this._startFall == true) {
      this.entity.rigidbody.applyForce(10 * fallDirection, -10, 0);
    }
  };
}
