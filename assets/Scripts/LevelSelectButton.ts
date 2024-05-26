import { _decorator, Button, Color, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectButton')
export class LevelSelectButton extends Component {
    
    @property({ type: Button })
    private Button: Button;

    @property({ type: Sprite })
    private Sprite: Sprite;

    @property({ type: Label })
    private Label: Label;

    public disable() {
        this.Button.interactable = false;
        this.Sprite.color = Color.GRAY;
    }

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

