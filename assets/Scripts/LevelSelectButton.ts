import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectButton')
export class LevelSelectButton extends Component {
    
    @property({ type: Label })
    private Label: Label;

    public setup(levelID: number, onClick: (levelID : number) => void) {
        var levelName = levelID + 1;
        this.node.name += "_" + levelName;
        this.Label.string = levelName.toString();
        this.node.on(
            Button.EventType.CLICK,
            () => onClick(levelID),
            this
        );
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

