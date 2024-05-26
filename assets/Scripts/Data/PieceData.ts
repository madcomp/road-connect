export class PieceData {

    public PieceID: number;
    public StartRotation: number;
    public TargetRotation: number;

    constructor(pieceID: number, startRotation: number, targetRotation: number) {
        this.PieceID = pieceID;
        this.StartRotation = startRotation;
        this.TargetRotation = targetRotation;
    }
}

