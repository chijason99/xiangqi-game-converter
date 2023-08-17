import { Game } from "./Game";
import { Square } from "./Square";

export class GameLogicApi{
    constructor(gameInstance:Game){
        this.gameInstance = gameInstance
        this.width = gameInstance.board.width
    }
    private gameInstance: Game
    width:number

    makeMove( fromSquare:Square, toSquare:Square){
        this.gameInstance.board.movePiece(fromSquare,toSquare)
        this.gameInstance.board.generateFenFromPosition(this.gameInstance.board.squares, this.gameInstance.turnOrder)
        this.showFenFromSquares()
    }
    init(){
        return this.gameInstance.startGame()
    }

    getWidth(){
        return this.width
    }
    getRedPlayer(){
        return this.gameInstance.redPlayer;
    }

    getBlackPlayer(){
        return this.gameInstance.blackPlayer;
    }

    getSquaresByCoordinates(row:number,column:number){
        return this.gameInstance.board.getSquareByCoordinates(row,column)
    }

    getBoardSquares(){
        return this.gameInstance.board.squares
    }

    getCurrentFen(){
        return this.gameInstance.board.currentFen
    }

    randomPosition(fen:string){
        return this.gameInstance.board.setUpBoardPosition(fen)
    }

    showFenFromSquares(){
        console.log(this.gameInstance.board.generateFenFromPosition(this.gameInstance.board.squares, this.gameInstance.turnOrder))
    }
}