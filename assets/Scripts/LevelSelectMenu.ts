import { _decorator, Button, Component, instantiate, Layout, Node, Prefab } from 'cc';
import { LevelSelectButton } from './LevelSelectButton';
const { ccclass, property } = _decorator;

@ccclass('LevelSelectMenu')
export class LevelSelectMenu extends Component {

    @property({ type: Prefab })
    private LevelSelectButtonPrefab : Prefab;
    
    @property({ type: Layout })
    private ButtonGrid : Layout;
    
    private AllButtons : Button[];

    start() {
        for (var i = 0; i < 6; i++)
        {
            var button = instantiate(this.LevelSelectButtonPrefab).getComponent(LevelSelectButton);
            button.setup(i+1);
            button.node.parent = this.ButtonGrid.node;
        }
    }

    update(deltaTime: number) {
        
    }
}

