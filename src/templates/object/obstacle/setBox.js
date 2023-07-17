import { Utils } from "../../../utils/utils";
import { Box } from "../model/box";
import { SuperObject } from "../superObject";


export class SetBox extends SuperObject{

    constructor(){
        super();
        this.tags.add("obstacle");
        this._createObject();
        this.objectWidth = 10;
    }


    _createObject(){
        let randHeight = Utils.getRandomInt(10, 30);

        this.box1 = new Box(4, randHeight, 4);
        this.box1.model.material = this.OBSTACLE_MATERIAL;
        this.addChild(this.box1);
        this.box1.setLocalPosition(0, randHeight / 2, 0);

        this.box2 = new Box(4, randHeight - randHeight / 2, 4);
        this.box2.model.material = this.OBSTACLE_MATERIAL;
        this.addChild(this.box2);

        let isLeft = Utils.getRandomInt(0, 1) == 0 ? 1 : -1;
        let isFront = Utils.getRandomInt(0, 1) == 0 ? 1 : -1;

        this.box2.setLocalPosition(isLeft * 4, randHeight / 4, isFront * 1);
    }

    spawnToPosition(position, spawnContainer){
        this.setLocalPosition(position);
        spawnContainer.addChild(this);
    }



}