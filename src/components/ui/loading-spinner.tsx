import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const LoadingSpinner = ({
  size = "md",
  color = "primary",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  const colorClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    white: "border-white",
    purple: "border-purple-600",
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-t-transparent ${
        sizeClasses[size]
      } ${colorClasses[color] || `border-${color}`} ${className}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
