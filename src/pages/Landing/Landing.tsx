// types
import { User } from '../../types/models'
import logo from '../../assets/logo.svg'
import styles from './Landing.module.css'

interface LandingProps {
  user: User | null
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

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
