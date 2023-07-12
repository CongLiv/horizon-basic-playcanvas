import { Entity } from "playcanvas";
import { ScrollBar } from "./scrollbar";
import { Viewport } from "./viewport";


export class ScrollView extends Entity{

    constructor(){
        super();

        this.addComponent('element', {
            type: "group",
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
            width: 138,
            height: 70,
            margin: new pc.Vec4(-69, -35, -69, -35),
        });

        this.viewPort = new Viewport();
        this.addChild(this.viewPort);
        this.viewPort.setLocalPosition(0, 0, 0);
        

        this.scrollBar = new ScrollBar();
        this.addChild(this.scrollBar);
    


        this.addComponent('scrollview', {
            scrollMode: pc.SCROLL_MODE_BOUNCE,
            bounceAmount: 0.1,
            friction: 0.1,
            useMouseWheel: true,
            mouseWheelSensitivity: new pc.Vec2(1, 1),
            viewportEntity: this.viewPort,
            contentEntity: this.viewPort.content,
            horizontal: false,
            vertical: true,
            verticalScrollbarEntity: this.scrollBar,
            verticalScrollbarVisibility: pc.SCROLLBAR_VISIBILITY_SHOW_ALWAYS,
            
        });
            
    }


}