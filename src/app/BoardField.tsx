import React, { useEffect } from 'react'
import {
  Board, CellStatus, Pos, Setting
} from './interfaces'

const WIDTH = 100
const HEIGHT = 100

const newBoard = (poses: Pos[] = []): Board => {
  const board: Board = []

  for (let y = 0; y < HEIGHT; y += 1) {
    board[y] = { id: y, cells: [] }

    for (let x = 0; x < WIDTH; x += 1) {
      const status: CellStatus = poses.some(
        (pos) => pos.x === x && pos.y === y
      ) ? CellStatus.Live : CellStatus.Die

      board[y].cells[x] = {
        id: y * WIDTH + x,
        status
      }
    }
  }

  return board
}

const neighborhoods = (x: number, y: number): Pos[] => {
  const poses: Pos[] = []

  if ((y - 1) > 0) {
    poses.push({ x, y: y - 1 })
    if ((x - 1) > 0) poses.push({ x: x - 1, y: y - 1 })
    if ((x + 1) < WIDTH) poses.push({ x: x + 1, y: y - 1 })
  }
  if ((y + 1) < HEIGHT) {
    poses.push({ x, y: y + 1 })
    if ((x - 1) > 0) poses.push({ x: x - 1, y: y + 1 })
    if ((x + 1) < WIDTH) poses.push({ x: x + 1, y: y + 1 })
  }
  if ((x - 1) > 0) poses.push({ x: x - 1, y })
  if ((x + 1) < WIDTH) poses.push({ x: x + 1, y })

  return poses
}

const calcDeadOrAlive = (board: Board, x: number, y: number): CellStatus => {
  const liveCount = neighborhoods(x, y).map(
    (pos: Pos) => board[pos.y].cells[pos.x].status
  ).filter(
    (s) => s === CellStatus.Live
  ).length

  if (liveCount === 3) {
    return CellStatus.Live
  }
  if (liveCount === 2 && board[y].cells[x].status === CellStatus.Live) {
    return CellStatus.Live
  }
  return CellStatus.Die
}

const nextBoard = (currentBoard: Board): Board => {
  const next: Board = []

  for (let y = 0; y < HEIGHT; y += 1) {
    next[y] = { id: y, cells: [] }

    for (let x = 0; x < WIDTH; x += 1) {
      next[y].cells[x] = {
        id: y * WIDTH + x,
        status: calcDeadOrAlive(currentBoard, x, y)
      }
    }
  }

  return next
}

const BoardField: React.FC<{
  board: Board;
  setBoard: (b: Board) => void;
  setting: Setting;
}> = (props) => {
  const { board, setBoard, setting } = props

  let timerId: ReturnType<typeof setTimeout> | null = null
  useEffect(() => {
    if (setting.isRun) {
      timerId = setTimeout(() => {
        setBoard(nextBoard(board))
      }, setting.speedMs)
    }

    return (): void => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  })

  return (
    <div className="board-inner">
      {board.map((row, y) => (
        <div className={`row row--${y}`} key={row.id}>
          {row.cells.map((cell) => <span className={`cell cell__${cell.status} cell--${cell.id}`} key={cell.id} />)}
        </div>
      ))}
    </div>
  )
}

export default BoardField
export {
  newBoard,
  WIDTH,
  HEIGHT
}
