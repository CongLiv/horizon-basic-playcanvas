import { Entity} from "playcanvas";
import { SpawnObject } from "../../script/spawnObject";


export class ObjectSpawner extends Entity{

    constructor(player) {
        super();
        this.player = player;
        
        this.addComponent('model', {   
            type: 'box'
        });
        
        this.setLocalScale(500, 50, 1);
 
        this.addComponent('collision', {
            type: 'box',
            halfExtents: new pc.Vec3(250, 25, 0.5)
        });

        this.addComponent('rigidbody', {
            type: 'static'
        }); 

        SpawnObject();
        this.addComponent('script');
        this.script.create('spawnObject', {
            attributes: {
                player: this.player
            }
        });
        
    }

}