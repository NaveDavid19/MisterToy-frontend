import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"



export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => {
            console.log("prevFilter:", prevFilter)
            return ({ ...prevFilter, [field]: value })
        })
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="txt">Name:</label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />
                <select onChange={handleChange} name="stock" id="stock">
                    <option value="all">All</option>
                    <option value="inStock">in Stock</option>
                    <option value="outOfStock">Out of stock</option>
                </select>

            </form>

        </section>
    )
}
