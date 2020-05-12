import '../sass/main.scss';
import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

const WIDTH = 100;
const HEIGHT = 100;

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

const initialBoard = (): Row[] => {
  const board: Row[] = [];

  for (let y = 0; y < HEIGHT; y += 1) {
    board[y] = { id: y, cells: [] };

    for (let x = 0; x < WIDTH; x += 1) {
      let status: CellStatus = CellStatus.Die;

      const xx = WIDTH / 2;
      const yy = HEIGHT / 2;
      if (x === xx && y === yy) {
        status = CellStatus.Live;
      } else if (x === (xx - 1) && y === yy) {
        status = CellStatus.Live;
      } else if (x === xx && y === (yy + 1)) {
        status = CellStatus.Live;
      } else if (x === xx && y === (yy + 2)) {
        status = CellStatus.Live;
      } else if (x === (xx + 1) && y === (yy + 1)) {
        status = CellStatus.Live;
      }

      board[y].cells[x] = {
        id: y * WIDTH + x,
        status,
      };
    }
  }

  return board;
};

const neighborhoods = (x: number, y: number): [number, number][] => {
  const pos: [number, number][] = [];

  if ((y - 1) > 0) {
    pos.push([x, y - 1]);
    if ((x - 1) > 0) pos.push([x - 1, y - 1]);
    if ((x + 1) < WIDTH) pos.push([x + 1, y - 1]);
  }
  if ((y + 1) < HEIGHT) {
    pos.push([x, y + 1]);
    if ((x - 1) > 0) pos.push([x - 1, y + 1]);
    if ((x + 1) < WIDTH) pos.push([x + 1, y + 1]);
  }
  if ((x - 1) > 0) pos.push([x - 1, y]);
  if ((x + 1) < WIDTH) pos.push([x + 1, y]);

  return pos;
};

const calcDeadOrAlive = (board: Row[], x: number, y: number): CellStatus => {
  const liveCount = neighborhoods(x, y).map(
    (pos: [number, number]) => board[pos[1]].cells[pos[0]].status,
  ).filter(
    (s) => s === CellStatus.Live,
  ).length;

  if (liveCount === 3) {
    return CellStatus.Live;
  }
  if (liveCount === 2 && board[y].cells[x].status === CellStatus.Live) {
    return CellStatus.Live;
  }
  return CellStatus.Die;
};

const nextBoard = (currentBoard: Row[]): Row[] => {
  const next: Row[] = [];

  for (let y = 0; y < HEIGHT; y += 1) {
    next[y] = { id: y, cells: [] };

    for (let x = 0; x < WIDTH; x += 1) {
      next[y].cells[x] = {
        id: y * WIDTH + x,
        status: calcDeadOrAlive(currentBoard, x, y),
      };
    }
  }

  return next;
};

const Board: React.FC = () => {
  const [board, setBoard] = useState(initialBoard);

  let timerId: ReturnType<typeof setTimeout> | null = null;
  useEffect(() => {
    timerId = setTimeout(() => {
      setBoard(nextBoard(board));
    }, 1);

    return (): void => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  });

  return (
    <div className="board-inner">
      {board.map((row, y) => (
        <div className={`row row--${y}`} key={row.id}>
          {row.cells.map((cell) => <span className={`cell cell__${cell.status} cell--${cell.id}`} key={cell.id} />)}
        </div>
      ))}
    </div>
  );
};

ReactDom.render(
  <Board />, document.getElementById('board'),
);
