import { React } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"

import { toyService } from "../services/toy.service"
import { useSelector } from "react-redux"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Stock of each product ",
    },
  },
}

const totalStock = [10, 7, 2, 12, 5, 7, 3, 25]
const inStock = [5, 2, 5, 1, 5, 2, 5, 15]

export function ToysInStockByLables() {
  const labels = useSelector((storeState) => storeState.toyModule.labels)
  const data = {
    labels,
    datasets: [
      {
        label: "Total stock",
        data: totalStock,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "In stock",
        data: inStock,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }
  return (
    <div style={{ width: "800px", height: "500px", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  )
}
