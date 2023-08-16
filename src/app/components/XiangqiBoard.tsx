"use client";
const INITIAL_FEN =
  "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w";
type XiangqiBoardProps = { fen?: string; width: number };
import Square from "../components/Square";
import { parseFen, validateFen } from "../utils/utils";
export default function XiangqiBoard({ fen, width }: XiangqiBoardProps) {
  const { boardPosition, turnOrder } =
    fen && validateFen(fen) ? parseFen(fen) : parseFen(INITIAL_FEN);
  return (
    <div
      style={{ 
        width: `${width}px`,
        minWidth: `${width}px`,
      }}
      className={`mx-auto my-4 md:m-4 aspect-[9/10] bg-cover bg-[url("/xiangqi-pieces/test_board_3.png")] bg-center bg-no-repeat`}
    >
      {boardPosition.map((row, rowNumber) => {
        return (
          <div
            key={rowNumber}
            data-row={rowNumber}
            className="flex items-center"
          >
            {row.map(({ piece, color, column, row, id }) => {
              return (
                <Square
                  key={id}
                  id={id}
                  row={row}
                  column={column}
                  color={color}
                  piece={piece}
                  squareWidth={width / 9}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
