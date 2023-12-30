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
      text: "Avg prices of each product",
    },
  },
}

export function AvgPriceChart() {
  const labels = useSelector((storeState) => storeState.toyModule.labels)
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const [avgPrices, setAvgPrices] = useState([])

  useEffect(() => {
    calculateAvgPriceForLabels()
  }, [])

  function calculateAvgPriceForLabels() {
    const avgPricesPerLabel = {}

    toys.forEach((toy) => {
      toy.labels.forEach((label) => {
        if (!avgPricesPerLabel[label]) {
          avgPricesPerLabel[label] = {
            total: 0,
            count: 0,
          }
        }

        avgPricesPerLabel[label].total += toy.price
        avgPricesPerLabel[label].count += 1
      })
    })

    const result = {}
    for (const label in avgPricesPerLabel) {
      const { total, count } = avgPricesPerLabel[label]
      result[label] = total / count || 0
    }

    setAvgPrices(result)
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Avg price",
        data: avgPrices,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  return (
    <div style={{ width: "800px", height: "500px", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  )
}
