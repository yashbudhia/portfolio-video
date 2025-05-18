"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  href?: string;
  glowIntensity?: "low" | "medium" | "high";
}

export default function GlowButton({
  children,
  icon,
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  glowIntensity = "medium",
  className = "",
  ...props
}: GlowButtonProps) {
  // Base styles
  const baseStyles = "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 relative overflow-hidden group cursor-none hover:cursor-none";

  // Variant styles
  const variantStyles = {
    primary: "bg-black text-white border border-gray-700/60 hover:border-gray-600",
    secondary: "bg-white text-black hover:bg-opacity-90",
    outline: "bg-transparent border border-gray-700 text-white hover:bg-[#1a1a1a]",
  };

  // Disabled styles
  const disabledStyles = props.disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none"
    : "";

  // Size styles
  const sizeStyles = {
    sm: "text-xs px-5 py-2",
    md: "text-sm px-7 py-3",
    lg: "text-base px-8 py-4",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full justify-center" : "";

  // Glow intensity styles
  const glowStyles = {
    low: "opacity-30 blur-md",
    medium: "opacity-50 blur-lg",
    high: "opacity-70 blur-xl",
  };

  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`;

  // If href is provided, render an anchor tag
  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonStyles}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {icon && icon}
          {children}
        </span>

        {/* Hover effects */}
        <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-gray-500/30 via-gray-300/60 to-gray-500/30 group-hover:w-[110%] transition-all duration-500 ease-out"></span>

        {/* Glow effects */}
        <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-gradient-to-r from-gray-500/5 via-white/20 to-gray-500/5 ${glowStyles[glowIntensity]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none`}></span>
        <span className="absolute inset-0 -z-10 bg-black rounded-full group-hover:bg-opacity-80 transition-all duration-300"></span>
        <span className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
      </motion.a>
    );
  }

  // Otherwise, render a button
  return (
    <motion.button
      className={buttonStyles}
      whileHover={!props.disabled ? { scale: 1.01 } : undefined}
      whileTap={!props.disabled ? { scale: 0.98 } : undefined}
      {...props}
    >
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && icon}
        {children}
      </span>

      {/* Hover effects */}
      <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-gray-500/30 via-gray-300/60 to-gray-500/30 group-hover:w-[110%] transition-all duration-500 ease-out"></span>

      {/* Glow effects */}
      <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-gradient-to-r from-gray-500/5 via-white/20 to-gray-500/5 ${glowStyles[glowIntensity]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none`}></span>
      <span className="absolute inset-0 -z-10 bg-black rounded-full group-hover:bg-opacity-80 transition-all duration-300"></span>
      <span className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
    </motion.button>
  );
}
