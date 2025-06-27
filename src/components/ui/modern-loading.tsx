
import React from "react";
import { Waves } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernLoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const ModernLoading: React.FC<ModernLoadingProps> = ({
  size = "md",
  text = "Loading...",
  className,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-20"></div>
        <div className="relative p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse-wave">
          <Waves className={cn("text-white", sizeClasses[size])} />
        </div>
      </div>
      {text && (
        <p className="text-sm text-slate-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default ModernLoading;
