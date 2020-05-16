import '../sass/main.scss'
import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

const WIDTH = 100
const HEIGHT = 100

enum CellStatus {
  Live = 'live', Die = 'die'
}

interface Pos {
  x: number;
  y: number;
}

interface Life {
  id: number;
  name: string;
  poses: Pos[];
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

const Board: React.FC<{
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

const SettingField: React.FC<{
  lives: Life[];
  setting: Setting;
  setSetting: (params: SettingParams) => void;
}> = (props) => {
  const { lives, setting, setSetting } = props

  return (
    <div className="setting">
      <button
        type="button"
        onClick={(): void => setSetting({ isRun: !setting.isRun })}
      >
        {setting.isRun ? 'Pause' : 'Start'}
      </button>
      <input
        value={setting.speedMs}
        onChange={(e): void => setSetting({ speedMs: Number(e.target.value) })}
        disabled={setting.isRun}
      />
      <select
        value={setting.firstLifeId}
        onChange={(e): void => setSetting({ firstLifeId: Number(e.target.value) })}
        disabled={setting.isRun}
      >
        {lives.map((live) => <option value={live.id} key={live.id}>{live.name}</option>)}
      </select>
    </div>
  )
}

const Lifegame: React.FC = () => {
  const halfWidth = WIDTH / 2
  const halfHeight = HEIGHT / 2
  const lives: Life[] = [
    {
      id: 1,
      name: 'R pentomino(F pentmino)',
      poses: [
        { x: halfWidth, y: halfHeight },
        { x: halfWidth - 1, y: halfHeight },
        { x: halfWidth, y: halfHeight + 1 },
        { x: halfWidth, y: halfHeight + 2 },
        { x: halfWidth + 1, y: halfHeight + 1 }
      ]
    },
    {
      id: 2,
      name: 'blinker',
      poses: [
        { x: halfWidth, y: halfHeight },
        { x: halfWidth - 1, y: halfHeight },
        { x: halfWidth + 1, y: halfHeight }
      ]
    },
    {
      id: 3,
      name: 'T tetromino',
      poses: [
        { x: halfWidth, y: halfHeight },
        { x: halfWidth - 1, y: halfHeight },
        { x: halfWidth + 1, y: halfHeight },
        { x: halfWidth, y: halfHeight + 1 }
      ]
    }
  ]
  const [setting, setSetting] = useState<Setting>({
    isRun: false,
    speedMs: 1,
    firstLifeId: 1
  })
  const firstLife = lives.find((live) => live.id === setting.firstLifeId) || lives[0]
  const [board, setBoard] = useState(newBoard(firstLife.poses))
  const updateSeting = (params: SettingParams): void => {
    if (params.firstLifeId) {
      const newLife = lives.find((live) => live.id === params.firstLifeId) || lives[0]
      setBoard(newBoard(newLife.poses))
    }

    const newSetting = { ...setting, ...params }
    setSetting(newSetting)
  }

  return (
    <div className="lifegame">
      <SettingField lives={lives} setting={setting} setSetting={updateSeting} />
      <Board board={board} setBoard={setBoard} setting={setting} />
    </div>
  )
}

ReactDom.render(
  <Lifegame />, document.getElementById('board')
)
