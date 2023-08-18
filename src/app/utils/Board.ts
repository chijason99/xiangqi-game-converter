import { Square } from "./Square";
import {
  COLORS,
  INITIAL_FEN,
  generateFenFromBoardSquaresArray,
  parseFen,
} from "./utils";

export class Board {
  constructor({
    initialFen = INITIAL_FEN,
    width,
  }: {
    initialFen?: string;
    width: number;
  }) {
    this.squares = [];
    this.currentFen = initialFen;
    this.width = width;
  }
  squares: Square[][];
  currentFen: string;
  width: number;

  isLegalMove(
    fromSquare: Square,
    toSquare: Square,
    turnOrder: (typeof COLORS)[number]
  ):boolean {
    const pieceBeingMoved = fromSquare.piece;
    if (pieceBeingMoved == null) {
      return false;
    }
    if (pieceBeingMoved.getPieceColor() != turnOrder) {
      return false;
    }

    if (
      toSquare.piece != null &&
      pieceBeingMoved.getPieceColor() === toSquare.piece.getPieceColor()
    ) {
      return false;
    }
    return pieceBeingMoved.isMoveAllowedForPiece(fromSquare, toSquare, this);
  }

  movePiece(fromSquare: Square, toSquare: Square):void {
    toSquare.piece = fromSquare.piece;
    fromSquare.piece = null;
    return
  }

  setUpBoardPosition(fen: string):{boardPosition:Square[][], turnOrder: typeof COLORS[number]} {
    const parsedResult = parseFen(fen);
    this.currentFen = fen;
    this.squares = parsedResult.boardPosition;
    return parsedResult;
  }
  isEmptySquare(
    board: Board,
    obstacleSquareRow: number,
    obstacleSquareColumn: number
  ):boolean {
    const obstacleSquare = board.getSquareByCoordinates(
      obstacleSquareRow,
      obstacleSquareColumn
    ) as Square;
    return obstacleSquare.piece == null;
  }
  numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(
    board: Board,
    fromSquare: Square,
    toSquare: Square,
    specifiedColumn: number
  ):number{
    const currentRow = fromSquare.row;
    const currentColumn = fromSquare.column;
    const targetRow = toSquare.row;
    const targetColumn = toSquare.column;
    const boardSquaresOnTheSameColumn : Square[] = []; 
    let filteredBoardSquaresBetweenTheCoordinates: Square[] = [];
    if (currentColumn !== specifiedColumn || targetColumn !== specifiedColumn){
      throw new Error("The two coordinates are not on the same column.")
    };
    if(currentRow === targetRow){
      throw new Error("The two coordinates are the same.")
    }
    if(Math.abs(targetRow - currentRow) === 1){
      return 0
    }
    for(const row of board.squares){
      // move from bottom to top
        const squareOfTheColumn : Square = row.find(({column}:Square) => {
          return column === specifiedColumn 
        }) as Square;
        boardSquaresOnTheSameColumn.push(squareOfTheColumn)
    }
    // move from bottom to top
    if(targetRow > currentRow ){
      filteredBoardSquaresBetweenTheCoordinates = boardSquaresOnTheSameColumn.filter(({row}:Square) => {
        return row > currentRow && row < targetRow
      })
    }
    // move from top to bottom
    else if(targetRow < currentRow){
      filteredBoardSquaresBetweenTheCoordinates = boardSquaresOnTheSameColumn.filter(({row}:Square) => {
        return row < currentRow && row > targetRow
      })
    }
    const result = filteredBoardSquaresBetweenTheCoordinates.reduce((numberOfPieces:number,square:Square ) => {
      if(square.piece != null){
        numberOfPieces+=1;
      }
      return numberOfPieces
    },0)
    return result;
  }
  numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(
    board: Board,
    fromSquare: Square,
    toSquare: Square,
    specifiedRow: number
  ): number {
    const currentRow = fromSquare.row;
    const currentColumn = fromSquare.column;
    const targetRow = toSquare.row;
    const targetColumn = toSquare.column;
    let filteredBoardSquaresBetweenTheCoordinates: Square[] = [];
    if (currentRow !== specifiedRow || targetRow !== specifiedRow){
      throw new Error("The two coordinates are not on the same row.")
    };
    if(currentColumn === targetColumn){
      throw new Error("The two coordinates are the same.")
    }
    // if it is moving only one step
    if(Math.abs(targetColumn - currentColumn) === 1){
      return 0
    }
    const boardSquaresOnTheRow: Square[] = board.squares[specifiedRow - 1];
    // move from right to left
    if (targetColumn < currentColumn) {
      filteredBoardSquaresBetweenTheCoordinates = boardSquaresOnTheRow.filter(
        ({ column }: Square) => column < currentColumn && column > targetColumn
      );
    }else if (targetColumn > currentColumn) {
          // move from left to right
      filteredBoardSquaresBetweenTheCoordinates = boardSquaresOnTheRow.filter(
        ({ column }: Square) => column > currentColumn && column < targetColumn
      );
    }
    const result = filteredBoardSquaresBetweenTheCoordinates.reduce((numberOfPieces:number,square:Square ) => {
      if(square.piece != null){
        numberOfPieces+=1;
      }
      return numberOfPieces
    },0)
    return result 
  }
  generateFenFromPosition(
    squaresAry: Square[][],
    turnOrder: (typeof COLORS)[number]
  ) {
    this.currentFen = generateFenFromBoardSquaresArray(squaresAry, turnOrder);
    return this.currentFen;
  }

  getSquareByCoordinates(row: number, column: number):Square {
    if (this.squares.length == 0) {
      throw new Error("The board is not initialized.");
    }
    if (row < 0 || row > 10 || column < 0 || column > 9) {
     throw new Error("Invalid coordinates.");
    }
    return this.squares[10 - row][column - 1];
  }
}
