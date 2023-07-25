import { Entity} from "playcanvas";
import { SpawnObject } from "../../script/component/spawnObject";
import { Game } from "../../game";


export class ObjectSpawner extends Entity{

    constructor(spawnContainer) {
        super();

        this.spawnContainer = spawnContainer;
        this.spawnDistance = 300;
        // this.addComponent('model', {   
        //     type: 'box'
        // });
        
        this.setLocalScale(300, 50, 1);
 
        // add material to object
        // this.material = new pc.StandardMaterial();
        // this.material.diffuse = new pc.Color(0.6, 0.3, 0);
        // this.material.update();
        
        // this.model.material = this.material;

        this.addComponent('script');
        this.script.create('spawnObject', {
            attributes: {
                spawnContainer: this.spawnContainer,
            }
        });
    }

}