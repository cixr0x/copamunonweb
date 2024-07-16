import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StintChart = ({ data, maxValue }) => {
  // Transform the data into multiple datasets
  const datasets = data.map((item) => ({
    label: `Lap ${item.startLap+1}-${item.endLap+1}`,
    data: [item.endLap+1 - item.startLap+1],
    backgroundColor: item.color,
    borderColor: "#000000",
    borderwidth: 1,
  }));

  const chartData = {
    labels: [''],
    datasets: datasets,
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        max: maxValue, // Set the maximum value for the x-axis
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StintChart;
