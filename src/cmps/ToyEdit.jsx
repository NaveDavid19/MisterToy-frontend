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

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (field === 'inStock') {
            value = value === 'In Stock'
        }
        if (field === 'price') {
            value = +value
        }
        setToy(prevToy => ({ ...prevToy, [field]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        try {
            await saveToy(toy)
            showSuccessMsg('Toy saved successfully')
        } catch (err) {
            showErrorMsg('Can not save toy, please try again')
        } finally {
            navigate('/toy')
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Edit Toy</h1>
            <img src={toy.img} alt={toy.name} />
            <form className="edit-inputs" onSubmit={handleSubmit}>
                <TextField onChange={handleChange} id="name" name="name" value={toy.name} label="name" variant="outlined" />
                <TextField onChange={handleChange} id="price" name="price" value={toy.price} label="price" variant="outlined" />
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="inStock-label">Stock</InputLabel>
                    <Select
                        labelId="inStock-label"
                        id="inStock"
                        name="inStock"
                        value={toy.inStock ? 'In Stock' : 'Out Of Stock'}
                        onChange={handleChange}

                    >
                        <MenuItem value={'In Stock'}>in Stock</MenuItem>
                        <MenuItem value={'Out Of Stock'}>Out of stock</MenuItem>
                    </Select>
                </FormControl>
                <button hidden></button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </form>
        </section>
    );
}