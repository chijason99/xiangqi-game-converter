import { COLORS, PIECE_NAMES } from "./utils";

export type Square = {
    id: string;
    piece: (typeof PIECE_NAMES)[number] | null;
    color: (typeof COLORS)[number] | null;
    row: number;
    column: number;
  };