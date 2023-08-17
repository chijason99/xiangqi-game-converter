import { Board } from "./Board";
import { Piece } from "./Piece";
import { BlackPlayer, RedPlayer } from "./Player";
import { Square } from "./Square";
import { COLORS, RESULTS } from "./utils";

type Move = {
  turnOrder: (typeof COLORS)[number];
  fen: string;
  movedPiece: Piece;
  fromSquare: Square;
  toSquare: Square;
};

// this class is responsible for managing the state of the game
export class Game {
  constructor(
    {
      turnOrder,
      round = 1,
      redPlayer =  new RedPlayer("unknown"),
      blackPlayer = new BlackPlayer("unknown"),
      board,
    } : {
      turnOrder: (typeof COLORS)[number],
      round ?: number,
      redPlayer?: RedPlayer,
      blackPlayer?: BlackPlayer,
      board : Board,
    }

  ) {
    this.turnOrder = turnOrder;
    this.round = round;
    this.redPlayer = redPlayer;
    this.blackPlayer = blackPlayer;
    this.result = null
    this.isGameEnd = false;
    this.moves = [];
    this.board = board
  }
  turnOrder: "red" | "black";
  round: number;
  redPlayer: RedPlayer;
  blackPlayer: BlackPlayer;
  result: typeof RESULTS[number] | null;
  isGameEnd: boolean;
  moves: Move[];
  board: Board;

  startGame() {
    const {turnOrder} = this.board.setUpBoardPosition(this.board.currentFen);
    this.turnOrder = turnOrder
    return this
  }

  endGame() {

  }

  nextTurn() {}

  isGameOver() {}
}
