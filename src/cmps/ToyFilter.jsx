import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';




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
            return ({ ...prevFilter, [field]: value })
        })
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form className="filter-form" >
                <div className="input">
                    <TextField onChange={handleChange} id="txt" name="txt" value={filterByToEdit.txt} label="By name" variant="standard" />
                </div>
                <div className="input">
                    <TextField onChange={handleChange} id="maxPrice" name="maxPrice" value={filterByToEdit.maxPrice} label="By max price" variant="standard" />
                </div>
                <div className="select">
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="inStock-label">Stock</InputLabel>
                        <Select
                            labelId="inStock-label"
                            id="inStock"
                            name="inStock"
                            value={filterByToEdit.inStock}
                            onChange={handleChange}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="inStock">in Stock</MenuItem>
                            <MenuItem value="outOfStock">Out of stock</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </form>

        </section>
    )
}







