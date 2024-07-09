import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import * as utils from '../utils/utils';

Chart.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    ctx.restore();
    const fontSize = (height / 100).toFixed(2);
    ctx.font = `1.2em sans-serif`;
    ctx.textBaseline = 'middle';
    const text = `${chart.config.data.datasets[0].data[0]}%`;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;
    ctx.fillStyle = utils.getAdvColor(chart.config.data.datasets[0].data[0] / 100);
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

const TyreChart = ({ damage }) => {
  const chartRef = useRef(null);

  const data = {
    datasets: [
      {
        data: [damage, 100 - damage],
        backgroundColor: [utils.getAdvColor(damage / 100), '#00000000'],
        borderWidth: 0,
        rotation: -0, // Adjust rotation to start from top to right
      },
    ],
  };

  const options = {
    cutout: '70%', // Creates the donut hole
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: false, // Disables the tooltip
      },
      centerText: {
        display: true,
      },
    },
    rotation: -0, // Ensure rotation starts from the top
    circumference: 360, // Completes the circle for the donut
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;

      // Register the custom plugin to the specific chart instance
      chart.options.plugins.centerText = {
        display: true,
      };
      
      chart.update();
    }
  }, [damage]);

  return <Doughnut ref={chartRef} data={data} options={options} plugins={[centerTextPlugin]} />;
};

export default TyreChart;