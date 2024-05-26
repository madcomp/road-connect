import { _decorator, CCInteger, Component, JsonAsset, Node, resources, SpriteFrame, TextAsset } from 'cc';
import { LevelData } from '../Data/LevelData';
import { PieceData } from '../Data/PieceData';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('LevelCreatorData')
@executeInEditMode(true)
export class LevelCreatorData extends Component {
    
    @property(JsonAsset)
    private GameLevelsJSONFile: JsonAsset = null;

    @property({ type: [SpriteFrame] })
    public LevelSprites: SpriteFrame[] = [];

    public GameLevels: LevelData[] = [];

    onLoad() {
        if (this.GameLevelsJSONFile) {
            try {
                const jsonData = this.GameLevelsJSONFile.json;
                for (var gameLevel of jsonData["GameLevels"])
                {
                    var allPieces: PieceData[] = [];
                    for (var piece of gameLevel.allPieces)
                    {
                        var pieceData = new PieceData(piece.pieceID, piece.startRotation, piece.targetRotation);
                        allPieces.push(pieceData);
                    }
                    var levelData = new LevelData(gameLevel.levelID, allPieces);
                    this.GameLevels.push(levelData);
                }
            } catch (e) {
                console.error('Failed to parse GameLevels JSON', e);
            }
        } else {
            console.error('No GameLevels JSON file assigned');
        }

    }
}