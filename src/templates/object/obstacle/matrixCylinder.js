import { SuperObject } from "../superObject";
import { Utils } from "../../../utils/utils";
import { Cylinder } from "../model/cylinder";

export class MatrixCylinder extends SuperObject{


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
                let cylinder = new Cylinder(randRadius, randHeight, randRadius);
                cylinder.model.material = this.OBSTACLE_MATERIAL;
                this.addChild(cylinder);
                cylinder.setLocalPosition(i, randHeight / 2, j);

            }
        }
    }

    spawnToPosition(position, spawnContainer){
        this.setLocalPosition(position);
        spawnContainer.addChild(this);
    }
}