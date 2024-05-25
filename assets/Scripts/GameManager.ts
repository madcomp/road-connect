import { _decorator, Button, Component, easing, tween, Vec3 } from 'cc';
import { TitleScreen } from './TitleScreen';
import { GameUI } from './GameUI';
import { LevelSelectMenu } from './LevelSelectMenu';
import { customEasing } from './CustomEasing';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property({ type: LevelSelectMenu })
    public LevelSelect : LevelSelectMenu;

    @property({ type: TitleScreen })
    private TitleScreen : TitleScreen;

    @property({ type: GameUI })
    private GameUI : GameUI;

    handleTitleScreenAnimationComplete() {
        this.GameUI.buttonPlayAppear();
    }

    onLoad() {
        this.GameUI.BtnPlay.node.on(Button.EventType.CLICK, this.onPlayPressed, this);
        this.TitleScreen.OnAnimationComplete = () => this.handleTitleScreenAnimationComplete();
    }

    onPlayPressed() {

        tween().target(this.GameUI.BtnPlay.node)
        .to(0.5,
            { scale: new Vec3(1.1, 1.1, 1) },
            { easing: customEasing.punch })
        .call(() => this.TitleScreen.node.active = false)
        .start();

        this.LevelSelect.node.active = true;
        // m_NumberOfLevels = LevelCreatorData.GameLevels.Count;
        // PopulateLevelSelect();
        // SoundLibrary.Instance.PlaySound(SFX.DefaultClick);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

