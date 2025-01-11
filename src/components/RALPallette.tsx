import { useEffect, useState } from 'react'
import { PALLETE, adjustColorBrightness } from '../lib'

export function RALPallette() {
  const [spread, setSpread] = useState(270)

  const ralColors = Object.keys(PALLETE)

  useEffect(() => {
    const l = ralColors.length
    if (l < 5) {
      setSpread(20)
    } else if (l < 10) {
      setSpread(90)
    }
  }, [ralColors])

  const totalItems = ralColors.length
  const angleIncrement = spread / (totalItems - 1)

  return (
    <div className="ral-pallette">
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
              {name} ({ral.slice(4)})
            </div>
          </div>
        )
      })}
    </div>
  )
}
