import { userService } from "../../services/user.service.js"

/// user
export const SET_USER = "SET_USER"
export const SET_USER_SCORE = "SET_USER_SCORE"
// shopping cart
export const SET_CART_IS_SHOWN = "SET_CART_IS_SHOWN"
export const ADD_TOY_TO_CART = "ADD_TOY_TO_CART"
export const REMOVE_TOY_FROM_CART = "REMOVE_TOY_FROM_CART"
export const CLEAR_CART = "CLEAR_CART"

const initialState = {
  loggedinUser: userService.getLoggedinUser(),
  shoppingCart: [],
  isCartShown: false,
}

export function userReducer(state = initialState, action = {}) {
  let shoppingCart
  switch (action.type) {
    // user
    case SET_USER:
      return { ...state, loggedinUser: action.user }
    case SET_USER_SCORE:
      const user = { ...state.loggedinUser, score: action.score }
      return { ...state, loggedinUser: user }
    // shopping cart
    case SET_CART_IS_SHOWN:
      return { ...state, isCartShown: action.isCartShown }

    case ADD_TOY_TO_CART:
      shoppingCart = [...state.shoppingCart, action.toy]
      return { ...state, shoppingCart }

    case ADD_TOY_TO_CART:
      shoppingCart = [...state.shoppingCart, action.toy]
      return { ...state, shoppingCart }

    case REMOVE_TOY_FROM_CART:
      shoppingCart = state.shoppingCart.filter(
        (car) => toy._id !== action.toyId
      )
      return { ...state, shoppingCart }
    case CLEAR_CART:
      return { ...state, shoppingCart: [] }
    default:
      return state
  }
}
