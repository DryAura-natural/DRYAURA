// src/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className={` block w-full rounded rounded-r-none border-gray-300 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 p-2 sm:text-sm  ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className=" text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
