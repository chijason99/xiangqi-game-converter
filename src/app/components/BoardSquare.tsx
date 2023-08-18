'use client'

import { Piece as PieceClass } from "../utils/Pieces/Piece";
import { COLORS, PIECE_NAMES } from "../utils/utils";
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
  );
}
