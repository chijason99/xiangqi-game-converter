import { Board } from "../Board";
import { Square } from "../Square";
import { COLORS } from "../utils";
import { Piece } from "./Piece";

export class Cannon extends Piece {
    constructor(color: (typeof COLORS)[number]) {
      super("cannon", color);
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
      // moving horizontally
      if(targetColumn !== currentColumn){
        // there is a piece at toSquare, i.e. capturing
        if(toSquare.piece != null){
          const numberOfPiecesBetween = board.numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(board,fromSquare,toSquare,currentRow)
          return numberOfPiecesBetween === 1;
        }else{
          const numberOfPiecesBetween = board.numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(board,fromSquare,toSquare,currentRow)
          return numberOfPiecesBetween === 0;
        }
      }
      // moving vertically
      if(targetRow !== currentRow){
        // there is a piece at toSquare, i.e. capturing
        if(toSquare.piece != null){
          const numberOfPiecesBetween = board.numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(board,fromSquare,toSquare,currentColumn)
          return numberOfPiecesBetween === 1;
        }else{
          const numberOfPiecesBetween = board.numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(board,fromSquare,toSquare,currentColumn)
          return numberOfPiecesBetween === 0;
        }
      }
      return false
    }
  }