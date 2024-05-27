import { _decorator, Component, instantiate, Node, Prefab, Size, SpriteFrame, UITransform, Vec2, Vec3 } from 'cc';
import { PuzzlePiece } from './PuzzlePiece';
import { LevelData } from './Data/LevelData';
import { PieceData } from './Data/PieceData';
import { SFX, SoundLibrary } from './Others/SoundLibrary';
const { ccclass, property } = _decorator;

@ccclass('PuzzleManager')
export class PuzzleManager extends Component {
    
    private static readonly PUZZLE_SIZE: number = 4;

    private AllPieces: PuzzlePiece[] = [];

    @property({ type: UITransform })
    private PiecesGrid: UITransform;

    @property({ type: Prefab })
    private PiecePrefab: Prefab;

    public clearLevel() {
        for (var piece of this.AllPieces)
        {
            piece.node.destroy();
        }
        this.AllPieces.length = 0;
    }

    checkForLevelComplete() {
        for (var piece of this.AllPieces)
        {
            if (!piece.isOnTargetPosition())
            {
                return;
            }
        }

        this.levelComplete();
    }

    levelComplete() {
        SoundLibrary.instance.playSound(SFX.LevelComplete, 0.5);

        for (var piece of this.AllPieces)
        {
            piece.disappear();
        }

        this.node.emit("OnLevelComplete");
    }
    
    populateLevel(level: LevelData, levelSprites: SpriteFrame[]) {
        
        var pieceSize: Size = null;
        if (this.PiecesGrid.contentSize.width > this.PiecesGrid.contentSize.height)
        {
            var height = this.PiecesGrid.contentSize.height / 4;
            pieceSize = new Size(height, height);
        }
        else
        {
            var width = this.PiecesGrid.contentSize.width / 4;
            pieceSize = new Size(width, width);
        }

        var piecesGrid: Node = this.PiecesGrid.node;

        // PiecesGrid position is exactly in the middle between pieces 11 and 22,
        // so we calculate startingPiecePosition for piece 00 based on that.
        var offset: Vec2 = new Vec2(1.5 * pieceSize.width, -1.5 * pieceSize.height);
        var center = piecesGrid.position;
        var startingPiecePosition = new Vec3(center.x - offset.x, center.y - offset.y, center.z);

        var hCount: number = 0;
        var vCount: number = 0;
        for (var piece of level.AllPieces)
        {
            if (piece.PieceID != -1)
            {
                var newPiece: PuzzlePiece = instantiate(this.PiecePrefab).getComponent(PuzzlePiece);
                newPiece.node.parent = piecesGrid;
                newPiece.getComponent(UITransform).contentSize = pieceSize;
                var x = startingPiecePosition.x + hCount * pieceSize.width;
                var y = startingPiecePosition.y - vCount * pieceSize.height;;
                newPiece.node.position = new Vec3(x, y, 0);
                newPiece.init(piece.StartRotation, piece.TargetRotation, levelSprites[piece.PieceID]);
                newPiece.node.on("OnPieceMoved", this.checkForLevelComplete, this);
                newPiece.node.name = "Piece " + hCount + vCount;
                this.AllPieces.push(newPiece);
            }

            hCount++;

            if (hCount >= PuzzleManager.PUZZLE_SIZE)
            {
                hCount = 0;
                vCount++;
            }
        }
    }
}

