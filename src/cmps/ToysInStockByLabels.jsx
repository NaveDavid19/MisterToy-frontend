import { React, useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"

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

export function ToysInStockByLables() {
  const labels = useSelector((storeState) => storeState.toyModule.labels)
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const [totalStock, setTotalStock] = useState([])
  const [inStock, setInStock] = useState([])

  useEffect(() => {
    calculateStockData()
  }, [])

  function calculateStockData() {
    const calculatedTotalStock = labels.map((label) => {
      const labelToys = toys.filter((toy) => toy.labels.includes(label))
      return labelToys.length
    })

    const calculatedInStock = labels.map((label) => {
      const labelToys = toys.filter((toy) => toy.labels.includes(label))
      return labelToys.reduce((sum, toy) => sum + toy.inStock, 0)
    })

    setTotalStock(calculatedTotalStock)
    setInStock(calculatedInStock)
  }
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
