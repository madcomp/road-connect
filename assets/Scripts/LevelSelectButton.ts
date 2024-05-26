import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectButton')
export class LevelSelectButton extends Component {
    
    @property({ type: Label })
    private Label : Label;

    public setup(level: number, onClick: (levelID : number) => void) {
        this.node.name += "_" + level;
        this.Label.string = level.toString();
        this.node.on(
            Button.EventType.CLICK,
            () => onClick(level),
            this
        );
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

