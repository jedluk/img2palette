import { PALLETE, classNames } from '../lib'
import style from './Background.module.css'

export function Background(props: { animate: boolean }) {
  return (
    <div
      className={classNames(
        style.background,
        !props.animate ? style.noAnimation : ''
      )}
    >
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
