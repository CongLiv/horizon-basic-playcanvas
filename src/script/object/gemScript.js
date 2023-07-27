import { GemParticle } from "../../templates/particle/gemParticle";

export function GemScript() {
  var gemScript = new pc.createScript("gemScript");

  gemScript.prototype.initialize = function () {
    this._waveCounter = 1;
  };

  gemScript.prototype.update = function (dt) {
    let pos = this.entity.getPosition();
    this._waveCounter += dt * 2.5;
    pos.y = 4 + Math.sin(this._waveCounter);
    this.entity.setPosition(pos);
  };
}
