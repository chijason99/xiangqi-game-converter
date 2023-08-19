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

  movePiece(boardSquares:Square[][], fromSquare: Square, toSquare: Square): Square[][] {
    const copyOfBoardSquares = [...boardSquares]
    const fromSquareInTheBoardSquares = copyOfBoardSquares[10 - fromSquare.row ].find(({id}:Square) => {
      return id === fromSquare.id
    }) as Square
    const toSquareInTheBoardSquares = boardSquares[10 - toSquare.row].find(({id}:Square) => {
      return id === toSquare.id
    }) as Square
    toSquareInTheBoardSquares.piece = fromSquareInTheBoardSquares.piece ; 
    fromSquareInTheBoardSquares.piece = null;
    this.squares = copyOfBoardSquares
    console.log(this.squares)
    return copyOfBoardSquares
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
    fromSquare: Square,
    toSquare: Square,
    specifiedColumn: number
  ):number{
    const currentRow = fromSquare.row;
    const currentColumn = fromSquare.column;
    const targetRow = toSquare.row;
    const targetColumn = toSquare.column;
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
    const boardSquaresOnTheSameColumn : Square[] = this.getAllSquaresOnColumn(this.squares,specifiedColumn)
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
    const boardSquaresOnTheRow = this.getAllSquaresOnRow(this.squares,specifiedRow)
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
    console.log(filteredBoardSquaresBetweenTheCoordinates);
    
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

  getAllSquaresOnRow(boardSquares:Square[][],specifiedRow:number):Square[]{
    const boardSquaresOnTheRow: Square[] = boardSquares[10 - specifiedRow ];
    return boardSquaresOnTheRow
  }
  getAllSquaresOnColumn(boardSquares:Square[][],specifiedColumn:number):Square[]{
    const boardSquaresOnTheSameColumn : Square[] = []; 
    for(const row of boardSquares){
      // move from bottom to top
        const squareOfTheColumn : Square = row.find(({column}:Square) => {
          return column === specifiedColumn 
        }) as Square;
        boardSquaresOnTheSameColumn.push(squareOfTheColumn)
    }
    return boardSquaresOnTheSameColumn
  }
}
