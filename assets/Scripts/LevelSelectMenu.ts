import { _decorator, Button, Component, instantiate, Layout, Prefab } from 'cc';
import { LevelSelectButton } from './LevelSelectButton';
import { SFX, SoundLibrary } from './Others/SoundLibrary';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectMenu')
export class LevelSelectMenu extends Component {

    @property({ type: Prefab })
    private LevelSelectButtonPrefab : Prefab;
    
    @property({ type: Layout })
    private ButtonGrid : Layout;
    
    private AllButtons : LevelSelectButton[] = [];

    public addLevel(levelID: number, unlocked: boolean) {
        var newLevel = instantiate(this.LevelSelectButtonPrefab).getComponent(LevelSelectButton);
        newLevel.node.parent = this.ButtonGrid.node;

        newLevel.setup(
            levelID,
            (buttonLevelID : number) =>
            {
                this.node.emit("OnLevelPressed", buttonLevelID);
                SoundLibrary.instance.playSound(SFX.DefaultClick);
            }
        );

        this.AllButtons.push(newLevel);
        if (!unlocked)
        {
            newLevel.disable();
        }    
    }

    public clearMenu() {
        for (var button of this.AllButtons)
        {
            button.node.destroy();
        }
        this.AllButtons.length = 0;
    }
}

