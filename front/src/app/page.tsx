import Cards from "@/components/ui/Cards";
import TransactionForm from "@/components/ui/TransactionForm";
import DoughnutChart from "@/components/ui/DoughnutChart";
import Logout from "@/components/ui/Logout";

const HomePage = async () => {
  return (
    <>
      <Logout />
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex md:flex-row flex-col w-full justify-center items-center gap-6">
          <DoughnutChart />
          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
