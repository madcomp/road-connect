import { _decorator, Button, Component, easing, Label, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {

    @property({ type: Button })
    public BtnMenu : Button;

    @property({ type: Button })
    public BtnPlay : Button;

    @property({ type: Label })
    private TxtLevelName : Label;

    public buttonPlayAppear() {
        this.BtnPlay.node.scale = Vec3.ZERO;
        this.BtnPlay.node.active = true;

        tween().target(this.BtnPlay.node)
        .to(0.5, { scale: Vec3.ONE }, { easing: easing.quadInOut })
        .start();
    }

    public setLevelName(levelName : string) {
        this.TxtLevelName.string = levelName;
    }

    start() {
        this.BtnPlay.node.active = false;
    }

    update(deltaTime: number) {
        
    }
}

