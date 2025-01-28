import Card from "./Card";

const Cards = () => {
  return (
    <div className="w-full px-3 min-h-[40vh]">
      <p className="text-4xl font-bold text-center text-primary-dark my-5">
        History
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        <Card cardType={"saving"} />
        <Card cardType={"expense"} />
        <Card cardType={"investment"} />
        <Card cardType={"investment"} />
        <Card cardType={"saving"} />
        <Card cardType={"expense"} />
      </div>
    </div>
  );
};
export default Cards;
