import { PlayScene } from "../../scenes/playScene";
import { SceneManager } from "../../templates/scene/sceneManager";

export function EndBackgroundScript() {
  var endBackgroundScript = new pc.createScript("endBackgroundScript");

  endBackgroundScript.attributes.add("player", {
    type: "entity",
    title: "Player",
  });

  endBackgroundScript.prototype.initialize = function () {};

  endBackgroundScript.prototype.update = function (dt) {
    // make background opacity increase slowly
    let opacity = this.entity.element.opacity;
    opacity += dt;
    this.entity.element.opacity = opacity;

    if (opacity >= 1){
        SceneManager.loadScene(new PlayScene());
    }
  };
}
