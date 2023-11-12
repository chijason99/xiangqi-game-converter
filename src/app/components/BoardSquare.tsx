'use client'

import { Piece as PieceClass } from "../utils/Pieces/Piece";
import Piece from "./Piece";
type SquareProps = {
  handleClickBoardSquare: (e:React.MouseEvent) => void;
  squareWidth: number;
  piece: PieceClass | null
  id: string;
  row: number;
  column: number;
};
export default function BoardSquare({
  handleClickBoardSquare,
  piece,
  squareWidth,
  row,
  column,
}: SquareProps) {  
  return (
    <>
      <div
        className={`inline-block hover:border-yellow-200 hover:border-solid hover:border-4`}
        style={{ width: squareWidth, height: squareWidth }}
        data-row = {row}
        data-column = {column}
        onClick={(e) => handleClickBoardSquare(e)}
      >
        {piece != null ? (
          <Piece
            pieceColor={piece.getPieceColor()}
            pieceName={piece.getPieceName()}
            pieceWidth={squareWidth - 2}
          />
        ) : null}
      </div>
      {/* another div of same size for styling

      reference : https://stackoverflow.com/questions/14387690/how-can-i-show-only-corner-borders
      <div
      style={{
        display:"none",
        width: `${squareWidth - 5}px`, 
        height: `${squareWidth - 5}px`,   
        position: "absolute",
        top:"9px",
        left:"9px",
        backgroundColor:`white`,
        border:"1px solid black"}}
      >
      </div> */}
    </>
  );
}
