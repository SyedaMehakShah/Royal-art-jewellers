// app/components/ui/Button.tsx
import React from "react";



const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 ease-in-out shadow-md ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
export interface ButtonProps {
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  // other properties
}