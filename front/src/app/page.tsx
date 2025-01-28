import Cards from "@/components/ui/Cards";
import TransactionForm from "@/components/ui/TransactionForm";

import Logout from "@/components/ui/Logout";
import DoughnutChart from "@/components/ui/DoughnutChart";

// const chartOptions: ChartOptions<"doughnut"> = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: "top", // Use a valid position
//       labels: {
//         padding: 10, // Adjust space between chart and labels
//       },
//     },
//   },
//   layout: {
//     padding: {
//       top: 20, // Adds space above the chart (increases gap between legend and chart)
//       //   bottom: 20,
//       //   left: 20,
//       //   right: 20,
//     },
//   },
// };

const HomePage = () => {
  const chartData = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "%",
        data: [13, 8, 3],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235, 1)",
        ],
        cutout: 120,
      },
    ],
  };

  const loading = false;

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="w-10 h-10 rounded-full border cursor-pointer"
            alt="Avatar"
          />

          {!loading && <Logout />}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px]">
            <DoughnutChart data={chartData} />
          </div>

          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
