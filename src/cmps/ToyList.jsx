import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <ToyPreview key={toy._id} {...{ toy, onRemoveToy }} />
      ))}
    </ul>
  )
}
