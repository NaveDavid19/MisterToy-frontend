import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { saveToy } from '../store/actions/toy.actions'
import { useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

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

    if (!toy) return <div>Loading...</div>
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name : </label>
                <input value={toy.name} onChange={handleChange} type="text" id="name" name="name" />
                <label htmlFor="price">Price : </label>
                <input value={toy.price} onChange={handleChange} type="text" id="price" name="price" />
                <button>Save</button>
            </form>
            <select onChange={handleChange} name="inStock" id="inStock">
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
            </select>
        </section>
    )
}