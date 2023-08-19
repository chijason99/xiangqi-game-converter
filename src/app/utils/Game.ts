import { Board } from "./Board";
import { Piece } from "./Pieces/Piece";
import { BlackPlayer, RedPlayer } from "./Player";
import { Square } from "./Square";
import { COLORS, RESULTS } from "./utils";

export type Move = {
  turnOrder: (typeof COLORS)[number];
  fen: string;
  movedPiece: Piece;
  fromSquare: Square;
  toSquare: Square;
};

// this class is responsible for managing the state of the game
export class Game {
  constructor({
    turnOrder,
    round = 1,
    redPlayer = new RedPlayer("unknown"),
    blackPlayer = new BlackPlayer("unknown"),
    board,
  }: {
    turnOrder: (typeof COLORS)[number];
    round?: number;
    redPlayer?: RedPlayer;
    blackPlayer?: BlackPlayer;
    board: Board;
  }) {
    this.turnOrder = turnOrder;
    this.round = round;
    this.redPlayer = redPlayer;
    this.blackPlayer = blackPlayer;
    this.result = null;
    this.isGameEnd = false;
    this.moves = [];
    this.board = board;
  }
  turnOrder: "red" | "black";
  round: number;
  redPlayer: RedPlayer;
  blackPlayer: BlackPlayer;
  result: (typeof RESULTS)[number] | null;
  isGameEnd: boolean;
  moves: Move[];
  board: Board;

  startGame() {
    const { turnOrder } = this.board.setUpBoardPosition(this.board.currentFen);
    this.turnOrder = turnOrder;
    return this;
  }

  endGame() {}

  nextTurn(): void {
    this.turnOrder === "red"
      ? (this.turnOrder = "black")
      : (this.turnOrder = "red");
  }

  saveMove(fromSquare: Square, toSquare: Square) {
    const moveObject: Move = {
      turnOrder: this.turnOrder,
      fen: this.board.currentFen,
      fromSquare,
      toSquare,
      movedPiece: toSquare.piece as Piece,
    };
    this.moves.push(moveObject);
  }
  deleteMove() {}
  isGameOver() {}

  isMoveValid(fromSquare: Square, toSquare: Square): boolean {
    if (this.board.isLegalMove(fromSquare, toSquare, this.turnOrder)) {
      return true;
    }

    return false;
  }
  isKingSafeAfterMove(board: Board, fromSquare: Square, toSquare: Square) {
    // simulate the boardSquares by pretending the move is valid
    // check if the king is under attack by any of the pieces
    // return a boolean
    const copyOfTheBoardSquares = [...board.squares]
    
  }
  isKingThreatenedByRook(
    boardSquares: Square[][],
    fromSquare: Square,
    toSquare: Square,
    kingSquare: Square
  ): boolean {
    if (
      kingSquare.piece == null ||
      kingSquare.piece.getPieceName() !== "king"
    ) {
      throw new Error("Invalid King Square");
    }
    const kingRow = kingSquare.row;
    const kingColumn = kingSquare.column;
    const boardSquaresOnKingRow = this.board.getAllSquaresOnRow(
      boardSquares,
      kingRow
    );
    const boardSquaresOnKingColumn = this.board.getAllSquaresOnColumn(
      boardSquares,
      kingColumn
    );

    if (kingSquare.piece.getPieceColor() === "red") {
      const blackRookOnKingRow = boardSquaresOnKingRow.filter(({ piece }) => {
        return (
          piece != null &&
          piece.getPieceColor() === "black" &&
          piece.getPieceName() === "rook"
        );
      });
      const blackRookOnKingColumn = boardSquaresOnKingColumn.filter(
        ({ piece }) => {
          return (
            piece != null &&
            piece.getPieceColor() === "black" &&
            piece.getPieceName() === "rook"
          );
        }
      );
      if (blackRookOnKingRow.length === 0 && blackRookOnKingColumn.length === 0)
        return false;
      if (blackRookOnKingRow.length > 0) {
        for (const rookSquare of blackRookOnKingRow) {
          // check if there is any pieces between the red king and the black rook
          if (
            this.board.numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(
              rookSquare,
              kingSquare,
              kingRow
            ) === 0
          ) {
            return true;
          }
        }
      }
      if (blackRookOnKingColumn.length > 0) {
        for (const rookSquare of blackRookOnKingColumn) {
          // check if there is any pieces between the red king and the black rook
          if (
            this.board.numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(
              rookSquare,
              kingSquare,
              kingColumn
            ) === 0
          ) {
            return true;
          }
        }
      }
    } else {
      // if the king is black
      const redRookOnKingRow = boardSquaresOnKingRow.filter(({ piece }) => {
        return (
          piece != null &&
          piece.getPieceColor() === "red" &&
          piece.getPieceName() === "rook"
        );
      });
      const redRookOnKingColumn = boardSquaresOnKingColumn.filter(
        ({ piece }) => {
          return (
            piece != null &&
            piece.getPieceColor() === "red" &&
            piece.getPieceName() === "rook"
          );
        }
      );
      if (redRookOnKingRow.length === 0 && redRookOnKingColumn.length === 0)
        return false;
      if (redRookOnKingRow.length > 0) {
        for (const rookSquare of redRookOnKingRow) {
          // check if there is any pieces between the red king and the black rook
          if (
            this.board.numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(
              rookSquare,
              kingSquare,
              kingRow
            ) === 0
          ) {
            return true;
          }
        }
      }
      if (redRookOnKingColumn.length > 0) {
        for (const rookSquare of redRookOnKingColumn) {
          // check if there is any pieces between the red king and the black rook
          if (
            this.board.numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(
              rookSquare,
              kingSquare,
              kingColumn
            ) === 0
          ) {
            return true;
          }
        }
      }
    }
    return false
  }
}
