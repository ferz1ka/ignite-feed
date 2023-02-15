import logo from '../assets/logo.svg'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} />
      <h2>Ignite Feed</h2>
    </header>
  )
}