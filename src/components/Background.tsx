import { PALLETE, classNames } from '../lib'
import style from './Background.module.css'

export function Background(props: { animate: boolean }) {
  return (
    <div className={style.background}>
      {Object.values(PALLETE).map(([hex, name]) => (
        <div
          key={name}
          className={classNames(style.item, props.animate ? style.animate : '')}
          style={{ backgroundColor: hex }}
        />
      ))}
    </div>
  )
}
