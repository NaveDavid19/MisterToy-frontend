import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadToys, removeToy, saveToy, setFilterBy } from "../store/actions/toy.actions";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
    }

    function onEditToy(toy) {
        saveToy(toy)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <div>
            <ToyFilter {...{ filterBy, onSetFilter }} />
            {!isLoading && <ToyList {...{ toys, onRemoveToy }} />}
            {isLoading && <div>Loading...</div>}
        </div>
    )
}