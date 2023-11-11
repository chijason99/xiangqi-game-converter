import Image from 'next/image';
import { PIECE_NAMES, COLORS } from '../utils/utils';

type PieceProps = {
  pieceName: typeof PIECE_NAMES[number];
  pieceColor: typeof COLORS[number];
  pieceWidth:number
};

export default function Piece({ pieceColor, pieceName, pieceWidth }: PieceProps) {
  return (
    <Image
      src={`/xiangqi-pieces/${pieceColor}_${pieceName}.png`}
      alt={`A picture of a ${pieceColor} ${pieceName}`}
      width={pieceWidth}
      height={pieceWidth}
      className='text-center hover:cursor-pointer'
    />
  );
}
