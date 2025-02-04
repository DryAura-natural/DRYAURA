import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Buttons: React.FC<ButtonProps> = ({ className, children, ...props }) => (
  <button
    className={`px-4 py-2 font-semibold text-white bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    {...props}
  >
    {children}
  </button>
);
