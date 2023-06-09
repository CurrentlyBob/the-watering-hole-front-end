// types
import logo from '../../assets/logo.svg'
import styles from './Landing.module.css'

const Landing = (): JSX.Element => {
  return (
    <main className={styles.container}>
      <h1>
        The Watering
        <br /> Hole
      </h1>
      <img src={logo} alt="The Sweet Logo" />
    </main>
  )
}

export default Landing
