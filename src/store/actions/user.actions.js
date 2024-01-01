import { userService } from "../../services/user.service.js"
import { SET_USER, SET_USER_SCORE } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({ type: SET_USER, user })
    return user
  } catch (err) {
    console.log("user actions -> Cannot login", err)
    throw err
  }
}

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({ type: SET_USER, user })
    return user
  } catch (err) {
    console.log("user actions -> Cannot signup", err)
    throw err
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: SET_USER, user: null })
  } catch (err) {
    console.log("user actions -> Cannot logout", err)
    throw err
  }
}

export async function getUserById(userId) {
  try {
    const user = await userService.getById(userId)
    return user
  } catch (err) {
    console.log("user actions -> Cannot get user", err)
    throw err
  }
}

export async function updateUser(user) {
  try {
    const updatedUser = await userService.update(user)
    store.dispatch({ type: SET_USER, user: updatedUser })
    return updatedUser
  } catch (err) {
    console.log("user actions -> Cannot update user", err)
    throw err
  }
}
