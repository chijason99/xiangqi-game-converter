import { COLORS } from "./utils";

// this class is responsible for managing the state of the game
class GameState {
  constructor(
    turnOrder: typeof COLORS[number],
    round = 1,
    isGameOver = false
  ) {
    this.turnOrder = turnOrder;
    this.round = round;
    this.isGameOver = isGameOver;
  }
  turnOrder: "red" | "black";
  round: number;
  isGameOver: boolean;
}
