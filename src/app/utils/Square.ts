import { Piece } from "./Pieces/Piece";
export class Square {
  constructor({
    id,
    piece = null,
    row,
    column,
  }: {
    id: string;
    piece: Piece | null;
    row: number;
    column: number;
  }) {
    this.id = id;
    this.piece = piece
    this.row = row
    this.column = column
  }

  id: string;
  piece: Piece | null;
  row: number;
  column: number;
}
