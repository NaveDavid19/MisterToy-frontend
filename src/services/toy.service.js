import { httpService } from "./http.service"
import { utilService } from "./util.service"

const BASE_URL = 'toy/'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']
// const STORAGE_KEY = 'toyDB'
// _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getLables,
    getEmptyToy
}


function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getLables() {
    return [...labels]
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: '' }
}


function getEmptyToy() {
    return {
        name: utilService.makeLorem(2),
        price: utilService.getRandomIntInclusive(1, 100),
        labels: utilService.getRandomLabels(),
        createdAt: Date.now(),
        img: "https://upload.wikimedia.org/wikipedia/he/b/b4/Buzz_Lightyear.png",
        inStock: true
    }
}

