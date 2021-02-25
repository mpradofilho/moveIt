import styles from '../styles/components/Countdown.module.css';

function Countdown() {
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>1</span>
          <span>1</span>
        </div>
        <span>:</span>
        <div>
          <span>2</span>
          <span>2</span>
        </div>
      </div>
      <button type="button" className={styles.countdownBtn}>
        Iniciar um ciclo
      </button>
    </div>
  )
}

export default Countdown
