import { httpService } from "./http.service"

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
    getLables
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

// function query(filterBy = {}) {
//     if (!filterBy.txt) filterBy.txt = ''
//     if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
//     if (!filterBy.stock) filterBy.stock = 'all'
//     const regExp = new RegExp(filterBy.txt, 'i')
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             return toys.filter(toy =>
//                 regExp.test(toy.name) &&
//                 toy.price <= filterBy.maxPrice &&
//                 (filterBy.stock === 'all' || (filterBy.stock === 'inStock' && toy.inStock) || (filterBy.stock === 'outOfStock' && !toy.inStock))

//             )
//         })
// }




// function getById(toyId) {
//     return storageService.get(STORAGE_KEY, toyId)
// }
// function remove(toyId) {
//     return storageService.remove(STORAGE_KEY, toyId)
// }
// function save(toy) {
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         // when switching to backend - remove the next line
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }


// function _createToys() {
//     let toys = utilService.loadFromStorage(STORAGE_KEY)
//     if (!toys || !toys.length) {
//         toys = [
//             {
//                 _id: 't101',
//                 name: 'Talking Doll',
//                 price: 123,
//                 labels: ['Doll', 'Battery Powered', 'Baby'],
//                 createdAt: 1631031801011,
//                 inStock: true
//             },
//             {
//                 _id: 't102',
//                 name: 'Educational Board Game',
//                 price: 45,
//                 labels: ['Board Game', 'Educational', 'Kids'],
//                 createdAt: 1631031801011,
//                 inStock: true
//             },
//             {
//                 _id: 't103',
//                 name: 'Remote Control Car',
//                 price: 79,
//                 labels: ['Toy', 'Remote Control', 'Car'],
//                 createdAt: 1631031801011,
//                 inStock: false
//             },
//             {
//                 _id: 't104',
//                 name: 'Building Blocks Set',
//                 price: 30,
//                 labels: ['Toy', 'Building Blocks', 'Creative'],
//                 createdAt: 1631031801011,
//                 inStock: true
//             },
//             {
//                 _id: 't105',
//                 name: 'Puzzle Book',
//                 price: 15,
//                 labels: ['Book', 'Puzzle', 'Entertainment'],
//                 createdAt: 1631031801011,
//                 inStock: true
//             }
//         ]

//     }
//     utilService.saveToStorage(STORAGE_KEY, toys)
// }
