
import { Advisor } from "./Pieces/Advisor";
import { Bishop } from "./Pieces/Bishop";
import { Cannon } from "./Pieces/Cannon";
import { King } from "./Pieces/King";
import { Knight } from "./Pieces/Knight";
import { Pawn } from "./Pieces/Pawn";
import { Piece } from "./Pieces/Piece";
import { Rook } from "./Pieces/Rook";
import { Square } from "./Square";

export const PIECE_NAMES = [
  "advisor",
  "bishop",
  "cannon",
  "king",
  "knight",
  "pawn",
  "rook",
] as const;

export const COLORS = ["red", "black"] as const;
export const RESULTS = ["red wins", "black wins", "draw"] as const;
export const INITIAL_FEN =
  "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w";

export type RowNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ColumnNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function validateFen(fenInput: string) {
  if (!fenInput.trim().split("/")) {
    return false;
  } else {
    const splitUpFEN = fenInput.trim().split("/");
    if (splitUpFEN.length === 10) {
      const lastFEN = splitUpFEN[9].split(" ")[0];
      splitUpFEN[splitUpFEN.length - 1] = lastFEN;
      const decodedFEN = splitUpFEN.map((FENstring) => {
        return FENstring.replace(/9/g, "111111111")
          .replace(/8/g, "11111111")
          .replace(/7/g, "1111111")
          .replace(/6/g, "111111")
          .replace(/5/g, "11111")
          .replace(/4/g, "1111")
          .replace(/3/g, "111")
          .replace(/2/g, "11")
          .split("");
      });
      for (const FENstring of decodedFEN) {
        if (FENstring.length !== 9) {
          return false;
        }
        if (
          FENstring.every((sqr) => {
            return sqr.match(/[krncabpKRNCABP1]/);
          })
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
}

export function parseFen(inputFen: string) {
  //separate the FEN string into sections according to their rows
  const splitUpFen = inputFen.trim().split("/");

  //getting the FEN of the last row, excluding other info
  const lastFen = splitUpFen[9].split(" ")[0];

  //getting the turn order info
  const turnOrderSymbol = splitUpFen[9].split(" ")[1];
  splitUpFen[splitUpFen.length - 1] = lastFen;

  //replacing the number of empty squares into "1"s
  const decodedFen = splitUpFen.map((FenString) => {
    return FenString.replace(/9/g, "111111111")
      .replace(/8/g, "11111111")
      .replace(/7/g, "1111111")
      .replace(/6/g, "111111")
      .replace(/5/g, "11111")
      .replace(/4/g, "1111")
      .replace(/3/g, "111")
      .replace(/2/g, "11")
      .split("");
  });

  let boardPosition: Square[][] = [];
  // setting the new sqr state from the decoded FEN
  decodedFen.forEach((fenString, fenStringIndex) => {
    let rowPosition: Square[] = [];
    fenString.forEach((fenLetter, fenLetterIndex) => {
      const square: Square = {
        piece: identifyPieceType(fenLetter),
        row: 10 - fenStringIndex,
        column: fenLetterIndex + 1,
        id: `${fenLetterIndex + 1}-${10 - fenStringIndex}`,
      };
      rowPosition.push(square);
    });
    boardPosition.push(rowPosition);
  });
  let turnOrder: (typeof COLORS)[number];
  turnOrderSymbol === "b" ? (turnOrder = "black") : (turnOrder = "red");
  return { boardPosition, turnOrder };
}

export function identifyPieceType(letter: string): Piece | null {
  // identify piece from letters of FEN string
  switch (letter) {
    case "K":
    case "k":
      return new King((letter === "K" ? "red" : "black"));
    case "R":
    case "r":
      return new Rook((letter === "R" ? "red" : "black"));
    case "N":
    case "n":
      return new Knight((letter === "N" ? "red" : "black"));
    case "C":
    case "c":
      return new Cannon((letter === "C" ? "red" : "black"));
    case "A":
    case "a":
      return new Advisor((letter === "A" ? "red" : "black"));
    case "B":
    case "b":
      return new Bishop((letter === "B" ? "red" : "black"));
    case "P":
    case "p":
      return new Pawn((letter === "P" ? "red" : "black"));
    default:
      return null;
  }
}

export function identifyPieceColor(
  letter: string
): (typeof COLORS)[number] | null {
  if (parseInt(letter) === 1) {
    return null;
  } else if (letter === letter.toUpperCase()) {
    // is capital, i.e. is red
    return "red";
  } else {
    return "black";
  }
}

export function generateFenStringForRow(boardSquareRow: Square[]) {
  let fenCharForRow: string[] = [];
  boardSquareRow.forEach((boardSquare) => {
    if (boardSquare.piece === null) {
      if (typeof fenCharForRow[fenCharForRow.length - 1] === "number") {
        fenCharForRow[fenCharForRow.length - 1] += 1;
      } else {
        fenCharForRow.push("1");
      }
    } else {
      let letter;
      if (boardSquare.piece.getPieceName() === "knight") {
        letter = "n";
      } else {
        letter = boardSquare.piece.getPieceName().split("")[0];
      }
      fenCharForRow.push(
        boardSquare.piece.getPieceColor() === "red" ? letter.toUpperCase() : letter
      );
      return;
    }
  });
  const result = fenCharForRow.join("");
  return result;
}

export function generateFenFromBoardSquaresArray(
  boardSquaresArray: Square[][],
  currentTurn: (typeof COLORS)[number]
) {
  const fenStringForEachRow = [];
  for (const row of boardSquaresArray) {
    fenStringForEachRow.push(generateFenStringForRow(row));
  }
  const turnOrder = currentTurn === "red" ? "w" : "b";
  const finalFenString = `${fenStringForEachRow.join("/")} ${turnOrder}`;
  return finalFenString;
}

// a function to generate Chinese move notation following the standard from Xiangqi World Federation
export function generateMoveNotation(
  fromSquare: Square,
  toSquare: Square,
  relativePositionOfMovedPiece: number,
  totalNumberOfSameTypeOfPieceInColumn : number,
  moreThanOneColumnWithTwoPawns : boolean
):string {
  // each Chinese move notation must be consisting of four Chinese characters
  const movedPiece = fromSquare.piece as Piece;
  
  // setting the default value of the four characters (default means that if the piece is the only piece of the same type and color in the same column)
  let firstCharacter = movedPiece.getChineseNameForPiece();
  let secondCharacter = movedPiece.getPieceColor() === "red" ? translateNumberToChinese(10 - fromSquare.column) : convertHalfWidthNumberToFullWidth(fromSquare.column);
  let thirdCharacter = getChineseCharacterForDirectionOfMovement(movedPiece, fromSquare, toSquare);
  let fourthCharacter:string;

  if(thirdCharacter === "進" || thirdCharacter === "退"){
    // the logic of the fourth character is different for pieces moving in diagonal and pieces moving in orthogonal
    switch(movedPiece.getPieceName()){
      case "advisor":
      case "bishop":
      case "knight":
        fourthCharacter = movedPiece.getPieceColor() === "red" ? translateNumberToChinese(10 - toSquare.column) : convertHalfWidthNumberToFullWidth(toSquare.column);
        break;
      default:
        const absoluteDistanceForTheMove = Math.abs(toSquare.row - fromSquare.row);
        fourthCharacter = movedPiece.getPieceColor() === "red" ? translateNumberToChinese(absoluteDistanceForTheMove) : convertHalfWidthNumberToFullWidth(absoluteDistanceForTheMove);
        break
    }
    }else{
      fourthCharacter = movedPiece.getPieceColor() === "red" ? translateNumberToChinese(10 - toSquare.column) : convertHalfWidthNumberToFullWidth(toSquare.column);
  }

  // edge cases: more than one piece of same type and color in the column of the moved piece

  // if there is another piece of the same color and type in the same column
  // if the piece is a pawn, only do this manipulation if there is no other column with more than one pawn
  if(totalNumberOfSameTypeOfPieceInColumn === 2 && (movedPiece.getPieceName() !== "pawn" || !moreThanOneColumnWithTwoPawns)){
    secondCharacter = firstCharacter;
    firstCharacter = relativePositionOfMovedPiece === 0 ? "後" : "前";
  }

  // edge cases for pawns
  if(totalNumberOfSameTypeOfPieceInColumn >= 2 && (movedPiece.getPieceName() === "pawn" || moreThanOneColumnWithTwoPawns)){
    // if there is more than one column with two pawns, then the second character would be the original column number, else it would be the "兵"/"卒" character
    if(moreThanOneColumnWithTwoPawns){
      secondCharacter = movedPiece.getPieceColor() === "red" ? translateNumberToChinese(10 - fromSquare.column) : convertHalfWidthNumberToFullWidth(fromSquare.column);
    }else{
      secondCharacter = firstCharacter
    }

    switch(relativePositionOfMovedPiece){
      case 1:
        // if there is three pawns on the column, and its position is one, then it is the middle pawn
        // else if there is only two pawns on the column, then it would be the front pawn
        // else its position would be total number of pawns - 1
        firstCharacter = totalNumberOfSameTypeOfPieceInColumn === 3 ? "中" : totalNumberOfSameTypeOfPieceInColumn === 2 ? "前" : translateNumberToChinese(totalNumberOfSameTypeOfPieceInColumn - 1);
        break;
      case 2:
        firstCharacter = totalNumberOfSameTypeOfPieceInColumn === 3 ? "前" : translateNumberToChinese(totalNumberOfSameTypeOfPieceInColumn - 2);
        break;
      case 3:
        firstCharacter = totalNumberOfSameTypeOfPieceInColumn === 4 ? "前" : translateNumberToChinese(totalNumberOfSameTypeOfPieceInColumn - 3);
        break;
      case 4:
        firstCharacter = "前";
        break;        
      default:
        firstCharacter = "後";
        break;
    }
  }

  return `${firstCharacter}${secondCharacter}${thirdCharacter}${fourthCharacter}`
}

function convertHalfWidthNumberToFullWidth(number:number):string{
  switch(number){
    case 1:
      return "１";
    case 2:
      return "２";    
    case 3:
      return "３";    
    case 4:
      return "４";    
    case 5:
      return "５";    
    case 6:
      return "６";    
    case 7:
      return "７";    
    case 8:
      return "８";    
    case 9:
      return "９";    
    default:
      return "０";
  }
}

function translateNumberToChinese(number: number){
  switch(number){
    case 1:
      return "一";
    case 2:
      return "二";    
    case 3:
      return "三";    
    case 4:
      return "四";    
    case 5:
      return "五";    
    case 6:
      return "六";    
    case 7:
      return "七";    
    case 8:
      return "八";    
    case 9:
      return "九";    
    default:
      return "零";
  }
}

function getChineseCharacterForDirectionOfMovement(movedPiece:Piece, fromSquare: Square, toSquare: Square) : string{
  if(fromSquare.row === toSquare.row) return "平"

  if(movedPiece.getPieceColor() === "red"){
    return fromSquare.row < toSquare.row ? "進" : "退" 
  }else{
    return fromSquare.row > toSquare.row ? "進" : "退" 
  }  
}