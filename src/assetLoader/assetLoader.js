import { assets } from "./assets.js";
import { AssetListLoader} from "playcanvas";
export class AssetLoader {

    static loadAssets(app, callback) {
        this.app = app;
        this.assets = assets;
        const assetListLoader = new AssetListLoader(Object.values(this.assets), this.app.assets);

        assetListLoader.load(() => {
            callback();
        })

    }



}