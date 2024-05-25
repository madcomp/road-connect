import { _decorator, Component, easing, Node, tween, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleScreen')
export class TitleScreen extends Component {

    @property({ type: Node })
    private road : Node;
    
    @property({ type: Node })
    private connect : Node;

    public OnAnimationComplete : () => void;

    start() {
        var width = this.getComponent(UITransform).contentSize.width;

        var roadY = this.road.position.y;
        var roadZ = this.road.position.z;
        this.road.setPosition(-width, roadY);

        var connectY = this.connect.position.y;
        var connectZ = this.connect.position.z;
        this.connect.setPosition(width, connectY);

        tween().target(this.road)
        .to(0.5,
            { position: new Vec3(0, roadY, roadZ) },
            { easing: easing.quadInOut })
        .start();

        tween().target(this.connect)
        .to(0.7,
            { position: new Vec3(0, connectY, connectZ) },
            { easing: easing.quadInOut })
        .call(() => this.OnAnimationComplete?.())
        .start();
    }

    update(deltaTime: number) {
        
    }
}

