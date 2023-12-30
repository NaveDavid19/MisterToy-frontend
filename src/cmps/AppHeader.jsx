import { NavLink } from "react-router-dom"
import { UserMsg } from "./UserMsg.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"
import { useDispatch, useSelector } from "react-redux"
import { SET_CART_IS_SHOWN, SET_USER } from "../store/reducers/user.reducer.js"
import { userService } from "../services/user.service.js"
import { LoginSignup } from "./LoginSignup.jsx"
import { logout } from "../store/actions/user.actions.js"

export function AppHeader() {
  const dispatch = useDispatch()

  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )
  const isCartShown = useSelector(
    (storeState) => storeState.userModule.isCartShown
  )

  async function onLogout() {
    try {
      await logout()
    } catch (err) {
      showErrorMsg("OOPs try again")
    }
  }

  function onToggleCart(ev) {
    ev.preventDefault()
    dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
  }
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>MisterToy App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/toy">Toys</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
          <a onClick={onToggleCart} href="#">
            🛒 Cart
          </a>
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
