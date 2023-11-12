import { Game, Observer } from "./Game";
import { Square } from "./Square";

export class GameLogicApi {
  constructor(gameInstance: Game) {
    this.gameInstance = gameInstance;
    this.width = gameInstance.board.width;
  }
  private gameInstance: Game;
  width: number;

  makeMove(fromSquare: Square, toSquare: Square): void {
    this.gameInstance.makeMove(fromSquare,toSquare)
    this.notifyAllObservers()
    return
  }

  init() {
    return this.gameInstance.startGame();
  }

  getLastMove(){
    return this.gameInstance.moves[this.gameInstance.moves.length - 1]
  }

  getMoves() {
    return [...this.gameInstance.moves]
  }

  getWidth() {
    return this.width;
  }
  getRedPlayer() {
    return this.gameInstance.redPlayer;
  }

  getBlackPlayer() {
    return this.gameInstance.blackPlayer;
  }

  getTurnOrder() {
    return this.gameInstance.turnOrder;
  }

  getSquaresByCoordinates(row: number, column: number) {
    return this.gameInstance.board.getSquareByCoordinates(this.getBoardSquares(),row, column);
  }

  getBoardSquares() {
    return [...this.gameInstance.board.squares];
  }

  getCurrentRound(){
    return this.gameInstance.round
  }

  getCurrentFen() {
    return this.gameInstance.board.currentFen;
  }

  randomPosition(fen: string) {
    return this.gameInstance.board.setUpBoardPosition(fen);
  }

  showFenFromSquares() {
    console.log(
      this.gameInstance.board.generateFenFromPosition(
        this.gameInstance.board.squares,
        this.gameInstance.turnOrder
      )
    );
  }

  navigateThroughPreviousMoves(index:number){
    const allMoves = this.getMoves();
    
    if(allMoves.length === 0) return

    const {fen} = allMoves[index];

    this.gameInstance.board.setUpBoardPosition(fen)

    this.notifyObserver("board")
  }

  addObserver(observer : Observer){
    this.gameInstance.observers.push(observer)
  }

  removeObserver(observer: Observer){
    this.gameInstance.observers.filter(obs => obs !== observer)
  }

  notifyAllObservers(){
    this.gameInstance.observers.forEach(observer => observer.update())
  }

  notifyObserver(type:string){
    this.gameInstance.observers.forEach(observer => {
      if(type != null && observer.type === type){
        observer.update()
      }
    })
  }
}
