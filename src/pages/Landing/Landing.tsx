// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <div>
      <p className="text-2xl">Hello, {user ? user.name : 'friend'}</p>
    </div>
  )
}

export default Landing
