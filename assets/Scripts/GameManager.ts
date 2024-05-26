import { _decorator, Button, Component, easing, tween, Vec3 } from 'cc';
import { LevelSelectMenu } from './LevelSelectMenu';
import { PuzzleManager } from './PuzzleManager';
import { TitleScreen } from './UI/TitleScreen';
import { GameUI } from './UI/GameUI';
import { customEasing } from './Others/CustomEasing';
import { LevelCreatorData } from './LevelEditor/LevelCreatorData';
import { LevelData } from './Data/LevelData';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property({ type: LevelCreatorData })
    private LevelCreatorData: LevelCreatorData;

    @property({ type: PuzzleManager })
    private PuzzleManager: PuzzleManager;

    @property({ type: LevelSelectMenu })
    public LevelSelect: LevelSelectMenu;

    @property({ type: TitleScreen })
    private TitleScreen: TitleScreen;

    @property({ type: GameUI })
    private GameUI: GameUI;

    private m_CurrentLevel: number;

    getLevelWithID(levelID: number): LevelData
    {
        for (var levelData of this.LevelCreatorData.GameLevels)
        {
            if (levelData.LevelID == levelID)
            {
                return levelData;
            }
        }
        return new LevelData();
    }

    handleTitleScreenAnimationComplete() {
        this.GameUI.buttonPlayAppear();
    }

    loadLevel(levelID: number) {
        this.m_CurrentLevel = levelID;
        this.LevelSelect.node.active = false;
        this.PuzzleManager.populateLevel(this.getLevelWithID(levelID), this.LevelCreatorData.LevelSprites);
        this.GameUI.setLevelName("Level " + (levelID + 1));
    }

    onEnable() {
        this.LevelSelect.node.on("OnLevelPressed", this.loadLevel, this);
    }

    onDisable() {
        this.LevelSelect.node.off("OnLevelPressed");
        // PuzzleManager.OnLevelComplete -= HandleLevelComplete;
        this.TitleScreen.node.off("OnAnimationComplete");
    }

    onLoad() {
        this.GameUI.BtnMenu.node.on(Button.EventType.CLICK, this.onMenuPressed, this);
        this.GameUI.BtnPlay.node.on(Button.EventType.CLICK, this.onPlayPressed, this);
        // PuzzleManager.OnLevelComplete += HandleLevelComplete;
        this.TitleScreen.node.on("OnAnimationComplete", this.handleTitleScreenAnimationComplete, this);
    }

    onMenuPressed() {
        this.LevelSelect.node.active = true;
        this.PuzzleManager.clearLevel();
        // PopulateLevelSelect();

        // SoundLibrary.Instance.PlaySound(SFX.DefaultClick);
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

    populateLevelSelect() {
        // this.LevelSelect.ClearMenu();

        // foreach (LevelData level in LevelCreatorData.GameLevels)
        // {
        //     bool unlocked = CheckIfLevelIsUnlocked(level.LevelID);
        //     LevelSelect.AddLevel(level.LevelID, unlocked);
        // }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

