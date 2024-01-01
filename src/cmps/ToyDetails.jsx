import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { useParams, Link } from "react-router-dom"
import { utilService } from "../services/util.service"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { ToyMsg } from "./ToyMsg"
import { useSelector } from "react-redux"
import { saveToyMsg } from "../store/actions/toy.actions"

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

  async function onAddMsg() {
    const msg = {}
    msg.txt = prompt("Add a msg")
    const returnedMsg = await onUpdateToy(toy._id, msg.txt)
    setToy((prevToy) => ({
      ...prevToy,
      msgs: [...prevToy.msgs, returnedMsg],
    }))
  }

  async function onUpdateToy(toyId, txt) {
    try {
      const msgggggg = await saveToyMsg(toyId, txt)
      showSuccessMsg("Toy saved successfully")
      return msgggggg
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
