import { SuperObject } from "../superObject";
import { Utils } from "../../../utils/utils";
import { Box } from "../model/box";

export class SingleBox extends SuperObject{

    constructor(){
        super();
        this.tags.add("obstacle");
        this._createObject();
        this.objectWidth = 15;
    }

    _createObject(){

        let randHeight = Utils.getRandomInt(5, 15);
        let randWidth = Utils.getRandomInt(5, 15);
        this.box = new Box(randWidth, randHeight, randWidth);
        this.box.setLocalPosition(0, randHeight / 2, 0);
        this.addChild(this.box);

        this.box.model.material = this.OBSTACLE_MATERIAL;
        

    }

    spawnToPosition(position, spawnContainer){
        this.setLocalPosition(position);
        spawnContainer.addChild(this);
    }
}