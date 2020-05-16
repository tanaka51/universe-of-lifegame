interface Pos {
  x: number;
  y: number;
}

interface Life {
  id: number;
  name: string;
  poses: Pos[];
}

interface Setting {
  isRun: boolean;
  speedMs: number;
  firstLifeId: number;
}

interface SettingParams {
  isRun?: boolean;
  speedMs?: number;
  firstLifeId?: number;
}

enum CellStatus {
  Live = 'live', Die = 'die'
}

interface Cell {
  id: number;
  status: CellStatus;
}

interface Row {
  id: number;
  cells: Cell[];
}

type Board = Row[];

export {
  Pos,
  Life,
  Setting,
  SettingParams,
  CellStatus,
  Cell,
  Row,
  Board
}
