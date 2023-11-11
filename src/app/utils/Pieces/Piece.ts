import { Board } from "../Board";
import { Square } from "../Square";
import { COLORS, PIECE_NAMES } from "../utils";

export const redPalaceCoordinates = {
  rows: [1, 2, 3],
  columns: [4, 5, 6],
};

export const blackPalaceCoordinates = {
  rows: [10, 9, 8],
  columns: [4, 5, 6],
};
export abstract class Piece {
  constructor(
    protected pieceName: (typeof PIECE_NAMES)[number],
    protected color: (typeof COLORS)[number]
  ) {}
  getPieceColor() {
    return this.color;
  }

  getPieceName() {
    return this.pieceName;
  }

  abstract isMoveAllowedForPiece(
    fromSquare: Square,
    toSquare: Square,
    board: Board
  ): boolean;
  
  abstract getChineseNameForPiece():string;
}









