import { PALLETE } from './lib/ral'
import style from './Background.module.css'

export function Background() {
  return (
    <div className={style.background}>
      {Object.values(PALLETE).map(([hex, name]) => (
        <div
          key={name}
          className={style.item}
          style={{ backgroundColor: hex }}
        />
      ))}
    </div>
  )
}
