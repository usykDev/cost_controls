import { ChangeEvent, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

type InputFieldProps = {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = "text",
  onChange,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  return (
    <div className="mt-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          className="py-1 bg-gray-200 px-1.5 mt-1 w-full border rounded-md text-black focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          id={id}
          type={isPasswordField && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 mt-1 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible
                size={20}
                title="Hide password"
                aria-label="Hide password"
              />
            ) : (
              <AiFillEye
                size={20}
                title="Show password"
                aria-label="Show password"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
