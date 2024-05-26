import { _decorator, Button, Component, sys, tween, Vec3 } from 'cc';
import { LevelSelectMenu } from './LevelSelectMenu';
import { PuzzleManager } from './PuzzleManager';
import { TitleScreen } from './UI/TitleScreen';
import { GameUI } from './UI/GameUI';
import { LevelCreatorData } from './LevelEditor/LevelCreatorData';
import { LevelData } from './Data/LevelData';
import { customEasing } from './Others/CustomEasing';
import { SFX, SoundLibrary } from './Others/SoundLibrary';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private static readonly LEVEL_KEY: string = "Level";

    private m_NumberOfLevels: number;
    private m_CurrentLevel: number;

    // Controllers
    @property({ type: LevelCreatorData })
    private LevelCreatorData: LevelCreatorData;

    @property({ type: PuzzleManager })
    private PuzzleManager: PuzzleManager;

    @property({ type: LevelSelectMenu })
    public LevelSelect: LevelSelectMenu;

    // Screens
    @property({ type: TitleScreen })
    private TitleScreen: TitleScreen;

    @property({ type: GameUI })
    private GameUI: GameUI;

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

    handleLevelComplete() {

        var self = this;

        self.GameUI.levelCompleteAnimation();
        self.saveProgress(self.m_CurrentLevel);

        if (!(self.m_CurrentLevel >= (self.m_NumberOfLevels - 1)))
        {
            self.levelTransition();
        }
        else
        {
            self.endGameAnimation();
        }
    }

    saveProgress(levelID: number) {
        sys.localStorage.setItem(GameManager.LEVEL_KEY + levelID, "1");
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
        this.PuzzleManager.node.off("OnLevelComplete", this.handleLevelComplete);
        this.TitleScreen.node.off("OnAnimationComplete");
    }

    onLoad() {
        this.GameUI.BtnMenu.node.on(Button.EventType.CLICK, this.onMenuPressed, this);
        this.GameUI.BtnPlay.node.on(Button.EventType.CLICK, this.onPlayPressed, this);
        this.PuzzleManager.node.on("OnLevelComplete", this.handleLevelComplete, this);
        this.TitleScreen.node.on("OnAnimationComplete", this.handleTitleScreenAnimationComplete, this);
    }

    onMenuPressed() {
        this.LevelSelect.node.active = true;
        this.PuzzleManager.clearLevel();
        this.populateLevelSelect();

        SoundLibrary.instance.playSound(SFX.DefaultClick);
    }

    onPlayPressed() {
        tween().target(this.GameUI.BtnPlay.node)
        .to(0.5,
            { scale: new Vec3(1.1, 1.1, 1) },
            { easing: customEasing.punch })
        .call(() => this.TitleScreen.node.active = false)
        .start();

        this.removeTitleScreen();
        this.LevelSelect.node.active = true;
        this.m_NumberOfLevels = this.LevelCreatorData.GameLevels.length;
        this.populateLevelSelect();
        SoundLibrary.instance.playSound(SFX.DefaultClick);
    }

    populateLevelSelect() {
        this.LevelSelect.clearMenu();
        for (var level of this.LevelCreatorData.GameLevels)
        {
            var unlocked = this.checkIfLevelIsUnlocked(level.LevelID);
            this.LevelSelect.addLevel(level.LevelID, unlocked);
        }
    }

    checkIfLevelIsUnlocked(levelID: number): boolean {

        // Fist level is always available
        if (levelID == 0)
        {
            return true;
        }
        
        if (sys.localStorage.getItem(GameManager.LEVEL_KEY + (levelID - 1)) == "1")
        {
            return true;
        }

        return false;
    }

    start() {
        SoundLibrary.instance.playMusic();
    }

    endGameAnimation() {

        var self = this;

        tween(self)
        .delay(1.5)
        .call(() => self.GameUI.allLevelsCompleteAnimation())
        .start();
    }

    levelTransition() {

        var self = this;

        tween(self)
        .delay(1.5)
        .call(() => {
            self.GameUI.newLevelAnimation();
            self.m_CurrentLevel++;
            self.loadLevel(self.m_CurrentLevel);
        })
        .start();
    }

    removeTitleScreen() {

        var self = this;

        tween(self)
        .delay(0.5)
        .call(() => self.TitleScreen.node.active = false)
        .start();
    }
}

