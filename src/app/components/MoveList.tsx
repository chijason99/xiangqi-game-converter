import React, { useEffect, useState } from 'react'
import { GameLogicApi } from '../utils/GameLogicApi'
import { Move, Observer } from '../utils/Game'
type MoveListProps = {
    gameInstance: GameLogicApi
}
export default function MoveList({gameInstance}:MoveListProps) {
  const [moveList, setMoveList] = useState<Move[]>([])

  useEffect(() => {
    const observer: Observer = {
      update(){
        setMoveList(gameInstance.getMoves())
      }
    }

    gameInstance.addObserver(observer)
  
    return () => {
      gameInstance.removeObserver(observer)
    }
  }, [])
  

  return (
    <div style={{height : `${gameInstance.getWidth()*10/9}px`, width: `min-content` }} className='overflow-y-auto' >
        <h2 className='text-center'>Move List table</h2>
        <table className='table-fixed' style={{width: `200px`}}>
          <thead>
            <tr>
              <th>Round</th>
              <th>Moves</th>
            </tr>
          </thead>
          <tbody>
              {
                moveList.map((move,index) => {
                  return (
                  <tr key={index}>
                    <td className='text-center'>
                      {move.movedPiece.getPieceColor() === "red" ? move.round : ""}
                    </td>
                    <td className='text-center'>
                      {move.moveNotation}
                    </td>
                  </tr>)
                })
              }
          </tbody>
        </table>
    </div>
  )
}
