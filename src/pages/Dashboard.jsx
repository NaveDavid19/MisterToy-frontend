import { useEffect } from "react"
import { AvgPriceChart } from "../cmps/AvgPriceChart"
import { ToysInStockByLables } from "../cmps/ToysInStockByLabels"
import { loadLabels } from "../store/actions/toy.actions"
import { useSelector } from "react-redux"

export function Dashboard() {
  const labels = useSelector((storeState) => storeState.toyModule.labels)

  useEffect(() => {
    if (!labels.length) {
      loadLabels()
    }
  }, [])
  return (
    <div>
      <AvgPriceChart />
      <ToysInStockByLables />
    </div>
  )
}
