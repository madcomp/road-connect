import { _decorator, Button, Component, easing, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {

    @property({ type: Button })
    public BtnPlay : Button;

    public buttonPlayAppear() {
        this.BtnPlay.node.scale = Vec3.ZERO;
        this.BtnPlay.node.active = true;

        tween().target(this.BtnPlay.node)
        .to(0.5, { scale: Vec3.ONE }, { easing: easing.quadInOut })
        .start();
    }

    start() {
        this.BtnPlay.node.active = false;
    }

    update(deltaTime: number) {
        
    }
}

