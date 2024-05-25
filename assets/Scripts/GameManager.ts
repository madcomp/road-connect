import { _decorator, Component } from 'cc';
import { TitleScreen } from './TitleScreen';
import { GameUI } from './GameUI';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property({ type: TitleScreen })
    public TitleScreen : TitleScreen;

    @property({ type: GameUI })
    public GameUI : GameUI;

    handleTitleScreenAnimationComplete() {
        this.GameUI.buttonPlayAppear();
    }

    onLoad() {
        this.TitleScreen.OnAnimationComplete = () => this.handleTitleScreenAnimationComplete();
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

