import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectButton')
export class LevelSelectButton extends Component {
    
    @property({ type: Label })
    private Label : Label;

    public setup(level: number) {
        this.node.name += "_" + level;
        this.Label.string = level.toString();
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

