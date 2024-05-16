import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HistogramProps {
  labels: string[];
  companyValues: number[];
  goalValues: number[];
}

const Histogram: React.FC<HistogramProps> = ({ labels, companyValues, goalValues }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Company Values',
        data: companyValues,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Goal Values',
        data: goalValues,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Company Values vs Goal Values',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Metrics',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  return <div className="w-full h-96"><Bar data={data} options={options} /></div>;
};

export default Histogram;
