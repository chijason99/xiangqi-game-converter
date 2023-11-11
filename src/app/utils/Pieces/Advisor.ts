import { Square } from "../Square";
import { COLORS } from "../utils";
import { Piece } from "./Piece";

export class Advisor extends Piece {
    constructor(color: (typeof COLORS)[number]) {
      super("advisor", color);
    }
    isMoveAllowedForPiece(fromSquare: Square, toSquare: Square): boolean {
      const currentRow = fromSquare.row;
      const currentColumn = fromSquare.column;
      const targetRow = toSquare.row;
      const targetColumn = toSquare.column;
      if (this.color === "red") {
        // move top left corner
        if (currentColumn - targetColumn === 1 && targetRow - currentRow === 1) {
          if (currentColumn === 5 && currentRow === 2) return true;
          if (currentColumn === 6 && currentRow === 1) return true;
        }
        // move top right corner
        if (targetColumn - currentColumn === 1 && targetRow - currentRow === 1) {
          if (currentColumn === 5 && currentRow === 2) return true;
          if (currentColumn === 4 && currentRow === 1) return true;
        }
        // move bottom left corner
        if (currentColumn - targetColumn === 1 && targetRow - currentRow === -1) {
          if (currentColumn === 5 && currentRow === 2) return true;
          if (currentColumn === 6 && currentRow === 3) return true;
        }
        // move bottom right corner
        if (
          currentColumn - targetColumn === -1 &&
          targetRow - currentRow === -1
        ) {
          if (currentColumn === 5 && currentRow === 2) return true;
          if (currentColumn === 4 && currentRow === 3) return true;
        }
      } else {
        // move top left corner
        if (currentColumn - targetColumn === 1 && targetRow - currentRow === 1) {
          if (currentColumn === 5 && currentRow === 9) return true;
          if (currentColumn === 6 && currentRow === 8) return true;
        }
        // move top right corner
        if (targetColumn - currentColumn === 1 && targetRow - currentRow === 1) {
          if (currentColumn === 5 && currentRow === 9) return true;
          if (currentColumn === 4 && currentRow === 8) return true;
        }
        // move bottom left corner
        if (currentColumn - targetColumn === 1 && targetRow - currentRow === -1) {
          if (currentColumn === 5 && currentRow === 9) return true;
          if (currentColumn === 6 && currentRow === 10) return true;
        }
        // move bottom right corner
        if (
          currentColumn - targetColumn === -1 &&
          targetRow - currentRow === -1
        ) {
          if (currentColumn === 5 && currentRow === 9) return true;
          if (currentColumn === 4 && currentRow === 10) return true;
        }
      }
      return false;
    }

    getChineseNameForPiece(): string {
      return this.color === "red" ? "仕" : "士";
    }
  }