import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

function Countdown () {
  const {
    hasFinished,
    isActive,
    minutes,
    resetCountdown,
    seconds,
    startCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished
        ? (
        <button
          disabled
          className={styles.countdownBtn}
        >
          Ciclo encerrado
        </button>
          )
        : (
          <>
            { isActive
              ? (
              <button
                type="button"
                className={`${styles.countdownBtn} ${styles.countdownBtnActive}`}
                onClick={resetCountdown}
              >
                Abandonar Ciclo
              </button>
                )
              : (
                <button
                  type="button"
                  className={styles.countdownBtn}
                  onClick={startCountdown}
                >
                  Iniciar um ciclo
                </button>
                )}
          </>
          )}
    </div>
  )
}

export default Countdown
