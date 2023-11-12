import React, { useEffect, useState } from 'react'
import { GameLogicApi } from '../utils/GameLogicApi'
import { Move, Observer } from '../utils/Game'
import Button from './Button'
type MoveListProps = {
    gameInstance: GameLogicApi
}
export default function MoveList({gameInstance}:MoveListProps) {
  const [moveList, setMoveList] = useState<Move[]>([])
  const [currentSelectedMoveIndex, setCurrentSelectedMoveIndex] = useState<number>(0)
  const [prevButtonEnabled, setPrevButtonEnabled] = useState<boolean>(false)
  const [nextButtonEnabled, setNextButtonEnabled] = useState<boolean>(false)

  useEffect(() => {
    const observer: Observer = {
      type: "moveList",
      update(){
        const allMoves = gameInstance.getMoves();
        setMoveList(allMoves)
        setCurrentSelectedMoveIndex(allMoves.length - 1)
      }
    }

    gameInstance.addObserver(observer)
  
    return () => {
      gameInstance.removeObserver(observer)
    }
  }, [])
  
  useEffect(() => {
    const numberOfMoves = gameInstance.getMoves().length

    if(currentSelectedMoveIndex === 0 || numberOfMoves <= 1){
      setPrevButtonEnabled(false)
    }else{
      setPrevButtonEnabled(true)

    }

    if(currentSelectedMoveIndex === gameInstance.getMoves().length - 1 || numberOfMoves <= 1){
      setNextButtonEnabled(false)
    }else{
      setNextButtonEnabled(true)
    }

    gameInstance.navigateThroughPreviousMoves(currentSelectedMoveIndex)
  },[currentSelectedMoveIndex])

  function handleNavigateThroughPreviousMovesByClick(e:React.MouseEvent){
    const selectedMoveIndex = parseInt(e.currentTarget.getAttribute("data-index") as string)
    setCurrentSelectedMoveIndex(selectedMoveIndex)
  }

  function handleNavigateThroughPreviousMovesByPrevButton(){
    if(currentSelectedMoveIndex === 0) return;
    setCurrentSelectedMoveIndex(prevIndex => prevIndex - 1)
  }

  function handleNavigateThroughPreviousMovesByNextButton(){
    if(currentSelectedMoveIndex === gameInstance.getMoves().length - 1) return;
    setCurrentSelectedMoveIndex(prevIndex => prevIndex + 1)
  }
  return (
    <section style={{width: `200px`, height: `400px`}}>
    <div style={{height : `${gameInstance.getWidth()*10/9}px`, width: `min-content` }} className='overflow-y-auto' >
        <table className='table-fixed overflow-y-auto' style={{width: `200px`}}>
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
                  <tr key={index} className={`cursor-pointer ${index === currentSelectedMoveIndex ? "bg-blue-600" : ""}`} data-index={index} onClick={e => handleNavigateThroughPreviousMovesByClick(e)}>
                    <td className='text-center p-2 max-h-4 min-h-4 '>
                      {move.movedPiece.getPieceColor() === "red" ? move.round : ""}
                    </td>
                    <td className='text-center p-2 max-h-4 min-h-4 '>
                      {move.moveNotation}
                    </td>
                  </tr>)
                })
              }
          </tbody>
        </table>
    </div>
    <div className='flex items-center justify-between mt-2'>
          <button onClick={handleNavigateThroughPreviousMovesByPrevButton} disabled = {!prevButtonEnabled}>Prev</button>
          <button onClick={handleNavigateThroughPreviousMovesByNextButton} disabled = {!nextButtonEnabled}>Next</button>
    </div>
    </section>
  )
}
