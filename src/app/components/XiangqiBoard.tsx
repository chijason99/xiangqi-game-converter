"use client";

import { useEffect, useState } from "react";
import BoardSquare from "../components/BoardSquare";
import { GameLogicApi } from "../utils/GameLogicApi";
import { Square } from "../utils/Square";

type XiangqiBoardProps = { gameInstance:GameLogicApi};

export default function XiangqiBoard({ gameInstance }: XiangqiBoardProps) {
  const width = gameInstance.getWidth()
  const [boardSquares, setBoardSquares] = useState<Square[][]>(gameInstance.getBoardSquares())
  const [clickOne, setClickOne] = useState<Square | null>(null)
  const [clickTwo, setClickTwo] = useState<Square | null>(null)

  useEffect(() => {
    if(clickOne != null && clickTwo != null){
      gameInstance.makeMove(clickOne,clickTwo)
      setBoardSquares(gameInstance.getBoardSquares())
      setClickOne(null);
      setClickTwo(null);
      return
    }
  }, [clickOne,clickTwo])

  function handleClickBoardSquare(e:React.MouseEvent){
    if(clickOne == null){
      const clickOneRow = parseInt(e.currentTarget.getAttribute("data-row") as string);
      const clickOneColumn = parseInt(e.currentTarget.getAttribute("data-column") as string);
      const clickOneSquare = gameInstance.getSquaresByCoordinates(clickOneRow,clickOneColumn) as Square
      setClickOne(clickOneSquare)
      return
    }else{
      const clickTwoRow = parseInt(e.currentTarget.getAttribute("data-row") as string);
      const clickTwoColumn = parseInt(e.currentTarget.getAttribute("data-column") as string);
      const clickTwoSquare = gameInstance.getSquaresByCoordinates(clickTwoRow,clickTwoColumn) as Square
      setClickTwo(clickTwoSquare)
    }
  }
  return (
    <div
      style={{ 
        width: `${width}px`,
        minWidth: `${width}px`,
      }}
      className={`mx-auto my-4 md:m-4 aspect-[9/10] bg-cover bg-[url("/xiangqi-pieces/test_board_3.png")] bg-center bg-no-repeat`}
    >
      {boardSquares.map((row, rowNumber) => {
        return (
          <div
            key={rowNumber}
            data-row={rowNumber}
            className="flex items-center"
          >
            {row.map(({ piece, color, column, row, id }) => {
              return (
                <BoardSquare
                  key={id}
                  handleClickBoardSquare = {handleClickBoardSquare}
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
