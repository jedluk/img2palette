import { useMemo, useState, useCallback } from 'react'
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

  const handleScaleElement = useCallback((angle: number) => {
    let intervalId: number | null = null

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.currentTarget
      let currentScale = 1

      intervalId = setInterval(() => {
        currentScale = Math.min(currentScale + 0.1, 2)
        target.style.transition = 'transform 0.2s'
        target.style.transform = `rotate(${angle}deg) scale(${currentScale})`
      }, 100)
    }

    const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      const target = e.currentTarget
      target.style.transform = `rotate(${angle}deg) scale(1)`
    }

    return {
      onMouseDown,
      onMouseUp,
      onMouseLeave: onMouseUp,
    }
  }, [])

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

          const { onMouseDown, onMouseUp, onMouseLeave } =
            handleScaleElement(angle)

          return (
            <div
              key={ral}
              className="ral-color"
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              style={{
                backgroundColor: hex,
                transform: `rotate(${angle}deg) scale(1)`,
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
