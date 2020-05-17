import React, { useState } from 'react'
import { Life, Setting, SettingParams } from './interfaces'
import BoardField, { newBoard, WIDTH, HEIGHT } from './BoardField'

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

const findLifeById = (id: number): Life => lives.find((live) => live.id === id) || lives[0]

const Lifegame: React.FC = () => {
  const [setting, setSetting] = useState<Setting>({
    isRun: false,
    speedMs: 1,
    firstLifeId: 1
  })
  const firstLife = findLifeById(setting.firstLifeId)
  const [board, setBoard] = useState(newBoard(firstLife.poses))
  const updateSetting = (params: SettingParams): void => {
    if (params.firstLifeId) {
      const newLife = findLifeById(params.firstLifeId)
      setBoard(newBoard(newLife.poses))
    }

    const newSetting = { ...setting, ...params }
    setSetting(newSetting)
  }

  return (
    <div className="lifegame">
      <div className="setting">
        <button
          type="button"
          onClick={(): void => updateSetting({ isRun: !setting.isRun })}
        >
          {setting.isRun ? 'Pause' : 'Start'}
        </button>
        <input
          value={setting.speedMs}
          onChange={(e): void => updateSetting({ speedMs: Number(e.target.value) })}
          disabled={setting.isRun}
        />
        <select
          value={setting.firstLifeId}
          onChange={(e): void => updateSetting({ firstLifeId: Number(e.target.value) })}
          disabled={setting.isRun}
        >
          {lives.map((live) => <option value={live.id} key={live.id}>{live.name}</option>)}
        </select>
        <button
          type="button"
          onClick={(): void => setBoard(newBoard(firstLife.poses))}
          disabled={setting.isRun}
        >
          Reset
        </button>
      </div>

      <BoardField board={board} setBoard={setBoard} setting={setting} />
    </div>
  )
}
export default Lifegame
