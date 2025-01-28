import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="mb-5">
      <h1 className="text-3xl font-bold items-center text-center relative z-50 pt-5">
        <Link href="/" className="flex flex-col justify-center items-center ">
          {/* <Image src="/logo-lg.png" alt="logo" width={136} height={150} /> */}
          <img src="/logo-lg.png" alt="logo" width={136} height={150} />

          <div className="text-primary-dark">COST CONTROL</div>
        </Link>
      </h1>
    </div>
  );
};
export default Header;
