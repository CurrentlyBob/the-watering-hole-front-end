// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import PlantList from './pages/PlantList/PlantList'
import GardenList from './pages/Garden/GardenList'
// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'

// styles
import './App.css'

// types
import { User } from './types/models'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col">
        <NavBar user={user} handleLogout={handleLogout} />
        <div className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<Landing user={user} />} />
            <Route path="/auth/signup" element={<Signup handleAuthEvt={handleAuthEvt} />} />
            <Route path="/auth/login" element={<Login handleAuthEvt={handleAuthEvt} />} />
            <Route
              path="/api/plantlist"
              element={
                <ProtectedRoute user={user}>
                  <PlantList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/garden"
              element={
                <ProtectedRoute user={user}>
                  <GardenList />{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/change-password"
              element={
                <ProtectedRoute user={user}>
                  <ChangePassword handleAuthEvt={handleAuthEvt} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
