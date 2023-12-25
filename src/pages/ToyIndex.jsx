import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadToys, removeToy, saveToy, setFilterBy } from "../store/actions/toy.actions";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

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

    if (!toys || !toys.length) return <div> loading...</div>
    return (
        <div>
            <ToyFilter {...{ filterBy, onSetFilter }} />
            <ToyList {...{ toys, onRemoveToy }} />
        </div>
    )
}