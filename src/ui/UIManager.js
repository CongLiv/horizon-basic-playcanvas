import { PlayingUI } from "./playingUI";
import { StartUI } from "./startUI";
import { Entity } from "playcanvas";
import { ManagerUI } from "../script/ui/managerUI";

export class UIManager extends Entity{

    constructor(player){
        super();
        this.player = player;
        this.startUI = new StartUI();
        this.addChild(this.startUI);
        this.playingUI = new PlayingUI(this.player);
        this.addChild(this.playingUI);

        ManagerUI();
        this.addComponent('script');
        this.script.create('managerUI', {
            attributes: {
                player: this.player,
                startUI: this.startUI,
                playingUI: this.playingUI
            }
        });
    }

    
}