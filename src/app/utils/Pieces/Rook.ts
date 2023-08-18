import { Board } from "../Board";
import { Square } from "../Square";
import { COLORS } from "../utils";
import { Piece } from "./Piece";

export class Rook extends Piece {
    constructor(color: (typeof COLORS)[number]) {
      super("rook", color);
    }
    isMoveAllowedForPiece(
      fromSquare: Square,
      toSquare: Square,
      board: Board
    ): boolean {
      const currentRow = fromSquare.row;
      const currentColumn = fromSquare.column;
      const targetRow = toSquare.row;
      const targetColumn = toSquare.column;
      if(targetRow !== currentRow && targetColumn !== currentColumn){
        return false
      }
      // move horizontally
      if(targetRow === currentRow){
        const numberOfPiecesBetweenThePath = board.numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(board,fromSquare,toSquare,currentRow)
        console.log(numberOfPiecesBetweenThePath)
        return numberOfPiecesBetweenThePath === 0
      }
      if(targetColumn === currentColumn){
        const numberOfPiecesBetweenThePath = board.numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(board,fromSquare,toSquare,currentColumn)
        console.log(numberOfPiecesBetweenThePath)
        return numberOfPiecesBetweenThePath === 0
      }
      return false;
    }
  }