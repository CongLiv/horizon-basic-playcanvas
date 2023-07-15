import { Cone } from "../model/cone";
import { SuperObject } from "../superObject";
import { Utils } from "../../../utils/utils";


export class SingleCone extends SuperObject{

    constructor(){
        super();
        this.tags.add("obstacle");
        this._createObject();
    }

    _createObject(){

        let randHeight = Utils.getRandomInt(15, 18);
        let randRadius = Utils.getRandomInt(13, 15);

        this.cone = new Cone(randRadius, randHeight, randRadius);

        this.cone.setLocalPosition(0, randHeight / 2, 0);
        this.addChild(this.cone);

        this.cone.model.material = this.OBSTACLE_MATERIAL;

    }

    spawnToPosition(position, spawnContainer){
        this.setLocalPosition(position);
        spawnContainer.addChild(this);
    }


}