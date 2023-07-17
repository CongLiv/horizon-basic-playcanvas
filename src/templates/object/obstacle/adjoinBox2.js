import { Box } from "../model/box";
import { SuperObject } from "../superObject";

export class AdjoinBox2 extends SuperObject{

    constructor(){
        super();
        this.tags.add("obstacle");
        this.objectWidth = 150;
    }   

    _createObject(){

        let boxHeight = 10;
        let boxWidth = 20;

        for (let i = -45; i <= 45; i += 30){
            let box = new Box(boxWidth, boxHeight, 4);
            box.setLocalPosition(i, 0, 0);
            this.addChild(box);
            box.model.material = this.OBSTACLE_MATERIAL;
        }
    }        

    spawnToPosition(position, spawnContainer){
        this.setLocalPosition(position);
        spawnContainer.addChild(this);
    }
}