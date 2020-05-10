import '../sass/main.scss'
import * as React from 'react';
import * as ReactDom from 'react-dom';

const WIDTH = 30;
const HEIGHT = 30;

enum Cell {
  Live,
  Die
}

const Hello: React.FC<{name: string}> = (props) => {
  // 2-dimensional array filled with Cell.Die
  const board: Cell[][] = new Array(HEIGHT).fill(new Array(WIDTH).fill(Cell.Die));

  return (
    <div>
      <h1>{props.name}</h1>
      {board.map((row, y) => {
        return(
          <div className={`row row--${y}`} key={y}>
            {row.map((cell, x) => {
              const cellNumber = y * WIDTH + x;

              return (
                <span className={`cell cell--${cellNumber}`} key={cellNumber}>{cell}</span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

ReactDom.render(
  <Hello name='lifegame' />, document.getElementById('root')
)
