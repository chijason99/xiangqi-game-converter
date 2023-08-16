import { COLORS, PIECE_NAMES, Square } from "../utils/utils"
import Piece from "./Piece"
type SquareProps = {
  squareWidth:number,
  color: typeof COLORS[number] | null,
  piece: typeof PIECE_NAMES[number] | null,
  id: string,
  row:number,
  column:number
}
export default function Square({color,piece,squareWidth}:SquareProps) {
  return (
    <div className={`inline-block hover:border-yellow-200 hover:border-solid hover:border-4`} style={{width:squareWidth,height:squareWidth}}>
      {piece != null && color != null ? <Piece pieceColor={color} pieceName={piece} pieceWidth={squareWidth - 2} /> : null}
    </div>
  )
}
