import { useMemo, useState } from 'react'
import { PALLETE, RAL_GROUPS, adjustColorBrightness } from '../lib'
import { DraggableWrapper } from './DraggableWrapper'
import { RALGroupTabs } from './RALGroupTabs'

export function RALPallette() {
  const [spread, setSpread] = useState(270)
  const [selectedGroups, setSelectedGroups] = useState(RAL_GROUPS)

  const ralColors = useMemo(
    () =>
      Object.keys(PALLETE).filter((ral) =>
        selectedGroups.some((group) => ral.startsWith(group[0]))
      ),
    [selectedGroups]
  )

  const totalItems = ralColors.length
  const angleIncrement = spread / (totalItems - 1)

  return (
    <>
      <RALGroupTabs onGroupToggle={setSelectedGroups} />
      <DraggableWrapper initialPosition={{ x: 300, y: 300 }}>
        <div className="center-circle">
          <button onClick={() => setSpread(spread + 10)}>+</button>
          <button onClick={() => setSpread(spread - 10)}>-</button>
        </div>
        {ralColors.map((ral, idx) => {
          const [hex, name] = PALLETE[ral]
          const color = adjustColorBrightness(hex, 0.5)
          const angle = -spread / 2 + idx * angleIncrement

          return (
            <div
              key={ral}
              className="ral-color"
              style={{
                backgroundColor: hex,
                transform: `rotate(${angle}deg)`,
                top: 'calc(50% + 35px)',
                marginTop: '-75px',
              }}
            >
              <div className="colorName" style={{ color }}>
                {name} ({ral})
              </div>
            </div>
          )
        })}
      </DraggableWrapper>
    </>
  )
}
