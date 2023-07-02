import { Game } from "../../game";

export class SceneManager {
  /**
   * @param {Array<Scene>} scenes
   */
  static init(scenes) {
    this.scenes = scenes;
    // /** @type {Array<Scene>} */
    // this.addtiveScenes = [];
  }

  /**
   * @param {Scene} scene
   */

  static loadScene(scene) {
    if (this.currentScene) {
      for (let i = this.currentScene.children.length - 1; i >= 0; i--) {
        this.currentScene.children[i].destroy();
      }
    }
    Game.app.root.removeChild(this.currentScene);
    this.currentScene?.destroy();
    this.currentScene = scene;
    Game.app.root.addChild(this.currentScene);
  }

  // static loadSceneAddtive(scene) {
  //   this.addtiveScenes.push(scene);
  //   Game.app.root.addChild(scene);
  // }

  static update(dt) {
    this.currentScene?.update(dt);
    // this.addtiveScenes.forEach((scene) => scene.update(dt));
  }

  static resize() {
    this.currentScene?.resize();
    // this.addtiveScenes.forEach((scene) => scene.resize());
  }

  static pause() {
    this.currentScene?.pause();
    // this.addtiveScenes.forEach((scene) => scene.pause());
  }

  static resume() {
    this.currentScene?.resume();
    // this.addtiveScenes.forEach((scene) => scene.resume());
  }

  // static getScene(key) {
  //   return this.scenes.find((s) => s.key === key);
  // }
}
