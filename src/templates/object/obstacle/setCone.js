import { SuperObject } from "../superObject";
import { Utils } from "../../../utils/utils";
import { Cone } from "../model/cone";

export class SetCone extends SuperObject{

    constructor(){
        super();
        this.tags.add("obstacle");
        this._createObject();
    }

    _createObject(){

        let randHeight = Utils.getRandomInt(10, 30);
        let randRadius = Utils.getRandomInt(5, 7);

        this.cone1 = new Cone(randRadius, randHeight, randRadius);
        this.cone1.model.material = this.OBSTACLE_MATERIAL;
        this.addChild(this.cone1);
        this.cone1.setLocalPosition(0, randHeight / 2, 0);

        this.cone2 = new Cone(randRadius - 3, randHeight - randHeight / 2, randRadius - 3);
        this.cone2.model.material = this.OBSTACLE_MATERIAL;
        this.addChild(this.cone2);
        

        let isLeft = Utils.getRandomInt(0, 1) == 0 ? 1 : -1;
        let isFront = Utils.getRandomInt(0, 1) == 0 ? 1 : -1;
        let plusMinus = Utils.getRandomInt(0, 1) == 0 ? 0: 1;
        this.cone2.setLocalPosition(isLeft * (randRadius + plusMinus), randHeight / 4, isFront * randRadius);

    }

    spawnToPosition(position, spawnContainer){
        this.setLocalPosition(position);
        spawnContainer.addChild(this);
    }

}