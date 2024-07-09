import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProgressBar = ({ progress, width = '80%', height = '2rem' }) => {
  // Ensure progress is between 0 and 100
  const boundedProgress = Math.min(Math.max(progress, 0), 100);

  const data = {
    labels: ['Progress'],
    datasets: [
      {
        label: 'Completed',
        data: [boundedProgress],
        backgroundColor: '#FFFF00',
      },
      {
        label: 'Remaining',
        data: [100 - boundedProgress],
        backgroundColor: '#404040',
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 100,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        stacked: true,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div style={{ width: width, height: height }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressBar;