import { Link } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy }) {

    return (
        <li className="toy-preview">
            <h1>{toy.name}</h1>
            <h3>Price: <span>${toy.price.toLocaleString()}</span></h3>
            <h4>Stock:{toy.inStock ? 'In stock' : 'Out of stock'}</h4>
            <button onClick={() => onRemoveToy(toy._id)}> Delete </button>
            <Link to={`/toy/edit/${toy._id}`}> <button>Edit</button></Link>
            <Link to={`/toy/${toy._id}`}> <button>Details</button></Link>
        </li>
    )
}