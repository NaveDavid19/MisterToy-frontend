import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy, onAddToCart }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <ToyPreview key={toy._id} {...{ toy, onRemoveToy, onAddToCart }} />
      ))}
    </ul>
  )
}
