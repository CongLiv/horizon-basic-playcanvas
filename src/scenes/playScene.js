import { GameConstant } from "../gameConstant";
import { Scene } from "../templates/scene/scene";
import { Entity, LIGHTTYPE_DIRECTIONAL, Color } from "playcanvas";
import { Plane1 } from "../templates/entity/plane1";
import { MainCamera } from "../templates/camera/mainCamera";
import { Light } from "../templates/object/light";
import { assets } from "../assetLoader/assets";
import { Game } from "../game";
import { Ground1 } from "../templates/object/ground/groud1";
import { ObjectSpawner } from "../templates/component/objectSpawner";
import { StartUI } from "../ui/startUI";
import { UIManager } from "../ui/UIManager";
import { Utils } from "../utils/utils";
import { Skybox } from "../templates/skybox/skybox";
import { Plane2 } from "../templates/entity/plane2";
import { Plane3 } from "../templates/entity/plane3";
import { Plane4 } from "../templates/entity/plane4";
import { Plane5 } from "../templates/entity/plane5";

export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_PLAY);
    this._initialize();
  }

  create() {
    super.create();
  }

  update(dt) {
    super.update(dt);
  }

  _initialize() {
    this._initLight();
    this._initPlayer();
    this._initObject();
    this._initCamera();
    this._initOrbitCamera();
    this._initDebugCollision();
    this._initSkybox();
    this._initUI();
  }

  _initLight() {
    this.directionalLight = new Light();
    this.addChild(this.directionalLight);
  }

  _initSkybox() {
    this.skybox = new Skybox();
    this.addChild(this.skybox);
  }

  _initOrbitCamera() {
    this.camera = new Entity();
    this.camera.addComponent("camera", {
      clearColor: new Color(0.5, 0.5, 0.8),
      farClip: 1000,
    });

    this.camera.addComponent("script");
    this.camera.script.create("orbitCamera", {
      attributes: {
        inertiaFactor: 0.2,
        focusEntity: Game.player,
        distanceMin: 0.5,
        distanceMax: Infinity,
        pitchAngleMin: -90,
        pitchAngleMax: 90,
        frameOnStart: true,
      },
    });
    this.camera.script.create("orbitCameraInputMouse");
    this.camera.script.create("orbitCameraInputTouch");
    this.camera.setLocalPosition(-350, 80, -20);

    this.addChild(this.camera);
  }

  _initDebugCollision() {
    this.addComponent("script");
    this.script.create("renderPhysics", {
      attributes: {
        drawShapes: false,
      },
    });
  }
  _initCamera() {
    this.mainCamera = new MainCamera();
    this.addChild(this.mainCamera);
  }

  _initUI() {
    this.UIManager = new UIManager();
    this.addChild(this.UIManager);
  }

  _initPlayer() {
    switch (Game.lastSkin) {
      case "skin1":
        Game.player = new Plane1();
        break;
      case "skin2":
        Game.player = new Plane2();
        break;
      case "skin3":
        Game.player = new Plane3();
        break;
      case "skin4":
        Game.player = new Plane4();
        break;
      case "skin5":
        Game.player = new Plane5();
        break;
      default:
        Game.player = new Plane1();
        break;
    }

    this.addChild(Game.player);
  }

  _initObject() {
    // init object spawner
    this.spawnContainer = new Entity();
    this.addChild(this.spawnContainer);
    this.objectSpawner = new ObjectSpawner(this.spawnContainer);
    this.addChild(this.objectSpawner);

    // init ground
    this.ground = new Ground1();
    this.ground.spawnToPosition(new pc.Vec3(0, 0, 300), this.spawnContainer);
  }

  update(dt) {
    super.update(dt);
    this._debugListener();

    // DONT NEED UPDATE MAINCAMERA POSITION THIS BECAUSE SCREEN 2D IS ALWAYS ON TOP
  }

  _debugListener() {
    this.camera.enabled = Game.onDebug;
    this.mainCamera.enabled = !this.camera.enabled;
    this.UIManager.enabled = !this.camera.enabled;

    if (Game.app.keyboard.isPressed(pc.KEY_P)) {
      // make listener only once per press
      if (this._isPressedDebug === true) return;
      this._isPressedDebug = true;
      Game.onDebug = !Game.onDebug;
    } else {
      this._isPressedDebug = false;
    }

    if (this.camera.enabled) {
      // make camera follow player once per press
      if (this._isFollow === true) return;
      this._isFollow = true;
      this.camera.script.orbitCamera.focusEntity = Game.player;
    } else {
      this._isFollow = false;
    }
  }

  restart() {
    // reset player
    Game.player.destroy();
    this._initPlayer();

    // reset camera
    this.mainCamera.destroy();
    this._initCamera();

    // restart object
    this.spawnContainer.destroy();
    this.objectSpawner.destroy();
    this._initObject();
  }
}
