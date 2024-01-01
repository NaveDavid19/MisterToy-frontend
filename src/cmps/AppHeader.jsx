import { NavLink } from "react-router-dom"
import { UserMsg } from "./UserMsg.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "../services/user.service.js"
import { LoginSignup } from "./LoginSignup.jsx"
import { logout } from "../store/actions/user.actions.js"

export function AppHeader() {
  const dispatch = useDispatch()

  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )

  async function onLogout() {
    try {
      await logout()
    } catch (err) {
      showErrorMsg("OOPs try again")
    }
  }

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>MisterToy </h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/toy">Toys</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </section>
      {loggedinUser ? (
        <section>
          <span to={`/user/${loggedinUser._id}`}>
            Hello {loggedinUser.fullname}{" "}
            <span>${loggedinUser.score.toLocaleString()}</span>
          </span>
          <button onClick={onLogout}>Logout</button>
        </section>
      ) : (
        <section>
          <LoginSignup />
        </section>
      )}
      <UserMsg />
    </header>
  )
}
