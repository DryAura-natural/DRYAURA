// src/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className={`mt-1 block w-full rounded rounded-r-none border-gray-300 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 p-2 sm:text-sm p-1.5 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
