import '../sass/main.scss';
import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

const WIDTH = 30;
const HEIGHT = 30;

interface Cell {
  id: number;
  status: 'live' | 'die';
}

interface Row {
  id: number;
  cells: Cell[];
}

const Board: React.FC = () => {
  const [posX, setPosX] = useState(10);
  const [posY, setPosY] = useState(10);

  const board: Row[] = [];
  for (let y = 0; y < HEIGHT; y += 1) {
    board[y] = { id: y, cells: [] };
    for (let x = 0; x < WIDTH; x += 1) {
      board[y].cells[x] = {
        id: y * WIDTH + x,
        status: (y === posY && x === posX) ? 'live' : 'die',
      };
    }
  }

  let timerId: ReturnType<typeof setTimeout> | null = null;
  useEffect(() => {
    timerId = setTimeout(() => {
      const x = (posX + 1) % WIDTH;
      const y = (posY + 1) % HEIGHT;
      setPosX(x);
      setPosY(y);
    }, 100);

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
