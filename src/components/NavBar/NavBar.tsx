// npm modules
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'

// types
import { User } from '../../types/models'

// assets
import logo from '../../assets/logo.svg'

interface NavBarProps {
  user: User | null
  handleLogout: () => void
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  const location = useLocation()
  const [expanded, setExpanded] = useState(false)

  const isActive = (path: string): boolean => {
    return location.pathname === path
  }

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <nav className="flex items-center justify-between bg-green-500 p-3 w-full ">
      <div className="flex items-center">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-16 h-16 mr-2" />
        </NavLink>
        {user && <div className="text-white">Welcome, {user.name}</div>}
      </div>
      <div className="flex items-center">
        {user && (
          <>
            <NavLink
              to="/api/plantlist"
              className={`px-4 py-2 rounded text-white ${isActive('/api/plantlist') ? 'bg-green-700' : ''}`}
            >
              All Plants
            </NavLink>
            <NavLink
              to="/api/garden"
              className={`px-4 py-2 rounded text-white ${isActive('/api/garden') ? 'bg-green-700' : ''}`}
            >
              Your Garden
            </NavLink>
            <div className={`relative ${expanded ? 'group' : ''}`} onClick={handleToggle}>
              <div className="px-4 py-2 cursor-pointer text-white">☰</div>
              {expanded && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <NavLink
                      to=""
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Log Out
                    </NavLink>
                    <NavLink
                      to="/auth/change-password"
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                        isActive('/auth/change-password') ? 'bg-gray-200' : ''
                      }`}
                    >
                      Change Password
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {!user && (
          <>
            <NavLink
              to="/auth/login"
              className={`px-4 py-2 rounded text-white ${isActive('/auth/login') ? 'bg-green-700' : ''}`}
            >
              Log In
            </NavLink>
            <NavLink
              to="/auth/signup"
              className={`px-4 py-2 rounded text-white ${isActive('/auth/signup') ? 'bg-green-700' : ''}`}
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
