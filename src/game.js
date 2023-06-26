import { Application, RESOLUTION_AUTO, FILLMODE_FILL_WINDOW, WasmModule, ElementInput, Keyboard, Mouse, TouchDevice} from "playcanvas";
import { AssetLoader } from "./assetLoader/assetLoader.js";
import { InputManager } from "./system/inputManager.js";
import { loadObitCameraPlugin } from "./orbit-camera.js";

export class Game {

    static init() {
        const canvas = document.createElement('canvas');
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

        // load obit camera plugin
        loadObitCameraPlugin();


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
    }

    static update(dt) {
      
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


}

window.onload = function () {
    Game.init();
}

window.addEventListener("resize", (event) => {
    Game.resize({ width: window.innerWidth, height: window.innerHeight })
});