import { Game } from "../../../game";

export function ScoreTextScript() {
  var scoreTextScript = pc.createScript("scoreTextScript");

  scoreTextScript.prototype.initialize = function () {
    this.entity.element.text = "0";
  };

  scoreTextScript.prototype.update = function (dt) {
    this.entity.element.text = Math.floor(Game.player.getPosition().z / 10) + Game.gemPoint;
  };
}
