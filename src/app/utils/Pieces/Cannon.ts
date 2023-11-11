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
      if(targetColumn !== currentColumn && targetRow === currentRow){
        const numberOfPiecesBetween = board.numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(board.squares,fromSquare,toSquare,currentRow)
        // there is a piece at toSquare, i.e. capturing
        if(toSquare.piece != null && numberOfPiecesBetween === 1 && toSquare.piece.getPieceColor() !== this.color ){
          return true ;
        }
        if(toSquare.piece == null && numberOfPiecesBetween === 0){
          return true;
        }
      }
      // moving vertically
      if(targetRow !== currentRow && targetColumn === currentColumn){
        // there is a piece at toSquare, i.e. capturing
        const numberOfPiecesBetween = board.numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(board.squares,fromSquare,toSquare,currentColumn)
        // there is a piece at toSquare, i.e. capturing
        if(toSquare.piece != null && numberOfPiecesBetween === 1 && toSquare.piece.getPieceColor() !== this.color ){
          return true ;
        }
        if(toSquare.piece == null && numberOfPiecesBetween === 0){
          return true;
        }
      }
      return false
    }

    getChineseNameForPiece(): string {
      return "炮";
    }
  }