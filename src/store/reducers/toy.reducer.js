import { toyService } from "../../services/toy.service"
//toy
export const SET_TOYS = "SET_TOYS"
export const REMOVE_TOY = "REMOVE_TOY"
export const ADD_TOY = "ADD_TOY"
export const UPDATE_TOY = "UPDATE_TOY"
//filterBy
export const SET_FILTER_BY = "SET_FILTER_BY"
//loading
export const SET_IS_LOADING = "SET_IS_LOADING"
export const LOAD_LABELS = "LOAD_LABELS"

const initialState = {
  toys: [],
  filterBy: toyService.getDefaultFilter(),
  isLoading: false,
  labels: [],
}

export function toyReducer(state = initialState, action = {}) {
  let toys
  switch (action.type) {
    // TOY
    case SET_TOYS:
      return { ...state, toys: action.toys }

    case REMOVE_TOY:
      toys = state.toys.filter((toy) => toy._id !== action.toyId)
      return { ...state, toys }

    case ADD_TOY:
      toys = [...state.toys, action.toy]
      return { ...state, toys }

    case UPDATE_TOY:
      toys = state.toys.map((toy) =>
        toy._id === action.toy._id ? action.toy : toy
      )
      return { ...state, toys }

    //FILTER
    case SET_FILTER_BY:
      return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

    //LOADING
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    //LABELS
    case LOAD_LABELS:
      return { ...state, labels: action.labels }
    default:
      return state
  }
}
