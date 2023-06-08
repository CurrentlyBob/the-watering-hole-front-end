// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './Login.module.css'

// types
import { AuthPageProps } from '../../types/props'
import { LoginFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const LoginPage = (props: AuthPageProps): JSX.Element => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const { email, password } = formData

  const isFormInvalid = (): boolean => {
    return !(email && password)
  }

  return (
    <main className='flex flex-col items-center justify-center h-screen bg-gray-800 p-4'>
      <h1 className='text-4xl text-green-500 mb-5'>Log In</h1>
      <p className='text-lg text-red-600 mb-4'>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className='flex flex-col w-full max-w-md'>
        <div className='flex flex-col items-center mb-2'>
        <label className='text-white'></label>
          Email
          <input type="text" value={email} name="email" onChange={handleChange} className='bg-gray-700 text-white p-2 rounded w-2/3' />
        </div>
        <div className='flex flex-col items-center mb-2'>
        <label className='text-white'></label>
          Password
          <input type="password" value={password} name="password" onChange={handleChange} className='bg-gray-700 text-white p-2 rounded w-2/3' />
        </div>
        <div className='flex flex-col items-center mt-4'>
          <Link to="/" className='text-green-500 hover:text-green-300'>Cancel</Link>
          <button className='btn px-4 py-2 rounded bg-green-500 text-white' disabled={isFormInvalid()}>
            Log In
          </button>
        </div>
      </form>
    </main>
  )
}

export default LoginPage
