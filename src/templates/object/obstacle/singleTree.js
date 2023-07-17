import { assets } from "../../../assetLoader/assets";
import { Tree } from "../model/tree";
import { SuperObject } from "../superObject";


export class SingleTree extends SuperObject{

    constructor(){
        super();
        this.tags.add("obstacle");
        this.objectWidth = 10;
    }

    _createObject(){
        this.tree = new Tree();
    
        this.addChild(this.tree);
    }

    spawnToPosition(position, spawnContainer){
        this.setLocalPosition(position);
        spawnContainer.addChild(this);
    }
}