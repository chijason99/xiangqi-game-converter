'use client'

import { COLORS, PIECE_NAMES } from "../utils/utils";
import Piece from "./Piece";
type SquareProps = {
  handleClickBoardSquare: (e:React.MouseEvent) => void;
  squareWidth: number;
  color: (typeof COLORS)[number] | null;
  piece: (typeof PIECE_NAMES)[number] | null;
  id: string;
  row: number;
  column: number;
};
export default function BoardSquare({
  handleClickBoardSquare,
  color,
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
      {piece != null && color != null ? (
        <Piece
          pieceColor={color}
          pieceName={piece}
          pieceWidth={squareWidth - 2}
        />
      ) : null}
    </div>
  );
}
