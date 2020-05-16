import React, { useState } from 'react'
import { Life, Setting, SettingParams } from './interfaces'
import SettingField from './SettngField'
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

const Lifegame: React.FC = () => {
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
      <BoardField board={board} setBoard={setBoard} setting={setting} />
    </div>
  )
}
export default Lifegame
