import Cards from "@/components/ui/Cards";
import TransactionForm from "@/components/ui/TransactionForm";

import DoughnutChart from "@/components/ui/DoughnutChart";
import Logout from "@/components/ui/Logout";

const HomePage = async () => {
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

  return (
    <>
      <Logout />
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
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
