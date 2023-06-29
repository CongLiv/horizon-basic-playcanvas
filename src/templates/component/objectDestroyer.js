import { Entity} from "playcanvas";
import { DestroyObject } from "../../script/destroyObject";


export class ObjectDestroyer extends Entity{

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

        DestroyObject();
        this.addComponent('script');
        this.script.create('destroyObject', {
            attributes: {
                player: this.player
            }
        });

        
    }

}