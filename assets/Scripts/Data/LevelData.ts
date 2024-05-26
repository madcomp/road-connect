import { PieceData } from "./PieceData";

export class LevelData {
    
    public LevelID: number;
    public AllPieces: PieceData[];

    constructor(levelID: number = 0, allPieces: PieceData[] = []) {
        this.LevelID = levelID;
        this.AllPieces = allPieces;
    }
}

