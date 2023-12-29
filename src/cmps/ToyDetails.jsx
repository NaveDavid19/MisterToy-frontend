import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { useParams, Link } from "react-router-dom"
import { utilService } from "../services/util.service"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';

export function ToyDetails() {
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

    if (!toy) return <div>Loading...</div>
    return (
        <div>
            <div className="toy-details">
                <h1>Name: {toy.name}</h1>
                <img src={toy.img} />
                <h2>Price: {toy.price}$</h2>
                <h3>Stock: {toy.inStock ? 'In stock' : 'Out of stock'}</h3>
                <h3>Labels: {toy.labels.join(', ')}</h3>
                <h4>Created At: {utilService.timestampToDate(toy.createdAt)}</h4>
                <Link to="/toy"> <Button size="small" variant="contained">Back</Button></Link>
            </div>
        </div>
    )
}