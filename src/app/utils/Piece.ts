import { COLORS, PIECE_NAMES } from "./utils";

export class Piece{
    constructor(protected color:typeof COLORS[number], protected pieceName: typeof PIECE_NAMES[number]){
        this.color = color;
        this.pieceName = pieceName
    }
    getPieceColor(){
        return this.color
    }

    getPieceName(){
        return this.pieceName
    }
}