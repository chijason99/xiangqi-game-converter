import { Board } from "./Board";
import { Piece } from "./Pieces/Piece";
import { BlackPlayer, RedPlayer } from "./Player";
import { Square } from "./Square";
import { COLORS, PIECE_NAMES, RESULTS } from "./utils";

export type Move = {
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

  nextTurn() {
    this.turnOrder === "red" ? this.turnOrder = "black" : this.turnOrder = "red"
  }

  saveMove(fromSquare:Square,toSquare:Square){
    const moveObject : Move = {
      turnOrder: this.turnOrder,
      fen:this.board.currentFen,
      fromSquare,
      toSquare,
      movedPiece: toSquare.piece as Piece
    }
    this.moves.push(moveObject)
  }
  deleteMove(){

  }
  isGameOver() {}
}
