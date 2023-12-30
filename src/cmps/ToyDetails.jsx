import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { useParams, Link } from "react-router-dom"
import { utilService } from "../services/util.service"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import { showErrorMsg } from "../services/event-bus.service"
import { ToyMsg } from "./ToyMsg"
import { useSelector } from "react-redux"
import { saveToy } from "../store/actions/toy.actions"

export function ToyDetails({ onUpdateToy }) {
  const loggedinUser = useSelector(
    (storeState) => storeState.userModule.loggedinUser
  )
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
      console.log("Had issues in toy details", err)
      showErrorMsg("Cannot load toy")
      navigate("/toy")
    }
  }

  function onAddMsg() {
    const msg = {}
    msg.txt = prompt("Add a msg")
    setToy((prevToy) => {
      const updatedToy = {
        ...prevToy,
        msgs: [...prevToy.msgs, { txt: msg.txt, id: loggedinUser._id }],
      }
      onUpdateToy(updatedToy)
      return updatedToy
    })
  }

  async function onUpdateToy(toy) {
    try {
      await saveToy(toy)
      showSuccessMsg("Toy saved successfully")
    } catch (err) {
      showErrorMsg("Can not save toy, please try again")
    }
  }

  if (!toy) return <div>Loading...</div>
  return (
    <div>
      <div className="toy-details">
        <h1>Name: {toy.name}</h1>
        <img src={toy.img} />
        <h2>Price: {toy.price}$</h2>
        <h3>Owner: {toy.owner}</h3>
        <h3>Stock: {toy.inStock ? "In stock" : "Out of stock"}</h3>
        <h3>Labels: {toy.labels.join(", ")}</h3>
        <h4>Created At: {utilService.timestampToDate(toy.createdAt)}</h4>
        <div>
          <Link to="/toy">
            {" "}
            <Button size="small" variant="contained">
              Back
            </Button>
          </Link>
          {loggedinUser && (
            <Button
              onClick={onAddMsg}
              style={{ marginLeft: "17px" }}
              size="small"
              variant="contained"
            >
              Add msg
            </Button>
          )}
        </div>
      </div>
      <ToyMsg {...{ toy }} />
    </div>
  )
}
