import { SuperObject } from "../superObject";
import { Utils } from "../../../utils/utils";
import { Cone } from "../model/cone";
export class MatrixCone extends SuperObject{


    constructor(){
        super();
        this.tags.add("obstacle");
        this.objectWidth = 20;
    }

    _createObject(){

        for (let i = -10; i <= 10; i += 5){
            for (let j = -10; j < 10; j += 5)
            {
                if (Utils.getChance(0.5)) continue;
                let randHeight = Utils.getRandomInt(10, 20);
                let randRadius = Utils.getRandomInt(3, 5);
                let cone = new Cone(randRadius, randHeight, randRadius);
                cone.model.material = this.OBSTACLE_MATERIAL;
                this.addChild(cone);
                cone.setLocalPosition(i, randHeight / 2, j);

            }
        }
    }

    spawnToPosition(position, spawnContainer){
        this.setLocalPosition(position);
        spawnContainer.addChild(this);
    }
}