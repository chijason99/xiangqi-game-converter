import { PIECE_NAMES, COLORS, RowNum, ColumnNum } from "./utils";
// const boardImage = require('./xiangqi-pieces/test_board_2.png')

const INITIAL_FEN =
  "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w";

type XiangqiBoardConstructorParameter = {
  id: string;
  initialFen?: string;
  width?:number;
  isFlippedHorizontally?: boolean;
  isFlippedVertically?: boolean;
  isUsingGraphicalPieces?: boolean;
};

// this class will manipulate the DOM and is responsible for the display of the board
export class XiangqiBoard {
  constructor({
    id,
    initialFen = INITIAL_FEN,
    isFlippedHorizontally = false,
    isFlippedVertically = false,
    isUsingGraphicalPieces = true,
    width = 450
  }: XiangqiBoardConstructorParameter) {
    this.id = id;
    this.fen = initialFen;
    this.isFlippedHorizontally = isFlippedHorizontally;
    this.isFlippedVertically = isFlippedVertically;
    this.isUsingGraphicalPieces = isUsingGraphicalPieces;
    this.width = width
  }
  id: string;
  fen: string;
  isFlippedHorizontally: boolean;
  isFlippedVertically: boolean;
  isUsingGraphicalPieces: boolean;
  width:number
  init() {
    this.createBoard(this.id);
    this.createPiece("pawn","red", this.selectSquare(5,4));
    return;
  }
  private createBoard(id: string) {
    //TODO:Create a xiangqi board in the div with that id
    // the board should be responsive
    const boardContainer = document.getElementById(id);
    if (boardContainer == null) {
      console.error("Cannot find element with id" + id);
      return;
    }
    const xiangqiBoard = document.createElement("div");
    xiangqiBoard.style.cssText = `
    width: ${this.width}px;
    aspect-ratio: 9/10;
    height:auto;
    display: grid;
    grid-template-rows: repeat(10, ${this.width/9}px );
    grid-template-columns: repeat(9, ${this.width/9}px);
    background: url('./xiangqi-pieces/test_board_2.png') center center no-repeat;
    background-size: cover;
    `;
    xiangqiBoard.setAttribute("id","xiangqiBoard")
    boardContainer.appendChild(xiangqiBoard)
    for(let i = 1; i <= 10 ; i++){
      for(let j = 1; j <= 9; j++){
        const square = this.createSquare(i,j);
        xiangqiBoard.appendChild(square)
      }
    }
    return
  }
  private createPositionFromFen(fen: string) {
    //TODO:generate the position of the board according to the input fen
  }

  private createSquare(row: number, column: number) {
    const square = document.createElement("div");
    square.dataset.row = row.toString();
    square.dataset.column = column.toString();
    square.style.width = `${this.width/9}px`
    square.style.height = `${this.width/9}px`
    square.style.display = "inline block"
    square.classList.add("square")
    return square
  }

  private createPiece(pieceName:typeof PIECE_NAMES[number], pieceColor:typeof COLORS[number],square:HTMLDivElement){
    const pieceImageUrl = `./xiangqi-pieces/${pieceColor}_${pieceName}.png`;
    const imageElement = document.createElement("img");
    imageElement.src = require(pieceImageUrl);
    imageElement.alt = `A picture of a ${pieceColor} ${pieceName}`
    square.appendChild(imageElement)
  }
  private selectSquare(row:RowNum,column:ColumnNum){
    const targetSquare = document.querySelector(`.square[data-row="${row}"][data-column="${column}"]`) as HTMLDivElement
    return targetSquare
  }
}
