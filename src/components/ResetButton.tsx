import styles from './ResetButton.module.css'

export function ResetButton(props: { onClick: () => void }) {
  return (
    <button onClick={props.onClick} className={styles.resetButton}>
      &times;
    </button>
  )
}
