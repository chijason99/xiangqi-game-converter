import { Board } from "./Board"
import { Game } from "./Game"
import { Square } from "./Square"
import { COLORS } from "./utils"

export class Player{
    constructor(name:string){
        this.name = name
    }
    name: string

    resign(game:Game){
        
    }

    makeMove(board:Board ,fromSquare:Square, toSquare:Square){}
}

export class RedPlayer extends Player{
    constructor(name:string){
        super(name)
        this.side = "red"
    }
    side: typeof COLORS[number]
}

export class BlackPlayer extends Player{
    constructor(name:string){
        super(name)
        this.side = "black"
    }
    side: typeof COLORS[number]
}