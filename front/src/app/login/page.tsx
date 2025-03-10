"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "@/components/ui/InputField";
import Link from "next/link";
import { LOGIN } from "../../graphql/mutations/user.mutation";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: () => {
      router.refresh();
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      return toast.error("Please fill in all fields");
    }
    try {
      await login({ variables: { input: loginData } });
    } catch (error) {
      console.error("Error:", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 mx-6">
      <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300 w-full xs:max-w-96">
        <div className="w-full bg-gray-100 flex items-center justify-center">
          <div className="max-w-md w-full p-4 sm:p-6">
            <h1 className="text-3xl font-semibold mb-3 text-primary-dark text-center">
              Login
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Welcome back! Log in to your account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Username"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-medium text-white p-2 rounded-md hover:bg-primary-dark focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Loading ..." : "Login"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                {"Don't"} have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary-dark font-bold hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
