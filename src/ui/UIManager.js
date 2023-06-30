import { StartUI } from "./startUI";
import { Entity } from "playcanvas";

export class UIManager extends Entity{

    constructor(){
        super();
        this.startUI = new StartUI();
        this.addChild(this.startUI);
    }
}