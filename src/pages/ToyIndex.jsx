import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadToys, removeToy, saveToy, setFilterBy } from "../store/actions/toy.actions";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { toyService } from "../services/toy.service";
import Button from '@mui/material/Button';


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        try {
            loadToys()
            console.log('toys:', toys);
        } catch (err) {
            showErrorMsg('Oops.. something went wrong, try again')
        }
    }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed successfully')
        } catch (err) {
            showErrorMsg('Cant remove toy, try again.')
        }
    }

    // function onEditToy(toy) {
    //     saveToy(toy)
    // }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onAddToy() {
        let toy = toyService.getEmptyToy()
        saveToy(toy)
    }

    return (
        <>
            <ToyFilter {...{ filterBy, onSetFilter }} />
            <div className="btn-add">
                <Button size="small" onClick={onAddToy} variant="contained">Add Toy</Button>
            </div>
            {!isLoading && <ToyList {...{ toys, onRemoveToy }} />}
            {isLoading && <div>Loading...</div>}
        </>
    )
}