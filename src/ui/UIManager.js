import { PlayingUI } from "./playingUI";
import { StartUI } from "./startUI";
import { Entity } from "playcanvas";
import { EndUI } from "./endUI";
import { SkinUI } from "./skinUI";
export class UIManager extends Entity{

    constructor(){
        super();

        this.startUI = new StartUI();
        this.addChild(this.startUI);

        this.playingUI = new PlayingUI();
        this.addChild(this.playingUI);

        this.endUI = new EndUI();
        this.addChild(this.endUI);

        this.skinUI = new SkinUI();
        this.addChild(this.skinUI);

        
        this.addComponent('script');
        this.script.create('managerUI', {
            attributes: {
                startUI: this.startUI,
                playingUI: this.playingUI,
                endUI: this.endUI,
                skinUI: this.skinUI,
            }
        });
    }

    
}