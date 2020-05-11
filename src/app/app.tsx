import '../sass/main.scss';
import React from 'react';
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
  const board: Row[] = [];
  for (let y = 0; y < HEIGHT; y += 1) {
    board[y] = { id: y, cells: [] };
    for (let x = 0; x < WIDTH; x += 1) {
      board[y].cells[x] = {
        id: y * WIDTH + x,
        status: 'die',
      };
    }
  }

  board[10].cells[10] = { ...board[10].cells[10], status: 'live' };

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
