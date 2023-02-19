import { useContext } from "react"
import { NavLink } from "react-router-dom"
import "./Nav.scss"
import AuthContext from "../../store/auth-context"
import MainContext from "../../store/main-context"

const Nav = ({ setShowMenu }) => {
  const authCtx = useContext(AuthContext)
  const mainCtx = useContext(MainContext)
  return (
    <nav>
      <ul className="nav" onClick={() => setShowMenu(false)}>
        {!authCtx.isLoggedIn && (
          <>
            <li className="nav__item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav__link nav__link--active" : "nav__link"
                }>
                login
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav__link nav__link--active" : "nav__link"
                }>
                register
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav__link nav__link--active" : "nav__link"
                }>
                about
              </NavLink>
            </li>
          </>
        )}
        {authCtx.isLoggedIn && (
          <>
            <li className="nav__item">
              <NavLink
                to={`/${mainCtx.user.username}/dashboard`}
                className={({ isActive }) =>
                  isActive ? "nav__link nav__link--active" : "nav__link"
                }>
                dashboard
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to={`/${mainCtx.user.username}/profile`}
                className={({ isActive }) =>
                  isActive ? "nav__link nav__link--active" : "nav__link"
                }>
                profile
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to={`/group/${mainCtx.currentGroup}`}
                className={({ isActive }) =>
                  isActive ? "nav__link nav__link--active" : "nav__link"
                }>
                group
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink className="nav__link" onClick={authCtx.logout}>
                logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Nav
