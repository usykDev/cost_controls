"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }: any) => {
  return (
    <Doughnut
      data={data}
      // options={chartOptions}
    />
  );
};

export default DoughnutChart;
