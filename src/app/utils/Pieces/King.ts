import { Square } from "../Square";
import { COLORS } from "../utils";
import { Piece, blackPalaceCoordinates, redPalaceCoordinates } from "./Piece";

export class King extends Piece {
    constructor(color: (typeof COLORS)[number]) {
      super("king", color);
    }
    isMoveAllowedForPiece(fromSquare: Square, toSquare: Square): boolean {
      const currentRow = fromSquare.row;
      const currentColumn = fromSquare.column;
      const targetRow = toSquare.row;
      const targetColumn = toSquare.column;
      if (this.color === "red") {
        // cannot move outside of the palace
        if (!redPalaceCoordinates.columns.includes(targetColumn)) return false;
        if (!redPalaceCoordinates.rows.includes(targetRow)) return false;
        // move up
        if (targetColumn === currentColumn && targetRow - currentRow === 1) {
          if (redPalaceCoordinates.rows.includes(currentRow) && currentRow !== 3)
            return true;
        }
        // move down
        if (targetColumn === currentColumn && targetRow - currentRow === -1) {
          if (redPalaceCoordinates.rows.includes(currentRow) && currentRow !== 1)
            return true;
        }
        // move left
        if (targetColumn - currentColumn === -1 && targetRow === currentRow) {
          if (
            redPalaceCoordinates.columns.includes(currentColumn) &&
            currentColumn !== 4
          )
            return true;
        }
        // move right
        if (targetColumn - currentColumn === 1 && targetRow === currentRow) {
          if (
            redPalaceCoordinates.columns.includes(currentColumn) &&
            currentColumn !== 6
          )
            return true;
        }
      } else {
        // cannot move outside of the palace
        if (!blackPalaceCoordinates.columns.includes(targetColumn)) return false;
        if (!blackPalaceCoordinates.rows.includes(targetRow)) return false;
        // move up
        if (targetColumn === currentColumn && targetRow - currentRow === 1) {
          if (
            blackPalaceCoordinates.rows.includes(currentRow) &&
            currentRow !== 10
          )
            return true;
        }
        // move down
        if (targetColumn === currentColumn && targetRow - currentRow === -1) {
          if (
            blackPalaceCoordinates.rows.includes(currentRow) &&
            currentRow !== 8
          )
            return true;
        }
        // move left
        if (targetColumn - currentColumn === -1 && targetRow === currentRow) {
          if (
            blackPalaceCoordinates.columns.includes(currentColumn) &&
            currentColumn !== 4
          )
            return true;
        }
        // move right
        if (targetColumn - currentColumn === 1 && targetRow === currentRow) {
          if (
            blackPalaceCoordinates.columns.includes(currentColumn) &&
            currentColumn !== 6
          )
            return true;
        }
      }
      return false;
    }

    getChineseNameForPiece(): string {
      return this.color === "red" ? "帥" : "將";
    }
  }