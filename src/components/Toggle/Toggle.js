import React, { useState } from 'react'

// Styles
import styles from './Toggle.module.scss';

// Utils
import {
  applyThemeLocale,
  getThemeLocale,
  setThemeLocale,
} from '../../utils/themeUtils'

export const Toggle = () => {
  const [theme, setTheme] = useState(getThemeLocale())

  return (
    <div
      className={styles['switch']}
      onClick={() => {
        setThemeLocale()
        applyThemeLocale()
        setTheme(getThemeLocale())
      }}
    >
      <div className={`${styles['slider']} ${theme === 'dark' ? styles['checked'] : ''}`}></div>
    </div>
  )
}