import { useMemo, useState } from 'react'
import './App.css'
import { adjustColorBrightness } from './lib/color'
import { PALLETE } from './lib/ral'

function App() {
  const [filter, setFiler] = useState('')

  const ralColors = useMemo(
    () =>
      filter !== ''
        ? Object.keys(PALLETE).filter((key) =>
            PALLETE[key][1].toLowerCase().includes(filter.toLowerCase())
          )
        : Object.keys(PALLETE),
    [filter]
  )

  const totalSpread = 300
  const totalItems = ralColors.length
  const angleIncrement = totalSpread / (totalItems - 1)

  return (
    <>
      <input
        className="input-modern"
        value={filter}
        onChange={(e) => setFiler(e.target.value)}
        placeholder="search for color"
      />
      <div className="box">
        <div className="center-circle"></div>
        {ralColors.map((ral, idx) => {
          const [hex, name] = PALLETE[ral]
          const color = adjustColorBrightness(hex, 0.5)
          const angle = -totalSpread / 2 + idx * angleIncrement

          return (
            <div
              key={ral}
              className="ral"
              style={{
                backgroundColor: hex,
                transform: `rotate(${angle}deg)`,
                top: '50%',
                marginTop: '-75px', // half of the new height to center it
              }}
            >
              <div className="colorName" style={{ color }}>
                {name}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
