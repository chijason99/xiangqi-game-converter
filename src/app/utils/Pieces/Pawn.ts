import { Square } from "../Square";
import { COLORS } from "../utils";
import { Piece } from "./Piece";

export class Pawn extends Piece {
    constructor(color: (typeof COLORS)[number]) {
      super("pawn", color);
    }
    isMoveAllowedForPiece(fromSquare: Square, toSquare: Square) {
      const currentRow = fromSquare.row;
      const currentColumn = fromSquare.column;
      const targetRow = toSquare.row;
      const targetColumn = toSquare.column;
      if (this.color === "red") {
        // cannot move backward
        if (targetRow < currentRow) {
          return false;
        }
        //move forward
        if (
          targetRow > currentRow &&
          targetColumn === currentColumn &&
          targetRow - currentRow === 1
        ) {
          return true;
        }
        // move to the right
        if (
          targetColumn > currentColumn &&
          currentRow > 5 &&
          currentRow === targetRow &&
          targetColumn - currentColumn === 1
        ) {
          return true;
        }
        // move to the left
        if (
          targetColumn < currentColumn &&
          currentRow > 5 &&
          currentRow === targetRow &&
          currentColumn - targetColumn === 1
        ) {
          return true;
        }
      } else {
        // cannot move backward
        if (targetRow > currentRow) {
          return false;
        }
        //move forward
        if (
          targetRow < currentRow &&
          currentRow - targetRow === 1 &&
          targetColumn === currentColumn
        ) {
          return true;
        }
        // move to the right
        if (
          targetColumn > currentColumn &&
          targetColumn - currentColumn === 1 &&
          currentRow < 6 &&
          currentRow === targetRow
        ) {
          return true;
        }
        // move to the left
        if (
          targetColumn < currentColumn &&
          currentColumn - targetColumn === 1 &&
          currentRow < 6 &&
          currentRow === targetRow
        ) {
          return true;
        }
      }
      return false;
    }
  }