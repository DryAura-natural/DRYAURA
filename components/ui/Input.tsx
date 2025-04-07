// src/components/ui/Input.tsx
import React, { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon, 
  rightIcon,
  containerClassName = '', 
  className = '', 
  labelClassName = 'text-white/80', 
  ...props 
}) => {
  return (
    <div className={`${containerClassName}`}>
      <label className={`block text-sm font-medium mb-1 ${labelClassName}`}>{label}</label>
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
            ${rightIcon ? 'pr-20' : 'pr-1'}
            ${error ? 'border-red-500' : ''}
            ${className}
            py-2 sm:text-sm
          `}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
