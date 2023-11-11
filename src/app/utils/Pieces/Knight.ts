import { Board } from "../Board";
import { Square } from "../Square";
import { COLORS } from "../utils";
import { Piece } from "./Piece";

export class Knight extends Piece {
    constructor(color: (typeof COLORS)[number]) {
      super("knight", color);
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
      // move forward
      if (targetRow - currentRow === 2) {
        if (!board.isEmptySquare(board.squares, currentRow + 1, currentColumn))
          return false;
        // left
        if (targetColumn - currentColumn === -1) return true;
        // right
        if (targetColumn - currentColumn === 1) return true;
      }
      // move down
      if (targetRow - currentRow === -2) {
        if (!board.isEmptySquare(board.squares, currentRow - 1, currentColumn))
          return false;
        // left
        if (targetColumn - currentColumn === -1) return true;
        // right
        if (targetColumn - currentColumn === 1) return true;
      }
      // move left
      if (targetColumn - currentColumn === -2) {
        if (!board.isEmptySquare(board.squares, currentRow, currentColumn - 1))
          return false;
        // up
        if (targetRow - currentRow === 1) return true;
        // down
        if (targetRow - currentRow === -1) return true;
      }
      // move right
      if (targetColumn - currentColumn === 2) {
        if (!board.isEmptySquare(board.squares, currentRow, currentColumn + 1))
          return false;
        // up
        if (targetRow - currentRow === 1) return true;
        // down
        if (targetRow - currentRow === -1) return true;
      }
      return false;
    }

    getChineseNameForPiece(): string {
      return "馬";
    }
  }