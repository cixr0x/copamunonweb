import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

const WeatherChart = ({ data, sessionDuration }) => {
    // Transform the data to fit the Chart.js format
    if (data == null) {
        return null;
    }
    const chartData = {
        labels: data.map(item => item.m_timeOffset),
        datasets: [
            {
                label: 'Rain Percentage',
                data: data.map(item => item.m_rainPercentage),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    // Chart.js options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Weather Forecast',
                position: 'bottom',
            },
            
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}%`;
                    },
                },
            },
            annotation: {
                annotations: {
                  verticalLine: {
                    type: 'line',
                    xMin: Math.round(sessionDuration/60),
                    xMax: Math.round(sessionDuration/60),
                    borderColor: 'white',
                    borderWidth: 1,
                  }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'time (mins)',
                },
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 100,
                title: {
                    display: false,
                    text: '%',
                },
            },
        }
    };

    return (
        <div className="weather-chart-container"> {/* Apply the class here */}
            <Line data={chartData} options={options} />
        </div>
    );
};

export default WeatherChart;