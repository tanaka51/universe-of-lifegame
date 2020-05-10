import '../sass/main.scss'
import * as React from 'react';
import * as ReactDom from 'react-dom';

const WIDTH = 30;
const HEIGHT = 30;

enum Cell {
  Live = 'live',
  Die = 'die'
}

const Board: React.FC = () => {
  const board: Cell[][] = [];
  for (let y = 0; y < HEIGHT; y++) {
    board[y] = [];
    for (let x = 0; x < WIDTH; x++) {
      board[y][x] = Cell.Die;
    }
  }

  board[10][10] = Cell.Live;

  return (
    <div className="board-inner">
      {board.map((row, y) => {
        return(
          <div className={`row row--${y}`} key={y}>
            {row.map((cell, x) => {
              const cellNumber = y * WIDTH + x;

              return (
                <span className={`cell cell__${cell} cell--${cellNumber}`} key={cellNumber}></span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

ReactDom.render(
  <Board />, document.getElementById('board')
)
