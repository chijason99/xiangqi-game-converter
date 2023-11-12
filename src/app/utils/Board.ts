import { Piece } from "./Pieces/Piece";
import { Square } from "./Square";
import {
  COLORS,
  INITIAL_FEN,
  generateFenFromBoardSquaresArray,
  parseFen,
} from "./utils";

const TEST_FEN = "rnbak1bnr/2P1a4/1cP4c1/2P6/2P6/2P3p2/6p2/1C4pC1/6p2/RNBAKApNR w - - 0 0"

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
  ): boolean {
    const pieceBeingMoved = fromSquare.piece;
    if (pieceBeingMoved == null) {
      return false;
    }
    if (pieceBeingMoved.getPieceColor() !== turnOrder) {
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
  createDeepCopyOfBoardSquares(boardSquares: Square[][]): Square[][] {
    return boardSquares.map((row) =>
      row.map(({ id, piece, row, column }) => {
        return new Square({
          id,
          row,
          column,
          piece,
        });
      })
    );
  }
  movePiece(
    boardSquares: Square[][],
    fromSquare: Square,
    toSquare: Square
  ): Square[][] {
    const copyOfBoardSquares = this.createDeepCopyOfBoardSquares(boardSquares);
    const fromSquareInTheBoardSquares = copyOfBoardSquares[
      10 - fromSquare.row
    ].find(({ id }: Square) => {
      return id === fromSquare.id;
    }) as Square;
    const toSquareInTheBoardSquares = copyOfBoardSquares[
      10 - toSquare.row
    ].find(({ id }: Square) => {
      return id === toSquare.id;
    }) as Square;
    toSquareInTheBoardSquares.piece = fromSquareInTheBoardSquares.piece;
    fromSquareInTheBoardSquares.piece = null;
    return copyOfBoardSquares;
  }

  savePositionFromBoardSquares(boardSquares: Square[][]) {
    this.squares = boardSquares;
    return;
  }

  setUpBoardPosition(fen: string): {
    boardPosition: Square[][];
    turnOrder: (typeof COLORS)[number];
  } {
    const parsedResult = parseFen(fen);
    this.currentFen = fen;
    this.squares = parsedResult.boardPosition;
    return parsedResult;
  }
  isEmptySquare(
    boardSquares: Square[][],
    targetSquareRow: number,
    targetSquareColumn: number
  ): boolean {
    const targetSquare = this.getSquareByCoordinates(
      boardSquares,
      targetSquareRow,
      targetSquareColumn
    ) as Square;
    return targetSquare.piece == null;
  }
  numberOfPiecesBetweenTwoCoordinatesOnTheSameColumn(
    boardSquares: Square[][],
    fromSquare: Square,
    toSquare: Square,
    specifiedColumn: number
  ): number {
    const currentRow = fromSquare.row;
    const currentColumn = fromSquare.column;
    const targetRow = toSquare.row;
    const targetColumn = toSquare.column;
    let filteredBoardSquaresBetweenTheCoordinates: Square[] = [];
    if (currentColumn !== specifiedColumn || targetColumn !== specifiedColumn) {
      throw new Error("The two coordinates are not on the same column.");
    }
    if (currentRow === targetRow) {
      throw new Error("The two coordinates are the same.");
    }
    if (Math.abs(targetRow - currentRow) === 1) {
      return 0;
    }
    const boardSquaresOnTheSameColumn: Square[] = this.getAllSquaresOnColumn(
      boardSquares,
      specifiedColumn
    );
    // move from bottom to top
    if (targetRow > currentRow) {
      filteredBoardSquaresBetweenTheCoordinates =
        boardSquaresOnTheSameColumn.filter(({ row }: Square) => {
          return row > currentRow && row < targetRow;
        });
    }
    // move from top to bottom
    else if (targetRow < currentRow) {
      filteredBoardSquaresBetweenTheCoordinates =
        boardSquaresOnTheSameColumn.filter(({ row }: Square) => {
          return row < currentRow && row > targetRow;
        });
    }
    const result = filteredBoardSquaresBetweenTheCoordinates.reduce(
      (numberOfPieces: number, square: Square) => {
        if (square.piece != null) {
          numberOfPieces += 1;
        }
        return numberOfPieces;
      },
      0
    );
    return result;
  }
  numberOfPiecesBetweenTwoCoordinatesOnTheSameRow(
    boardSquares: Square[][],
    fromSquare: Square,
    toSquare: Square,
    specifiedRow: number
  ): number {
    const currentRow = fromSquare.row;
    const currentColumn = fromSquare.column;
    const targetRow = toSquare.row;
    const targetColumn = toSquare.column;
    let filteredBoardSquaresBetweenTheCoordinates: Square[] = [];
    if (currentRow !== specifiedRow || targetRow !== specifiedRow) {
      throw new Error("The two coordinates are not on the same row.");
    }
    if (currentColumn === targetColumn) {
      throw new Error("The two coordinates are the same.");
    }
    // if it is moving only one step
    if (Math.abs(targetColumn - currentColumn) === 1) {
      return 0;
    }
    const boardSquaresOnTheRow = this.getAllSquaresOnRow(
      boardSquares,
      specifiedRow
    );
    // move from right to left
    if (targetColumn < currentColumn) {
      filteredBoardSquaresBetweenTheCoordinates = boardSquaresOnTheRow.filter(
        ({ column }: Square) => column < currentColumn && column > targetColumn
      );
    } else if (targetColumn > currentColumn) {
      // move from left to right
      filteredBoardSquaresBetweenTheCoordinates = boardSquaresOnTheRow.filter(
        ({ column }: Square) => column > currentColumn && column < targetColumn
      );
    }
    const result = filteredBoardSquaresBetweenTheCoordinates.reduce(
      (numberOfPieces: number, square: Square) => {
        if (square.piece != null) {
          numberOfPieces += 1;
        }
        return numberOfPieces;
      },
      0
    );
    return result;
  }
  generateFenFromPosition(
    boardSquare: Square[][],
    turnOrder: (typeof COLORS)[number]
  ) {
    this.currentFen = generateFenFromBoardSquaresArray(boardSquare, turnOrder);
    return this.currentFen;
  }

  getSquareByCoordinates(boardSquares:Square[][],row: number, column: number): Square {
    if (boardSquares.length == 0) {
      console.error("The board is not initialized.");
      return new Square({id:"-1", piece:null, row:-1, column:-1})
    }
    if (row < 0 || row > 10 || column < 0 || column > 9) {
      console.error("Invalid Coordinates.");
      return new Square({id:"-1", piece:null, row:-1, column:-1})
    }
    return boardSquares[10 - row][column - 1];
  }

  getAllSquaresOnRow(boardSquares: Square[][], specifiedRow: number): Square[] {
    const boardSquaresOnTheRow: Square[] = boardSquares[10 - specifiedRow];
    return boardSquaresOnTheRow;
  }
  getAllSquaresOnColumn(
    boardSquares: Square[][],
    specifiedColumn: number
  ): Square[] {
    const boardSquaresOnTheSameColumn: Square[] = [];
    for (const row of boardSquares) {
      // move from bottom to top
      const squareOfTheColumn: Square = row.find(({ column }: Square) => {
        return column === specifiedColumn;
      }) as Square;
      boardSquaresOnTheSameColumn.push(squareOfTheColumn);
    }
    return boardSquaresOnTheSameColumn;
  }
  getKingSquare(
    boardSquares: Square[][],
    side: (typeof COLORS)[number]
  ): Square {
    for (const row of boardSquares) {
      for (const square of row) {
        if (
          square.piece != null &&
          square.piece.getPieceName() === "king" &&
          square.piece.getPieceColor() === side
        ) {
          return square;
        }
      }
    }
    return new Square({ id: "", piece: null, row: 0, column: 0 });
  }

  // a method for generating notation, check if another piece(s) of the same type and color is/are on the same column as a given piece 
  // TODO: a special method for pawns as it would need more details
  getRelativePositionOfMovedPiece(boardSquare:Square[][], fromSquare:Square) : {
    totalNumberOfSameTypeOfPieceInColumn : number
    relativePositionOfMovedPiece : number
    moreThanOneColumnWithTwoPawns : boolean
  }
  {
    // relative position starts from 0, and it is view from the perspective of the player making the move
    // for example, if the returned relativePositionOfCurrentPiece is 1, it indicates that the piece in the input is the piece at front
    // the number could be bigger than 1 when the piece is a pawn, but the relative position is calculated in the same manner

    const squaresOfAnotherPieceOnTheSameColumn : Square[] = [];
    const movedPiece = fromSquare.piece as Piece;
    let moreThanOneColumnWithTwoPawns = false;
    let relativePositionOfMovedPiece = 0;

    boardSquare.forEach(row => {
      row.forEach(square => {
        if(square.column === fromSquare.column && 
          square.piece?.getPieceName() === movedPiece.getPieceName() && 
          square.piece?.getPieceColor() === movedPiece.getPieceColor() && 
          square.row !== fromSquare.row){
            squaresOfAnotherPieceOnTheSameColumn.push(square)
        }
      })
    })

    if(squaresOfAnotherPieceOnTheSameColumn.length === 1){
      if(movedPiece.getPieceColor() === "red"){
          relativePositionOfMovedPiece = squaresOfAnotherPieceOnTheSameColumn[0].row > fromSquare.row ? 0 : 1;
      }else{
          relativePositionOfMovedPiece = squaresOfAnotherPieceOnTheSameColumn[0].row < fromSquare.row ? 0 : 1;
      }
    }

    // case for pawns 
    // only need to perform the check if the current column have 1 - 3 pawns
    if(movedPiece.getPieceName() === "pawn" && squaresOfAnotherPieceOnTheSameColumn.length < 4){
      const result : {[key: string]: number;} = {}
      let numberOfColumnsWithMoreThanOnePawn = 0;

      // find all pawns of the same color, add their count in each column to result
      boardSquare.forEach(row => {
        row.forEach(square => {
          if(square.piece?.getPieceName() === "pawn" &&
            square.piece?.getPieceColor() === movedPiece.getPieceColor()
          ){
            result[square.column.toString()] = result[square.column.toString()] == null ? 1 : result[square.column.toString()]+=1
          }
        })
      })

      for(const column in result){
        numberOfColumnsWithMoreThanOnePawn = result[column] >= 2 ? numberOfColumnsWithMoreThanOnePawn+=1 : numberOfColumnsWithMoreThanOnePawn;
      }
      
      moreThanOneColumnWithTwoPawns = numberOfColumnsWithMoreThanOnePawn > 1;
    }

    if(squaresOfAnotherPieceOnTheSameColumn.length > 1){
      squaresOfAnotherPieceOnTheSameColumn.forEach(square => {
        if(movedPiece.getPieceColor() === "red"){
          relativePositionOfMovedPiece = fromSquare.row > square.row ? relativePositionOfMovedPiece+=1 : relativePositionOfMovedPiece;
        }else{
          relativePositionOfMovedPiece = fromSquare.row < square.row ? relativePositionOfMovedPiece+=1 : relativePositionOfMovedPiece;
        }
      })
    }

     return {
      totalNumberOfSameTypeOfPieceInColumn : squaresOfAnotherPieceOnTheSameColumn.length + 1,
      relativePositionOfMovedPiece,
      moreThanOneColumnWithTwoPawns
    }
  }
}
