import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { adjustColorBrightness } from './lib/color'
import { PALLETE } from './lib/ral'

function App() {
  const [filter, setFiler] = useState('')
  const [spread, setSpread] = useState(270)

  const ralColors = useMemo(
    () =>
      filter !== ''
        ? Object.keys(PALLETE).filter((key) =>
            PALLETE[key][1].toLowerCase().includes(filter.toLowerCase())
          )
        : Object.keys(PALLETE),
    [filter]
  )

  const totalItems = ralColors.length
  const angleIncrement = spread / (totalItems - 1)

  useEffect(() => {
    const l = ralColors.length
    if (l < 5) {
      setSpread(20)
    } else if (l < 10) {
      setSpread(90)
    }
  }, [ralColors])

  useEffect(() => {
    if (filter === '') {
      setSpread(270)
    }
  }, [filter])

  return (
    <>
      <input
        className="input-modern"
        value={filter}
        onChange={(e) => setFiler(e.target.value)}
        placeholder="Search for a RAL color..."
      />
      <div className="box">
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
