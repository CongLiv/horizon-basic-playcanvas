
import { Box } from "../model/box.js";
import { SuperObject } from "../superObject.js";

export class FallBox extends SuperObject{

    constructor(){
        super();
        this.tags.add("obstacle");
        this._createObject();
        this.objectWidth = 40;

    }

    _createObject(){
      
        for (let i = -20; i <= 20; i += 10) {
            let box = new Box(1.5, 20, 3);
            box.model.material = this.OBSTACLE_MATERIAL;
            box.addComponent("script");
            box.script.create("fallBoxScript");
            this.addChild(box);
            box.setLocalPosition(i, 0, 0);
        }

        

    }

    spawnToPosition(position, spawnContainer){
        this.setLocalPosition(position);
        spawnContainer.addChild(this);
    }


}