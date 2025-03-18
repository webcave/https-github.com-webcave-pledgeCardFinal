import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} aspect-square`}>
        <img src="/logo.png" alt="PledgeCard Logo" className="h-full w-auto" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold leading-tight">Pledge Card</span>
          <span className="text-xs text-muted-foreground leading-tight">
            Digital Payments Wallet
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
