import { toyService } from "../../services/toy.service";
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer";
import { store } from "../store";


export async function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().toyModule.filterBy
    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
        return toys
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })

    } catch (err) {
        console.log('Cannot remove toy: ', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}