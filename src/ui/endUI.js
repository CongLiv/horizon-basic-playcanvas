import { Entity } from "playcanvas";
import { Screen2D } from "../templates/ui/screen2D";
import { BackGround } from "../templates/ui/background";

export class EndUI extends Entity{

    constructor(player) {

        super();

        this.player = player;

        this.screen = new Screen2D();
        this.addChild(this.screen);

        this.background = new BackGround();
        this.background.element.opacity = 0;
        
        this.background.addComponent("script");
        this.background.script.create("endBackgroundScript", {
            attributes: {
                player: this.player,
            },
        });
        this.screen.addChild(this.background);
       


    }

}