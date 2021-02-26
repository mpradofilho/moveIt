import styles from '../styles/components/ChallengeBox.module.css'

function ChallengeBox () {
  const hasChallenge = true

  return (
    <div className={styles.challengesBoxContainer}>
      {hasChallenge
        ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 XP</header>
          <main>
            <img src="icons/body.svg" />
            <strong>Novo desafio</strong>
            <p>Levante e faça uma caminhada de 3 minutos.</p>
          </main>
          <footer>
            <button
              type="button"
            >
              Falhei
            </button>
            <button type="button">Completei</button>
          </footer>
        </div>
          )
        : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
              Avance de level completando desafios.
            </p>
          </div>
          )}
    </div>
  )
}

export default ChallengeBox
