// src/components/ui/Input.tsx
import React, { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon, 
  containerClassName = '', 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`${containerClassName}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            block w-full rounded-md border-gray-300 shadow-sm 
            focus:ring-indigo-500 focus:border-indigo-500 
            ${icon ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-500' : ''}
            ${className}
            py-2 sm:text-sm
          `}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
