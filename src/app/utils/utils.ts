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
export const RESULTS = ["red wins", "black wins", "draw"] as const
export const INITIAL_FEN =
"rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w";

export type RowNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ColumnNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function validateFen(fenInput:string){
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

export function parseFen(inputFen:string) {
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
  decodedFen.forEach((FenString, FenStringIndex) => {
    let rowPosition:Square[] = [];
    FenString.forEach((FENletter, letterIndex) => {
      const square = {
        piece: identifyPieceType(FENletter),
        color: identifyPieceColor(FENletter),
        row: 10 - FenStringIndex,
        column: letterIndex + 1,
        id: `${letterIndex + 1}-${10 - FenStringIndex}`,
      };
      rowPosition.push(square);
    });
    boardPosition.push(rowPosition)
  });
  let turnOrder:typeof COLORS[number];
  turnOrderSymbol === "b" ? turnOrder = "black" : turnOrder = "red"
  return {boardPosition, turnOrder}
}

export function identifyPieceType(letter:string):(typeof PIECE_NAMES)[number] | null {
  // identify piece from letters of FEN string
  switch (letter.toUpperCase()) {
    case "K":
      return "king";
    case "R":
      return "rook";
    case "N":
      return "knight";
    case "C":
      return "cannon";
    case "A":
      return "advisor";
    case "B":
      return "bishop";
    case "P":
      return "pawn";
    default:
      return null;
  }
}

export function identifyPieceColor(letter:string):(typeof COLORS)[number] | null {
  if (parseInt(letter) === 1) {
    return null;
  } else if (letter === letter.toUpperCase()) {
    // is capital, i.e. is red
    return "red";
  } else {
    return "black";
  }
}

export function generateFenStringForRow(boardSquareRow:Square[]) {
  let fenCharForRow :string[] = [];
  boardSquareRow.forEach((boardSquare) => {
    if (boardSquare.piece === null) {
      if (typeof fenCharForRow[fenCharForRow.length - 1] === "number") {
        fenCharForRow[fenCharForRow.length - 1] += 1;
      } else {
        fenCharForRow.push("1");
      }
    } else {
      let letter;
      if (boardSquare.piece === "knight") {
        letter = "n";
      } else {
        letter = boardSquare.piece.split("")[0];
      }
      fenCharForRow.push(boardSquare.color === "red" ? letter.toUpperCase() : letter);
      return;
    }
  });
  const result = fenCharForRow.join('')
  return result;
}

export function generateFenFromBoardSquaresArray(boardSquaresArray: Square[][], currentTurn:typeof COLORS[number]) {
  const fenStringForEachRow = [];
  for(const row of boardSquaresArray){
    fenStringForEachRow.push(generateFenStringForRow(row))
  }
  const turnOrder = currentTurn === "red" ? "w" : "b";
  const finalFenString = `${fenStringForEachRow.join("/")} ${turnOrder}`;
  return finalFenString;
}