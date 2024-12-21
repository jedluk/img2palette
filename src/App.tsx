import './App.css'
import { adjustColorBrightness } from './lib/color'
import { PALLETE } from './lib/ral'

function App() {
  return (
    <>
      <h1>img2ral</h1>
      <div className="box">
        {Object.keys(PALLETE).map((ral, idx) => {
          const [hex, name] = PALLETE[ral]
          const color = adjustColorBrightness(hex, 0.5)

          return (
            <div
              key={ral}
              className="ral"
              style={{
                backgroundColor: hex,
                top: idx,
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
