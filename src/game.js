import {
  Application,
  RESOLUTION_AUTO,
  FILLMODE_FILL_WINDOW,
  WasmModule,
  ElementInput,
  Keyboard,
  Mouse,
  TouchDevice,
} from "playcanvas";
import { AssetLoader } from "./assetLoader/assetLoader.js";
import { InputManager } from "./system/inputManager.js";
import { loadObitCameraPlugin } from "./script/camera/orbit-camera.js";
import { SceneManager } from "./templates/scene/sceneManager.js";
import { PlayScene } from "./scenes/playScene.js";
import { ObjectScript } from "./script/object/objectScript.js";
import { PlaneControl } from "./script/entity/planeControl.js";
import { SpawnObject } from "./script/component/spawnObject.js";
import { CameraFollow } from "./script/camera/cameraFollow.js";
import { EndBackgroundScript } from "./script/ui/endUI/endBackgroundScript.js";
import { ScoreTextScript } from "./script/ui/playingUI/scoreTextScript.js";
import { StartButtonScript } from "./script/ui/startUI/startButtonScript.js";
import { ManagerUI } from "./script/ui/managerUI.js";
import { SkinButtonScript } from "./script/ui/startUI/skinButtonScript.js";
import { BackButtonScript } from "./script/ui/skinUI/backButtonScript.js";
import { SkyboxScript } from "./script/skybox/skyboxScript.js";
import { ScrollBarScript } from "./script/ui/skinUI/scrollBarScript.js";
import { FallBoxScript } from "./script/object/fallBoxScript.js";
import { RenderPhysicLoader } from "./system/renderPhysicLoader.js";
import { Ribbon } from "./script/entity/ribbon.js";
import { RotateBox } from "./templates/object/obstacle/rotateBox.js";
import { RotateBoxScript } from "./script/object/rotateBoxScript.js";
import { MoveSphere } from "./templates/object/obstacle/moveSphere.js";
import { MoveSphereScript } from "./script/object/moveSphereScript.js";
import { ListSkinScript } from "./script/ui/skinUI/listSkinScript.js";
// import { ExplosionEffect } from "./script/entity/explosiveEffect.js";

import { Plane1 } from "./templates/entity/plane1.js";
import { Plane2 } from "./templates/entity/plane2.js";
import { Plane3 } from "./templates/entity/plane3.js";
import { Plane4 } from "./templates/entity/plane4.js";
import { Plane5 } from "./templates/entity/plane5.js";
import { SkinBarScript } from "./script/ui/skinUI/skinBarScript.js";
import { Sound } from "./templates/sound/sound.js";
import { GemScript } from "./script/object/gemScript.js";
import { SoundScript } from "./script/sound/soundScript.js";
import { ColorManager } from "./system/colorManager.js";

export class Game {
  static onDebug = false;

  static player = null;
  static lastSkin = null;
  static lastPoint = 0;
  static highestPoint = 0;
  static Sound = null;
  static gemPoint = 0;
  static objectColorList = [];
  static groundColorList = [];
  static skyboxColorList = [];
  static currentObjectColor = null;
  static currentGroundColor = null;
  static currentObjectMaterial = null;
  static currentGroundMaterial = null;
  static GEM_MATERIAL = null;

  static init() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    this.app = new Application(canvas, {
      elementInput: new ElementInput(canvas),
      keyboard: new Keyboard(window),
      mouse: new Mouse(canvas),
      touch: new TouchDevice(canvas),
      
    });

    this.app.setCanvasResolution(RESOLUTION_AUTO);
    this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
    this.app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
    window.addEventListener("resize", () => this.app.resizeCanvas);

    // load ammo library
    WasmModule.setConfig("Ammo", {
      glueUrl: "assets/libs/ammo.wasm.js",
      wasmUrl: "assets/libs/ammo.wasm.wasm",
      fallbackUrl: "assets/libs/ammo.js",
    });

    // load all script
    loadObitCameraPlugin();
    ObjectScript();
    PlaneControl();
    SpawnObject();
    CameraFollow();
    EndBackgroundScript();
    ScoreTextScript();
    StartButtonScript();
    ManagerUI();
    SkinButtonScript();
    BackButtonScript();
    SkyboxScript();
    ScrollBarScript();
    FallBoxScript();
    RenderPhysicLoader();
    Ribbon();
    RotateBoxScript();
    MoveSphereScript();
    ListSkinScript();
    SkinBarScript();
    GemScript();
    SoundScript();
    ColorManager();

    WasmModule.getInstance("Ammo", () => {
      AssetLoader.loadAssets(this.app, () => {
        this.load();
        this.create();
      });
    });
  }

  static load() {
    InputManager.init(this.app);
    this.app.start();
    this.app.on("update", (dt) => this.update(dt));
  }

  static create() {
    this.gameCreated = true;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
    this.app.resizeCanvas(this.width, this.height);

    SceneManager.init([new PlayScene()]);
    SceneManager.loadScene(SceneManager.scenes[0]);
  }

  static update(dt) {
    SceneManager.update(dt);
  }

  static resize(screenSize) {
    if (this.gameCreated) {
      this.width = screenSize.width;
      this.height = screenSize.height;
      this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
      this.app.resizeCanvas(this.width, this.height);
      SceneManager.resize();
      this.app.fire("resize");
    }
  }

  static isPortrait() {
    return this.height > this.width;
  }
}

window.onload = function () {
  Game.init();
};

window.addEventListener("resize", (event) => {
  Game.resize({ width: window.innerWidth, height: window.innerHeight });
});
