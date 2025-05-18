"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = "rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center";
  
  // Variant styles
  const variantStyles = {
    primary: "bg-white text-black hover:bg-opacity-90",
    secondary: "bg-[#1a1a1a] text-white hover:bg-[#252525]",
    outline: "border border-gray-700 text-white hover:bg-[#1a1a1a]",
  };
  
  // Size styles
  const sizeStyles = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };
  
  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <motion.button
      className={buttonStyles}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
