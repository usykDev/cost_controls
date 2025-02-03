import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-5 mb-5">
      <h1 className="text-3xl font-bold items-center text-center relative z-50 pt-5">
        <Link href="/" className="flex flex-col justify-center items-center ">
          <div className="bg-gray-200 rounded-2xl px-3 py-2">
            <img src="/logo-lg.png" alt="logo" width={136} height={150} />
          </div>
        </Link>
      </h1>
    </div>
  );
};
export default Header;
