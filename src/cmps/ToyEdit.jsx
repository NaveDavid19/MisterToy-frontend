import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { saveToy } from '../store/actions/toy.actions'
import { useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (field === 'inStock') {
            value = value === "true"
        }
        if (field === 'price') {
            value = +value
        }
        setToy(prevToy => ({ ...prevToy, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        saveToy(toy)
            .then(() => {
                showSuccessMsg('Toy saved successfully')
                navigate('/toy')
            })
            .catch((err) => {
                showErrorMsg('Can not save toy, please try again')
            })
        navigate('/toy')
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            handleSubmit(ev);
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Edit Toy</h1>
            <form className="toy-details" onSubmit={handleSubmit}>
                <TextField onKeyDown={handleKeyDown} onChange={handleChange} id="name" name="name" value={toy.name} label="name" variant="standard" />
                <img src={toy.img} alt={toy.name} />
                <TextField onKeyDown={handleKeyDown} onChange={handleChange} id="price" name="price" value={toy.price} label="price" variant="standard" />
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="inStock-label">Stock</InputLabel>
                    <Select
                        labelId="inStock-label"
                        id="inStock"
                        name="inStock"
                        value={toy.inStock}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    >
                        <MenuItem value="true">in Stock</MenuItem>
                        <MenuItem value="false">Out of stock</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </form>
        </section>
    );
}