import { Entity } from "playcanvas";
import { Screen2D } from "../templates/ui/screen2D";
import { BackGround } from "../templates/ui/background";

export class EndUI extends Entity{

    constructor() {

        super();

        this.screen = new Screen2D();
        this.addChild(this.screen);

        this.background = new BackGround();
        this.background.element.opacity = 0;
        
        this.background.addComponent("script");
        this.background.script.create("endBackgroundScript");
        this.screen.addChild(this.background);
       


    }

}