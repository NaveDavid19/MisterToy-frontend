import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { toyService } from "../services/toy.service"
import Checkbox from "@mui/material/Checkbox"
import { useSelector } from "react-redux"

export function ToyFilter({ filterBy, onSetFilter }) {
  const labels = useSelector((storeState) => storeState.toyModule.labels)
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const [selectedLabels, setSelectedLabels] = useState([])

  onSetFilter = useRef(utilService.debounce(onSetFilter))

  useEffect(() => {
    if (
      !(
        filterBy.txt === filterByToEdit.txt &&
        filterBy.maxPrice === filterByToEdit.maxPrice &&
        filterBy.inStock === filterByToEdit.inStock &&
        filterBy.label === filterByToEdit.label
      )
    ) {
      onSetFilter.current(filterByToEdit)
    }
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    if (field === "label") {
      setSelectedLabels(value)
      setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    } else {
      value = type === "number" ? +value : value
      setFilterByToEdit((prevFilter) => {
        return { ...prevFilter, [field]: value }
      })
    }
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>
      <form className="filter-form">
        <div className="input">
          <TextField
            onChange={handleChange}
            id="txt"
            name="txt"
            value={filterByToEdit.txt}
            label="By name"
            variant="standard"
          />
        </div>
        <div className="input">
          <TextField
            onChange={handleChange}
            id="maxPrice"
            name="maxPrice"
            value={filterByToEdit.maxPrice}
            label="By max price"
            variant="standard"
          />
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
        <div className="select">
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="label-label">Label</InputLabel>
            <Select
              labelId="label-label"
              id="label"
              name="label"
              multiple
              value={selectedLabels}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {labels.map((label) => (
                <MenuItem key={label} value={label}>
                  <Checkbox checked={selectedLabels.indexOf(label) > -1} />
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </form>
    </section>
  )
}
