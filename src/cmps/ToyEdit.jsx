import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { saveToy } from '../store/actions/toy.actions'
import { useNavigate } from "react-router-dom"

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
        value = value === "true"
        setToy(prevToy => ({ ...prevToy, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        saveToy(toy)
        navigate('/toy')
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name : </label>
                <input value={toy.name} onChange={handleChange} type="text" id="name" name="name" />
                <button>Save</button>
            </form>
            <select onChange={handleChange} name="inStock" id="inStock">
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
            </select>
        </section>
    )
}