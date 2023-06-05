// npm modules
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

// types
import { User } from "../../types/models";

// assets
import logo from '../../assets/logo.svg'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props;
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="nav-container">
      <div className="logo-container">
      <NavLink to="/">
        <img src={logo} alt="logo" className="nav-logo" />
      </NavLink>
      {user && <div className="user-welcome">Welcome, {user.name}</div>}
      </div>
      <ul className="nav-menu">
        {user ? (
          <>
            <li
              className={`nav-item dropdown ${expanded ? "expanded" : ""}`}
              onClick={handleToggle}
            >
              <div className="nav-icon">☰</div>
              {expanded && (
                <ul className="sub-menu">
                  <li className="nav-item">
                    <NavLink
                      to=""
                      className="dropdown-link"
                      onClick={handleLogout}
                    >
                      Log Out
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/auth/change-password"
                      className={`dropdown-link ${
                        isActive("/auth/change-password") ? "active" : ""
                      }`}
                    >
                      Change Password
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink
                to="/auth/login"
                className={() => (isActive("/auth/login") ? "active" : "")}
              >
                Log In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/auth/signup"
                className={() => (isActive("/auth/signup") ? "active" : "")}
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
