import { Square } from "./Square";
import { COLORS, INITIAL_FEN, generateFenFromBoardSquaresArray, parseFen } from "./utils";

export class Board {
  constructor({initialFen = INITIAL_FEN, width} : {initialFen?: string, width:number }) {
    this.squares = []
    this.currentFen = initialFen;
    this.width = width
  }
  squares: Square[][];
  currentFen: string;
  width:number

  isLegalMove(fromSquare:Square, toSquare:Square) {
    if(fromSquare.piece == null){
      return false
    } 
    if(fromSquare.color == toSquare.color){
      return false
    }
    return true
  }

  movePiece(fromSquare: Square, toSquare: Square) {
    if(!this.isLegalMove(fromSquare,toSquare)){
      return
    }
    toSquare.piece = fromSquare.piece
    toSquare.color = fromSquare.color
    fromSquare.piece = null
    fromSquare.color = null
  }

  setUpBoardPosition(fen: string) {
    const parsedResult = parseFen(fen);
    this.currentFen = fen;
    this.squares = parsedResult.boardPosition;
    return parsedResult;
  }
  
  generateFenFromPosition(squaresAry:Square[][], turnOrder:typeof COLORS[number]){
    return generateFenFromBoardSquaresArray(squaresAry,turnOrder)
  }

  getSquareByCoordinates(row:number,column:number){
    if(this.squares.length == 0 ){
      console.error("The board is not initialized.")
      return
    }
    if(row < 0 || row > 10 || column < 0 || column > 9){
        console.error("Invalid coordinates.")
        return
    }
    return this.squares[10- row][column - 1]
  }
}
