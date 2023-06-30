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
import { Obstacle1 } from "../templates/object/obstacle/obstacle1";
import { StartUI } from "../ui/startUI";
import { UIManager } from "../ui/UIManager";

export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_PLAY);
    this._initialize();
    this.onDebug = false;
  }

  create() {
    super.create();
  }

  update(dt) {
    super.update(dt);
  }

  _initialize() {
    this._initLight();
    this._initObject();
    this._initCamera();
    this._initOrbitCamera();
    this._initSkybox();   // not working
    this._initUI();
  }

  _initLight() {
    this.directionalLight = new Light();
    this.addChild(this.directionalLight);
  }

  _initSkybox() {
    this.skybox1 = new Entity();
    this.skybox1.addComponent("skybox", {
      type: "cubemap",
      cubemap: assets.skybox1,
    });
    Game.app.root.addChild(this.skybox1);
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
        focusEntity: this.player,
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
  _initCamera() {
    this.mainCamera = new MainCamera(this.player);
    this.addChild(this.mainCamera);
  }

  _initUI() {
    this.UIManager = new UIManager();
    this.addChild(this.UIManager);

  }

  _initObject() {
    // plane
    this.player = new Plane1();
    this.addChild(this.player);
    // ground
    this.ground = new Ground1(this.player);
    this.ground.spawnToPosition(new pc.Vec3(0, 0, 0));

    
    
    this.objectSpawner = new ObjectSpawner(this.player);
    this.addChild(this.objectSpawner);

  }

  update(dt) {
    super.update(dt);
    this._debugListener();

     // make startUI always opposite to main camera
      this.UIManager.setPosition(
        this.mainCamera.getPosition().x,
        this.mainCamera.getPosition().y,
        this.mainCamera.getPosition().z + 5
      );
      this.UIManager.setEulerAngles(
        this.mainCamera.getEulerAngles().x - 10,
        this.mainCamera.getEulerAngles().y,
        this.mainCamera.getEulerAngles().z
      );
      
    

  }

  _debugListener() {
    this.camera.enabled = this.onDebug;
    this.mainCamera.enabled = !this.camera.enabled;

    if (Game.app.keyboard.isPressed(pc.KEY_P)) {
      // make listener only once per press
      setTimeout(() => {
        this.onDebug = !this.onDebug;
        if (this.onDebug) {
          this.camera.script.orbitCamera.focusEntity = this.player;
        }
      }
      , 500);
    }
  
  }
}
