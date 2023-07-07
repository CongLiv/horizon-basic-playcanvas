import { PlayingUI } from "./playingUI";
import { StartUI } from "./startUI";
import { Entity } from "playcanvas";
import { EndUI } from "./endUI";
import { SkinUI } from "./skinUI";
export class UIManager extends Entity{

    constructor(player){
        super();
        this.player = player;

        this.startUI = new StartUI();
        this.addChild(this.startUI);

        this.playingUI = new PlayingUI(this.player);
        this.addChild(this.playingUI);

        this.endUI = new EndUI(this.player);
        this.addChild(this.endUI);

        this.skinUI = new SkinUI();
        this.addChild(this.skinUI);

        
        this.addComponent('script');
        this.script.create('managerUI', {
            attributes: {
                player: this.player,
                startUI: this.startUI,
                playingUI: this.playingUI,
                endUI: this.endUI,
                skinUI: this.skinUI,
            }
        });
    }

    
}