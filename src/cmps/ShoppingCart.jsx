import { useDispatch, useSelector } from "react-redux"
import {
  CLEAR_CART,
  REMOVE_TOY_FROM_CART,
} from "../store/reducers/user.reducer"
import { userService } from "../services/user.service"
import { SET_USER_SCORE } from "../store/reducers/user.reducer"
import { showSuccessMsg } from "../services/event-bus.service"

export function ShoppingCart({ isCartShown }) {
  const dispatch = useDispatch()
  const shoppingCart = useSelector(
    (storeState) => storeState.carModule.shoppingCart
  )
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  function removeFromCart(carId) {
    console.log(`Todo: remove: ${carId} from cart`)
    dispatch({ type: REMOVE_TOY_FROM_CART, carId })
  }

  function getCartTotal() {
    return shoppingCart.reduce((acc, car) => acc + car.price, 0)
  }

  function onCheckout() {
    const amount = getCartTotal()
    userService.updateScore(-amount).then((score) => {
      dispatch({ type: SET_USER_SCORE, score })
      dispatch({ type: CLEAR_CART })
      showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
    })
  }

  if (!isCartShown) return <span></span>
  const total = getCartTotal()
  return (
    <section className="cart">
      <h5>Your Cart</h5>
      <ul>
        {shoppingCart.map((car, idx) => (
          <li key={idx}>
            <button
              onClick={() => {
                removeFromCart(car._id)
              }}
            >
              x
            </button>
            {car.vendor} | ${car.price}
          </li>
        ))}
      </ul>
      <p>Total: ${total} </p>
      <button disabled={!user || !total} onClick={onCheckout}>
        Checkout
      </button>
    </section>
  )
}
