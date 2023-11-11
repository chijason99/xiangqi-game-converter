import React from 'react'
import { GameLogicApi } from '../utils/GameLogicApi'
type MoveListProps = {
    gameInstance: GameLogicApi
}
export default function MoveList({gameInstance}:MoveListProps) {
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
                gameInstance.getMoves().map((move) => {
                  return (
                  <tr>
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
