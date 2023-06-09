// npm modules
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// types
import { SignupFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'
import { AuthPageProps } from '../../types/props'

const Signup = (props: AuthPageProps): JSX.Element => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()
  const imgInputRef = useRef<HTMLInputElement | null>(null)

  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ''
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = 'Image must be smaller than 10.4MB'
      isFileInvalid = true
    }
    if (photoFormat && !validFormats.includes(photoFormat)) {
      errMsg = 'Image must be in gif, jpeg/jpg, png, svg, or webp format'
      isFileInvalid = true
    }

    setMessage(errMsg)

    if (isFileInvalid && imgInputRef.current) {
      imgInputRef.current.value = ''
      return
    }

    setPhotoData({ photo: evt.target.files[0] })
  }

  const { name, email, password, passwordConf } = formData

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      await authService.signup(formData, photoData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-800 p-4">
      <h1 className="text-4xl text-green-500 mb-5">Sign Up</h1>
      <p className="text-lg text-red-600 mb-4">{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col w-full max-w-md ">
        <div className="flex flex-col items-center mb-2">
          <label className="text-white">Name</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
            className="bg-gray-700 text-white p-2 rounded w-2/3"
          />
        </div>
        <div className="flex flex-col items-center mb-2">
          <label className="text-white">Email</label>
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
            className="bg-gray-700 text-white p-2 rounded w-2/3"
          />
        </div>
        <div className="flex flex-col items-center mb-2">
          <label className="text-white">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            className="bg-gray-700 text-white p-2 rounded w-2/3"
          />
        </div>
        <div className="flex flex-col items-center mb-2">
          <label className="text-white">Confirm Password</label>
          <input
            type="password"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            className="bg-gray-700 text-white p-2 rounded w-2/3"
          />
        </div>
        <div className="flex flex-col items-center mb-2">
          <label className="text-white">Upload Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChangePhoto}
            ref={imgInputRef}
            className="bg-gray-700 text-white p-2 rounded w-2/3"
          />
        </div>
        <div className="flex flex-col items-center mt-4">
          <Link to="/" className="text-green-500 hover:text-green-300">
            Cancel
          </Link>
          <button
            className="btn px-4 py-2 rounded bg-green-500 text-white disabled:opacity-50"
            disabled={isFormInvalid() || isSubmitted}
          >
            {!isSubmitted ? 'Sign Up' : '🚀 Sending...'}
          </button>
        </div>
      </form>
    </main>
  )
}

export default Signup
