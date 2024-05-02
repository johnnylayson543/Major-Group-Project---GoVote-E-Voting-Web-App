import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { objectIdToOKLCH } from './helpers';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function MyTallyChart({ tally, candidateLabels }) {
    if (!tally || !Array.isArray(tally.tally)) {
        return <p>No data available for the election tally.</p>;
    }

    const labels = candidateLabels;
    const data = tally.tally.map(item => item.count);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Election Tally',
                data,
                backgroundColor:  tally.tally.map(candidate => objectIdToOKLCH(candidate.candidateID)),
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Election Tally',
            },
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        },
        legend: {
            display: false,
        },
    };

    return (
        <div aria-label="Bar chart showing the election tally">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}