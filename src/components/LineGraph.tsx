// src/components/LineGraph.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

interface LineGraphProps {
  labels: string[];
  data: number[];
}

const LineGraph: React.FC<LineGraphProps> = ({ labels, data }) => {
  const graphData = {
    labels: labels,
    datasets: [
      {
        label: 'Company Data',
        data: data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line data={graphData} options={options} />;
};

export default LineGraph;
