import { Board } from "../Board";
import { Square } from "../Square";
import { COLORS } from "../utils";
import { Piece } from "./Piece";

export class Bishop extends Piece {
    constructor(color: (typeof COLORS)[number]) {
      super("bishop", color);
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
      if (this.color === "red") {
        // cannot cross the river
        if (targetRow > 5) return false;
        // move top left corner
        if (targetColumn - currentColumn === -2 && targetRow - currentRow === 2) {
          if (!board.isEmptySquare(board.squares, currentRow + 1, currentColumn - 1))
            return false;
          if (currentColumn === 3 && currentRow === 1) return true;
          if (currentColumn === 5 && currentRow === 3) return true;
          if (currentColumn === 7 && currentRow === 1) return true;
          if (currentColumn === 9 && currentRow === 3) return true;
        }
        // move top right corner
        if (targetColumn - currentColumn === 2 && targetRow - currentRow === 2) {
          if (!board.isEmptySquare(board.squares, currentRow + 1, currentColumn + 1))
            return false;
          if (currentColumn === 1 && currentRow === 3) return true;
          if (currentColumn === 3 && currentRow === 1) return true;
          if (currentColumn === 5 && currentRow === 3) return true;
          if (currentColumn === 7 && currentRow === 1) return true;
        }
        // move bottom left corner
        if (
          targetColumn - currentColumn === -2 &&
          targetRow - currentRow === -2
        ) {
          if (!board.isEmptySquare(board.squares, currentRow - 1, currentColumn - 1))
            return false;
          if (currentColumn === 3 && currentRow === 5) return true;
          if (currentColumn === 5 && currentRow === 3) return true;
          if (currentColumn === 7 && currentRow === 5) return true;
          if (currentColumn === 9 && currentRow === 3) return true;
        }
        // move bottom right corner
        if (targetColumn - currentColumn === 2 && targetRow - currentRow === -2) {
          if (!board.isEmptySquare(board.squares, currentRow - 1, currentColumn + 1))
            return false;
          if (currentColumn === 1 && currentRow === 3) return true;
          if (currentColumn === 3 && currentRow === 5) return true;
          if (currentColumn === 5 && currentRow === 3) return true;
          if (currentColumn === 7 && currentRow === 5) return true;
        }
      } else {
        // cannot cross the river
        if (targetRow < 6) return false;
        // move top left corner
        if (targetColumn - currentColumn === -2 && targetRow - currentRow === 2) {
          if (!board.isEmptySquare(board.squares, currentRow + 1, currentColumn - 1))
            return false;
          if (currentColumn === 3 && currentRow === 6) return true;
          if (currentColumn === 5 && currentRow === 8) return true;
          if (currentColumn === 7 && currentRow === 6) return true;
          if (currentColumn === 9 && currentRow === 8) return true;
        }
        // move top right corner
        if (targetColumn - currentColumn === 2 && targetRow - currentRow === 2) {
          if (!board.isEmptySquare(board.squares, currentRow + 1, currentColumn + 1))
            return false;
          if (currentColumn === 1 && currentRow === 8) return true;
          if (currentColumn === 3 && currentRow === 6) return true;
          if (currentColumn === 5 && currentRow === 8) return true;
          if (currentColumn === 7 && currentRow === 6) return true;
        }
        // move bottom left corner
        if (
          targetColumn - currentColumn === -2 &&
          targetRow - currentRow === -2
        ) {
          if (!board.isEmptySquare(board.squares, currentRow - 1, currentColumn - 1))
            return false;
          if (currentColumn === 3 && currentRow === 10) return true;
          if (currentColumn === 5 && currentRow === 8) return true;
          if (currentColumn === 7 && currentRow === 10) return true;
          if (currentColumn === 9 && currentRow === 8) return true;
        }
        // move bottom right corner
        if (targetColumn - currentColumn === 2 && targetRow - currentRow === -2) {
          if (!board.isEmptySquare(board.squares, currentRow - 1, currentColumn + 1))
            return false;
          if (currentColumn === 1 && currentRow === 8) return true;
          if (currentColumn === 3 && currentRow === 10) return true;
          if (currentColumn === 5 && currentRow === 8) return true;
          if (currentColumn === 7 && currentRow === 10) return true;
        }
      }
      return false;
    }

    getChineseNameForPiece(): string {
      return this.color === "red" ? "相" : "象";
    }
  }