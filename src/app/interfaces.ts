export interface Pos {
  x: number;
  y: number;
}

export interface Life {
  id: number;
  name: string;
  poses: Pos[];
}

export interface Setting {
  isRun: boolean;
  speedMs: number;
  firstLifeId: number;
}

export interface SettingParams {
  isRun?: boolean;
  speedMs?: number;
  firstLifeId?: number;
}

export enum CellStatus {
  Live = 'live', Die = 'die'
}

export interface Cell {
  id: number;
  status: CellStatus;
}

export interface Row {
  id: number;
  cells: Cell[];
}

export type Board = Row[];
