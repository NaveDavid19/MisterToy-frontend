import { httpService } from "./http.service"
import { utilService } from "./util.service"

const BASE_URL = "/toy"

export const toyService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
  getLabels,
  getEmptyToy,
  saveMsg,
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}

function getLabels() {
  return httpService.get(`${BASE_URL}/labels`)
}

function getById(toyId) {
  return httpService.get(`${BASE_URL}/${toyId}`)
}

function remove(toyId) {
  return httpService.delete(`${BASE_URL}/${toyId}`)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function saveMsg(toyId, txt) {
  return httpService.post(`${BASE_URL}/${toyId}/msg`, { txt })
}

function getDefaultFilter() {
  return { txt: "", maxPrice: "", inStock: "all", label: [] }
}

function getRandomStock() {
  const x = Math.random()
  return x > 0.5 ? true : false
}

function getEmptyToy() {
  return {
    name: utilService.makeLorem(2),
    price: utilService.getRandomIntInclusive(35, 300),
    labels: utilService.getRandomLabels(),
    createdAt: Date.now(),
    img: "https://upload.wikimedia.org/wikipedia/he/b/b4/Buzz_Lightyear.png",
    inStock: getRandomStock(),
    msgs: [],
  }
}
