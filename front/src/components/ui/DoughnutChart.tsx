"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartData,
} from "chart.js";

import { useQuery } from "@apollo/client";
import { GET_TRANSACTION_STATISTICS } from "@/graphql/queries/transaction.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type CategoryStatistics = {
  category: string;
  totalAmount: number;
};

type QueryData = {
  categoryStatistics: CategoryStatistics[];
};

const DoughnutChart = () => {
  const { data, loading } = useQuery<QueryData>(GET_TRANSACTION_STATISTICS);
  //   console.log("data: ", data);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
        align: "start",
      },
    },
    cutout: 0,
  } as const;

  const [chartData, setChartData] = useState<ChartData<"doughnut">>({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map(
        (stat: any) => stat.category
      );
      const totalAmounts = data.categoryStatistics.map(
        (stat: any) => stat.totalAmount
      );
      const backgroundColors: string[] = [];
      const borderColor: string[] = [];

      categories.forEach((category: any) => {
        if (category === "saving") {
          backgroundColors.push("rgba(67, 213, 168)");
          borderColor.push("rgba(67, 213, 168)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColor.push("rgba(255, 99, 132)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(96, 165, 250)");
          borderColor.push("rgba(96, 165, 250)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColor,
          },
        ],
      }));
    }
  }, [data]);

  return chartData.labels?.length ? (
    <div className="xs:h-[430px] xs:w-[430px] h-[300px] w-[300px]">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  ) : (
    <div className="text-3xl font-bold text-center after:content-['↓'] md:after:content-['→']">
      Add your <br /> first expense {"   "}
    </div>
  );
};

export default DoughnutChart;
