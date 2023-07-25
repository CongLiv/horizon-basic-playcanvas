import { PlayScene } from "../../../scenes/playScene";
import { SceneManager } from "../../../templates/scene/sceneManager";

export function EndBackgroundScript() {
  var endBackgroundScript = new pc.createScript("endBackgroundScript");


  endBackgroundScript.prototype.initialize = function () {
    this._explodeCounter = 0;
  };

  endBackgroundScript.prototype.update = function (dt) {

    this._explodeCounter += dt;

    if (this._explodeCounter >= 0.5){
      // make background opacity increase slowly
      let opacity = this.entity.element.opacity;
      opacity += 0.01;
      this.entity.element.opacity = opacity;
  
      if (opacity >= 1){
          let playScene = SceneManager.currentScene;
          playScene.restart();
          this.app.fire("managerUI:backHome", true);
          this.entity.element.opacity = 0;
          this._explodeCounter = 0;

      }
    }

  };
}
