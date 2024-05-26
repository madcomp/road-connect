import { _decorator, Component, easing, Input, Quat, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
import { CustomMath } from './Others/CustomMath';
const { ccclass, property } = _decorator;

@ccclass('PuzzlePiece')
export class PuzzlePiece extends Component {
    
    private static readonly ROTATE_DURATION: number = 0.15;

    @property({ type: Sprite })
    private m_Sprite: Sprite;

    private m_Rotating: boolean = false;
    private m_Locked: boolean = false;
    private m_IsMirrored: boolean = false;
    private m_IsBonus: boolean = false;

    public StartingRotation: number;
    public TargetRotation: number;

    disappear() {
        this.m_Locked = true;

        tween().target(this.node)
        .delay(0.5)
        .to(0.25,
            { scale: Vec3.ZERO },
            { easing: easing.quadInOut })
        .start();
    }

    public init(startRotation: number, targetRotation: number, sprite: SpriteFrame) {
        this.m_Sprite.spriteFrame = sprite;
        this.StartingRotation = startRotation;
        this.TargetRotation = targetRotation;
        this.node.setRotationFromEuler(new Vec3(0, 0, this.StartingRotation));

        if (sprite.name.includes("MR180"))
        {
            this.m_IsMirrored = true;
        }
        else if (sprite.name.includes("BN360"))
        {
            this.m_IsBonus = true;
        }
    }

    public isOnTargetPosition(): boolean {
        if (this.m_IsBonus)
        {
            return true;
        }

        var eulerAngles: Vec3 = this.node.eulerAngles;

        if (this.m_IsMirrored)
        {
            if (!CustomMath.approximately(eulerAngles.z, this.TargetRotation))
            {
                var newTarget: number = 0;
                switch (this.TargetRotation)
                {
                    case 0:
                        newTarget = 180;
                        break;
                    case 90:
                        newTarget = 270;
                        break;
                    case 180:
                        newTarget = 0;
                        break;
                    case 270:
                        newTarget = 90;
                        break;
                }

                return CustomMath.approximately(eulerAngles.z, newTarget);
            }
        }

        return CustomMath.approximately(eulerAngles.z, this.TargetRotation);
    }

    public rotate() {

        var self = this;
        if (self.m_Rotating)
        {
            return;
        }

        self.m_Rotating = true;

        var targetEulerAngles = self.node.eulerAngles.clone();
        targetEulerAngles.z -= 90;

        tween(self.node.eulerAngles)
        .to(
            PuzzlePiece.ROTATE_DURATION,
            targetEulerAngles,
            { onUpdate : (target: Vec3, ratio: number) =>
                {
                    self.node.setRotationFromEuler(target);
                }
            }
        )
        .call(() =>
        {
            self.fixNegativeAngle();
            self.m_Rotating = false;
            self.node.emit("OnPieceMoved");
        })
        .start();

        // SoundLibrary.Instance.PlaySound(SFX.ShapeRotate);
    }

    fixNegativeAngle() {
        var eulerAngles = this.node.eulerAngles.clone();
        if (eulerAngles.z < -CustomMath.EPSILON)
        {
            eulerAngles.z += 360;
            this.node.setRotationFromEuler(eulerAngles);
        }
    }

    onEnable() {

        this.node.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);

        var animationDelay: number = Math.random() * 0.5 + 0.25;
        this.node.scale = Vec3.ZERO;
        tween().target(this.node)
        .delay(animationDelay)
        .to(0.25,
            { scale: Vec3.ONE },
            { easing: easing.quadInOut })
        .start();

        tween().target(this.node)
        .delay(animationDelay)
        .call(() =>
        {
            // m_Audio.Play();
        })
        .start();
    }

    onDisable() {
        this.node.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
    }

    onMouseUp() {
        if (!this.m_Locked)
        {
            this.rotate();
        }
    }
}

