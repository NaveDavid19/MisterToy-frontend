import { useEffect } from "react"
import { useSelector } from "react-redux"
import {
  loadLabels,
  loadToys,
  removeToy,
  saveToy,
  setFilterBy,
} from "../store/actions/toy.actions"
import { ToyList } from "../cmps/ToyList"
import { ToyFilter } from "../cmps/ToyFilter"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import Button from "@mui/material/Button"

export function ToyIndex() {
  const labels = useSelector((storeState) => storeState.toyModule.labels)
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )

  useEffect(() => {
    try {
      if (!labels.length) {
        loadLabels()
      }
      loadToys()
    } catch (err) {
      showErrorMsg("Oops.. something went wrong, try again")
    }
  }, [])

  useEffect(() => {
    try {
      if (labels.length) {
        loadToys()
      }
    } catch (err) {
      showErrorMsg("Oops.. something went wrong, try again")
    }
  }, [filterBy])

  async function onRemoveToy(toyId) {
    try {
      await removeToy(toyId)
      showSuccessMsg("Toy removed successfully")
    } catch (err) {
      showErrorMsg("Cant remove toy, try again.")
    }
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onAddToy() {
    const toy = toyService.getEmptyToy()
    toy.owner = loggedinUser.fullname
    saveToy(toy)
  }

  return (
    <>
      <ToyFilter {...{ filterBy, onSetFilter }} />
      {loggedinUser && (
        <div className="btn-add">
          <Button size="small" onClick={onAddToy} variant="contained">
            Add Toy
          </Button>
        </div>
      )}

      {!isLoading && <ToyList {...{ toys, onRemoveToy }} />}
      {isLoading && <div>Loading...</div>}
    </>
  )
}
