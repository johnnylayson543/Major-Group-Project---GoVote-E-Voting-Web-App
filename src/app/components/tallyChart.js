import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function MyTallyChart({ tally }) {
    if (!tally || !Array.isArray(tally.tally)) {
        return <p>No data available for the election tally.</p>;
    }

    const labels = tally.tally.map(item => item.candidateID);
    const data = tally.tally.map(item => item.count);

    const chartData = {
        labels,
        datasets: [{
            label: 'Election Tally',
            data,
            backgroundColor: '#3e95cd'
        }]
    };

    const chartOptions = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Election Tally'
            }
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        },
        legend: {
            display: false
        }
    };

    return (
        <div aria-label="Bar chart showing the election tally">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}