import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface LineGraphProps {
  labels: Array<string>;
  dataPoints: Array<number>;
}

const LineGraph: React.FC<LineGraphProps> = ({ labels, dataPoints }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Company Values',
        data: dataPoints,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Score',
        },
      },
    },
  };

  return (
    <div className="w-full h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
