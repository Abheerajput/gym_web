import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  // ChartData,
  // ChartOptions,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define months array
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Define the BarChart component
export const BarChart = ({
  data_1 = [],
  data_2 = [],
  title1,
  title2,
  bgColor1,
  bgColor2,
  horizontal = false,
  labels = months,
}) => {
  // Define options for the chart
  const options = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Define data for the chart
  const data = {
    labels,
    datasets: [
      {
        label: title1,
        data: data_1,
        backgroundColor: bgColor1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4
      },
      {
        label: title2,
        data: data_2,
        backgroundColor: bgColor2,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4
      },
    ],
  };

  // Render the Bar chart
  return <Bar options={options} data={data} />;
};

// Define the RoundChart component
export const RoundChart = () => {
  // Define data for the chart
  const roundData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Define options for the chart
  const roundOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
  };

  // Render the Doughnut chart
  return <Doughnut data={roundData} options={roundOptions} />;
};
