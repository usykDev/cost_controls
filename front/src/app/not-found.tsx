import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <section>
      <div className="flex justify-center text-white">
        <div className="z-50">
          <div className="m-auto text-center p-3">
            <div>
              {/* <img src="/not-found.svg" alt="404" /> */}
              <Image
                src="/not-found.svg"
                width={500}
                height={500}
                alt="not-found"
                priority
              />
            </div>
            <p className="text-sm md:text-base text-[#F6009B] p-2 ">
              This page doesn't exist
            </p>
            <Link
              href="/"
              className="font-bold text-secondary-300 hover:underline"
            >
              Go back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
