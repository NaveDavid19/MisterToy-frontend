import { httpService } from "./http.service.js"

const BASE_URL = "/auth"
const STORAGE_KEY_LOGGEDIN = "loggedinUser"

export const userService = {
  login,
  logout,
  signup,
  getById,
  getLoggedinUser,
  updateScore,
  getEmptyCredentials,
}

async function getById(userId) {
  return await httpService.get(BASE_URL + userId)
}

async function login({ username, password }) {
  const user = await httpService.post(`${BASE_URL}/login`, {
    username,
    password,
  })
  if (user) return _setLoggedinUser(user)
  else return Promise.reject("Invalid login")
}

async function signup({ username, password, fullname }) {
  const user = { username, password, fullname, score: 10000, isAdmin: false }
  const returenedUser = await httpService.post(`${BASE_URL}/signup`, user)
  if (returenedUser) return _setLoggedinUser(returenedUser)
  else return Promise.reject("Invalid signup")
}

async function updateScore(diff) {
  if (getLoggedinUser().score + diff < 0) return Promise.reject("No credit")
  const user = await httpService.put("user/", { diff })
  _setLoggedinUser(user)
  return user.score
}

async function logout() {
  await httpService.post(`${BASE_URL}/logout`)
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    score: user.score,
  }
  if (user.isAdmin) userToSave.isAdmin = true
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    username: "",
    password: "",
    fullname: "",
  }
}
