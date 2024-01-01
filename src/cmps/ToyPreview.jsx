import { Link } from "react-router-dom"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useSelector } from "react-redux"

export function ToyPreview({ toy, onRemoveToy }) {
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )
  return (
    <li className="toy-preview">
      <h1>{toy.name}</h1>
      <img src={toy.img} />
      <h3>
        Price: <span>${toy.price.toLocaleString()}</span>
      </h3>
      <h4>Owner: {toy.owner}</h4>
      <h4>Stock: {toy.inStock ? "In stock" : "Out of stock"}</h4>
      <div className="preview-btns">
        <Stack spacing={2} direction="row">
          {loggedinUser &&
            (loggedinUser.fullname === toy.owner || loggedinUser.isAdmin) && (
              <div>
                <Button
                  size="small"
                  onClick={() => onRemoveToy(toy._id)}
                  variant="contained"
                  style={{ marginRight: "17px" }}
                >
                  Delete
                </Button>
                <Link to={`/toy/edit/${toy._id}`}>
                  <Button size="small" variant="contained">
                    Edit
                  </Button>
                </Link>
              </div>
            )}

          <Link to={`/toy/${toy._id}`}>
            <Button size="small" variant="contained">
              Details
            </Button>
          </Link>
        </Stack>
      </div>
    </li>
  )
}
