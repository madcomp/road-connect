import { _decorator, Button, Component, easing, Input, Label, Node, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {

    // Text
    @property({ type: Label })
    private TxtLevelName: Label;

    @property({ type: UIOpacity })
    public TxtEndGame: UIOpacity;

    // Buttons
    @property({ type: Button })
    public BtnMenu: Button;

    @property({ type: Button })
    public BtnPlay: Button;

    // Animations
    @property({ type: Node })
    public AnchorLeftTxtLevelName: Node;
    
    @property({ type: Node })
    public AnchorRightTxtLevelName: Node;

    start() {

        var self = this;

        self.BtnPlay.node.active = false;
        self.BtnMenu.node.on(
            Button.EventType.CLICK,
            () => self.TxtEndGame.node.active = false,
            self
        );
    }

    public setLevelName(levelName : string) {
        this.TxtLevelName.string = levelName;
        
        var position = this.TxtLevelName.node.position.clone();
        position.x = 0;
        this.TxtLevelName.node.position = position;
        this.setTxtAlpha(this.TxtLevelName, 1);
    }

    public levelCompleteAnimation() {

        var self = this;

        tween(self.TxtLevelName.node.position)
        .to(
            0.45,
            self.AnchorLeftTxtLevelName.position,
            {
                onUpdate : (target: Vec3, ratio: number) =>
                {
                    self.TxtLevelName.node.position = target;
                    self.setTxtAlpha(self.TxtLevelName, 1 - ratio);
                },
                easing: easing.quadIn
            },
        )
        .start();
    }

    public newLevelAnimation() {
        var self = this;

        self.TxtLevelName.node.position = self.AnchorRightTxtLevelName.position;
        self.setTxtAlpha(self.TxtLevelName, 0);

        var targetPosition = self.AnchorRightTxtLevelName.position.clone();
        targetPosition.x = 0;

        tween(self.TxtLevelName.node.position)
        .to(
            0.45,
            targetPosition,
            {
                onUpdate : (target: Vec3, ratio: number) =>
                {
                    self.TxtLevelName.node.position = target;
                    self.setTxtAlpha(self.TxtLevelName, ratio);
                },
                easing: easing.quadOut
            }
        )
        .start();
    }

    public allLevelsCompleteAnimation() {
        
        this.TxtLevelName.string = "";
        this.TxtEndGame.node.active = true;

        this.TxtEndGame.opacity = 0;
        tween(this.TxtEndGame)
        .to(0.45, { opacity: 255 })
        .start();
    }

    public buttonPlayAppear() {
        this.BtnPlay.node.scale = Vec3.ZERO;
        this.BtnPlay.node.active = true;

        tween().target(this.BtnPlay.node)
        .to(0.5, { scale: Vec3.ONE }, { easing: easing.quadInOut })
        .start();
    }

    setTxtAlpha(text: Label, alpha: number)
    {
        var color = text.color.clone();
        color.a = alpha * 255;
        text.color = color;
    }
}

