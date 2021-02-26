import React from 'react'

import styles from '../styles/components/Profile.module.css'

function Profile () {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/mpradofilho.png" alt="Marcos Prado Filho"/>
      <div>
        <strong>Marcos</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}

export default Profile
