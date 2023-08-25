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
      if (this.isKingSafeAfterMove(this.board.squares, fromSquare, toSquare)) {
        return true;
      }
    }
    return false;
  }
  isKingSafeAfterMove(
    boardSquares: Square[][],
    fromSquare: Square,
    toSquare: Square
  ) {
    // simulate the boardSquares by pretending the move is valid
    // check if the king is under attack by any of the pieces
    // return a boolean
    const copyOfTheBoardSquares =
      this.board.createDeepCopyOfBoardSquares(boardSquares);
    const boardSquaresAfterMakingTheMove = this.board.movePiece(
      copyOfTheBoardSquares,
      fromSquare,
      toSquare
    );
    console.log(
      "boardSquares after making the move",
      boardSquaresAfterMakingTheMove
    );

    const kingSquareAfterMakingTheMove = this.board.getKingSquare(
      boardSquaresAfterMakingTheMove,
      this.turnOrder
    );
    if (
      this.isKingThreatenedByRook(
        boardSquaresAfterMakingTheMove,
        kingSquareAfterMakingTheMove
      )
    ) {
      return false;
    }
    if (
      this.isKingThreatenedByCannon(
        boardSquaresAfterMakingTheMove,
        kingSquareAfterMakingTheMove
      )
    ) {
      return false;
    }
    if (
      this.isKingThreatenedByKnight(
        boardSquaresAfterMakingTheMove,
        kingSquareAfterMakingTheMove
      )
    ) {
      return false;
    }
    console.log(
      "is threatened by horse",
      this.isKingThreatenedByKnight(
        boardSquaresAfterMakingTheMove,
        kingSquareAfterMakingTheMove
      )
    );
    return true;
  }
  isKingThreatenedByRook(
    boardSquares: Square[][],
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
    const opponentRookOnKingRow = boardSquaresOnKingRow.filter(({ piece }) => {
      return (
        piece != null &&
        piece.getPieceColor() !== this.turnOrder &&
        piece.getPieceName() === "rook"
      );
    });
    const opponentRookOnKingColumn = boardSquaresOnKingColumn.filter(
      ({ piece }) => {
        return (
          piece != null &&
          piece.getPieceColor() !== this.turnOrder &&
          piece.getPieceName() === "rook"
        );
      }
    );
    // if there is no opponent rook on the king's row and column
    if (
      opponentRookOnKingRow.length === 0 &&
      opponentRookOnKingColumn.length === 0
    ) {
      return false;
    }
    if (opponentRookOnKingRow.length > 0) {
      for (const rookSquare of opponentRookOnKingRow) {
        // check if there is any pieces between the king and the opponent rook
        if (
          this.board.numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(
            boardSquares,
            rookSquare,
            kingSquare,
            kingRow
          ) === 0
        ) {
          return true;
        }
      }
    }
    if (opponentRookOnKingColumn.length > 0) {
      for (const rookSquare of opponentRookOnKingColumn) {
        // check if there is any pieces between the king and the opponent rook
        if (
          this.board.numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(
            boardSquares,
            rookSquare,
            kingSquare,
            kingColumn
          ) === 0
        ) {
          return true;
        }
      }
    }
    return false;
  }
  isKingThreatenedByCannon(
    boardSquares: Square[][],
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
    const opponentCannonOnKingRow = boardSquaresOnKingRow.filter(
      ({ piece }) => {
        return (
          piece != null &&
          piece.getPieceColor() !== this.turnOrder &&
          piece.getPieceName() === "cannon"
        );
      }
    );
    const opponentCannonOnKingColumn = boardSquaresOnKingColumn.filter(
      ({ piece }) => {
        return (
          piece != null &&
          piece.getPieceColor() !== this.turnOrder &&
          piece.getPieceName() === "cannon"
        );
      }
    );
    // if there is no opponent's cannon on the king's row and column
    if (
      opponentCannonOnKingRow.length === 0 &&
      opponentCannonOnKingColumn.length === 0
    ) {
      return false;
    }
    if (opponentCannonOnKingRow.length > 0) {
      for (const CannonSquare of opponentCannonOnKingRow) {
        // check if there is a piece between the king and the opponent cannon, i.e. the king is being attacked by the opponent's cannon
        if (
          this.board.numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(
            boardSquares,
            CannonSquare,
            kingSquare,
            kingRow
          ) === 1
        ) {
          return true;
        }
      }
    }
    if (opponentCannonOnKingColumn.length > 0) {
      for (const CannonSquare of opponentCannonOnKingColumn) {
        // check if there is a piece between the king and the opponent cannon, i.e. the king is being attacked by the opponent's cannon
        if (
          this.board.numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(
            boardSquares,
            CannonSquare,
            kingSquare,
            kingColumn
          ) === 1
        ) {
          return true;
        }
      }
    }
    return false;
  }
  isKingThreatenedByKnight(
    boardSquares: Square[][],
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
    const knightSquaresCoordinatesThatCanAttackTheKing = [
      // forward, left
      {
        row: kingRow + 2,
        column: kingColumn - 1,
        obstacleCoordinates: { row: kingRow + 1, column: kingColumn - 1 },
      },
      // forward, right
      {
        row: kingRow + 2,
        column: kingColumn + 1,
        obstacleCoordinates: { row: kingRow + 1, column: kingColumn + 1 },
      },
      // backward, left
      {
        row: kingRow - 2,
        column: kingColumn - 1,
        obstacleCoordinates: { row: kingRow - 1, column: kingColumn - 1 },
      },
      // backward, right
      {
        row: kingRow - 2,
        column: kingColumn + 1,
        obstacleCoordinates: { row: kingRow - 1, column: kingColumn + 1 },
      },
      // left, forward
      {
        row: kingRow + 1,
        column: kingColumn - 2,
        obstacleCoordinates: { row: kingRow + 1, column: kingColumn - 1 },
      },
      // left, backward
      {
        row: kingRow - 1,
        column: kingColumn - 2,
        obstacleCoordinates: { row: kingRow - 1, column: kingColumn - 1 },
      },
      // right, forward
      {
        row: kingRow + 1,
        column: kingColumn + 2,
        obstacleCoordinates: { row: kingRow + 1, column: kingColumn + 1 },
      },
      // right, backward
      {
        row: kingRow - 1,
        column: kingColumn + 2,
        obstacleCoordinates: { row: kingRow - 1, column: kingColumn + 1 },
      },
    ];
    for (const coordinates of knightSquaresCoordinatesThatCanAttackTheKing) {
      const { obstacleCoordinates: coordinatesOfObstacleSquare } = coordinates;
      if (
        coordinates.row < 1 ||
        coordinates.row > 10 ||
        coordinates.column < 1 ||
        coordinates.column > 9
      ) {
        continue;
      }
      const correspondingSquare = this.board.getSquareByCoordinates(
        boardSquares,
        coordinates.row,
        coordinates.column
      );
      if (correspondingSquare.id === "-1") {
        // if the position of the knight attacking square is out of the board
        continue;
      }
      if (
        correspondingSquare.piece != null &&
        correspondingSquare.piece.getPieceName() === "knight" &&
        correspondingSquare.piece.getPieceColor() !== this.turnOrder &&
        this.board.isEmptySquare(
          boardSquares,
          coordinatesOfObstacleSquare.row,
          coordinatesOfObstacleSquare.column
        )
      ) {
        return true;
      }
      console.log(
        "corresponding square",
        correspondingSquare,
        "obstacle square",
        coordinatesOfObstacleSquare,
        "obstacle square is empty",
        this.board.isEmptySquare(
          boardSquares,
          coordinatesOfObstacleSquare.row,
          coordinatesOfObstacleSquare.column
        )
      );
    }
    return false;
  }
}
