import { GameConstant } from "../gameConstant";
import { Scene } from "../templates/scene/scene";
import { Entity, LIGHTTYPE_DIRECTIONAL, Color } from "playcanvas";
import { Plane1 } from "../templates/entity/plane1";
import { MainCamera } from "../templates/camera/mainCamera";
import { Light } from "../templates/object/light";
import { assets } from "../assetLoader/assets";

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
    this._initModel();
    if (GameConstant.DEBUG_CAMERA) {
      this._initOrbitCamera();
    } else {
      this._initCamera();
    }
  }

  _initLight() {
    this.directionalLight = new Light();
    this.addChild(this.directionalLight);
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
        focusEntity: null,
        distanceMin: 0.5,
        distanceMax: Infinity,
        pitchAngleMin: -90,
        pitchAngleMax: 90,
        frameOnStart: true,
      },
    });
    this.camera.script.create("orbitCameraInputMouse");
    this.camera.script.create("orbitCameraInputTouch");

    this.addChild(this.camera);
  }
  _initCamera() {
    this.mainCamera = new MainCamera(this.plane);
    this.addChild(this.mainCamera);
  }

  _initModel() {
    // ground
    this.ground = new Entity();
    this.ground.addComponent("model", {
      type: "plane",
    });
    this.groundMaterial = new pc.StandardMaterial();
    this.groundMaterial.diffuseMap = assets.groundTexture.resource;
    
    // make ground material repeat in ground
    this.groundMaterial.diffuseMapTiling = new pc.Vec2(1, 100);
    this.groundMaterial.update();
    this.ground.model.material = this.groundMaterial;


    this.ground.setLocalScale(100, 1, 10000);
    this.ground.setLocalPosition(0, 0, 0);
    this.addChild(this.ground);

    this.ground.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(50, 0.5, 50),
    });
    this.ground.addComponent("rigidbody", {
      type: "static",
    });

    // add material to ground

    // plane
    this.plane = new Plane1();
    this.addChild(this.plane);
  }

  update(dt) {
    super.update(dt);
  }
}
