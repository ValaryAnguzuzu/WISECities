import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({
  children,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition ${className}`}
    >
      {children}
    </button>
  );
}
