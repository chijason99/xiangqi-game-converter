"use client";

import XiangqiBoard from "../components/XiangqiBoard";
import { Game } from "../utils/Game";
import { Board } from "../utils/Board";
import { GameLogicApi } from "../utils/GameLogicApi";
import MoveList from "../components/MoveList";

const gameInstance = new GameLogicApi(
  new Game({
    turnOrder: "red",
    board: new Board({
      width: 360,
    }),
  })
);
gameInstance.init();

export default function () {
  return (
    <section className="flex justify-between">
      <div id="board-container">
        <XiangqiBoard gameInstance={gameInstance} />
      </div>
      <div id="move-list-container" className="flex-grow">
        <MoveList gameInstance={gameInstance} />
      </div>
    </section>
  );
}
