import { Entity } from "playcanvas";


export class Box extends Entity{

    constructor(x, y, z){
        super();
        
        this.addComponent("model", {
            type: "box",
        });

        this.setLocalScale(x, y, z);

        this.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(x/2, y/2, z/2),
        });

        this.addComponent("rigidbody", {
            type: "dynamic",
            restitution: 0.5,
        });
        
    }
    
}