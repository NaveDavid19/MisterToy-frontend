import { React } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { toyService } from '../services/toy.service';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Chart of avg prices of each product ',
        }
    },
};

const labels = toyService.getLables()
const test = [5, 2, 5, 1, 5, 2, 3, 15]

export const data = {
    labels,
    datasets: [
        {
            label: 'Avg price',
            data: test,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};



export function AvgPriceChart() {

    return (
        <div style={{ width: '800px', height: '500px', margin: 'auto' }}>
            <Bar data={data} options={options} />
        </div>
    )

}
