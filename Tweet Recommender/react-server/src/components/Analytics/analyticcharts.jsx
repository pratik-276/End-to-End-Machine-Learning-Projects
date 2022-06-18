import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticChart({ userStats, populationStats }) {
  const labels = ["Reply Count", "Like Count", "Retweet Count"];
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "User Post",
        data: [userStats.replies, userStats.likes, userStats.retweets],
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Population",
        data: [
          populationStats.replies,
          populationStats.likes,
          populationStats.retweets,
        ],
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 1",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default AnalyticChart;
