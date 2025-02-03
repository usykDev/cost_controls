"use client";

import InputField from "@/components/ui/InputField";
import RadioButton from "@/components/ui/RadioButton";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { REGISTER } from "../../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const router = useRouter();

  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: () => {
      router.refresh();
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setRegisterData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !registerData.username ||
      !registerData.password ||
      !registerData.name ||
      !registerData.gender
    ) {
      return toast.error("Please fill in all fields");
    }
    try {
      await register({
        variables: {
          input: registerData,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
        <div className="w-full bg-gray-100 min-w-64 sm:min-w-96 flex items-center justify-center">
          <div className="max-w-md w-full p-4 sm:p-6">
            <h1 className="text-3xl font-semibold mb-3 text-primary-dark text-center">
              Registration
            </h1>
            <h1 className="text-sm font-semibold mb-3 text-gray-500 text-center">
              Join to keep track of your expenses
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Full Name"
                id="name"
                name="name"
                value={registerData.name}
                onChange={handleChange}
              />
              <InputField
                label="Username"
                id="username"
                name="username"
                value={registerData.username}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleChange}
              />
              <div className="flex gap-10">
                <RadioButton
                  id="male"
                  label="Male"
                  //   name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={registerData.gender === "male"}
                />
                <RadioButton
                  id="female"
                  label="Female"
                  //   name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={registerData.gender === "female"}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-medium text-white p-2 rounded-md hover:bg-primary-dark focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Loading ..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary-dark font-bold hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
