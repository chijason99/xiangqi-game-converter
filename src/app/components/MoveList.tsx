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
    <div>
        Move List table
        <table className='w-full'>
          <thead>
            <tr>
              <th>Round</th>
              <th>Red</th>
              <th>Black</th>
            </tr>
          </thead>
          <tbody>
              {
                moveList.map((move,index) => {
                  return (
                  <tr key={index}>
                    <td>
                      {move.fen}
                    </td>
                    <td>
                      test
                    </td>
                    <td>
                      test
                    </td>
                  </tr>)
                })
              }
          </tbody>
        </table>
    </div>
  )
}
