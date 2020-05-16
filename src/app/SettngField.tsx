import React from 'react'
import { Life, Setting, SettingParams } from './interfaces'

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

export default SettingField
