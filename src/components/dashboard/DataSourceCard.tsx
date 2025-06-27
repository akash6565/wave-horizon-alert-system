
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Database, Cloud, CloudLightning } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataSourceCardProps {
  title: string;
  count: number;
  type: "satellite" | "buoy" | "drone" | "synthetic";
  className?: string;
}

const DataSourceCard: React.FC<DataSourceCardProps> = ({
  title,
  count,
  type,
  className,
}) => {
  const getIcon = () => {
    switch (type) {
      case "satellite":
        return <Satellite className="h-6 w-6" />;
      case "buoy":
        return <Database className="h-6 w-6" />;
      case "drone":
        return <Cloud className="h-6 w-6" />;
      case "synthetic":
        return <CloudLightning className="h-6 w-6" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "satellite":
        return {
          gradient: "from-blue-500/20 via-blue-400/10 to-transparent",
          iconColor: "text-blue-600",
          bgAccent: "bg-blue-50",
          border: "border-blue-200/50",
        };
      case "buoy":
        return {
          gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
          iconColor: "text-emerald-600",
          bgAccent: "bg-emerald-50",
          border: "border-emerald-200/50",
        };
      case "drone":
        return {
          gradient: "from-purple-500/20 via-purple-400/10 to-transparent",
          iconColor: "text-purple-600",
          bgAccent: "bg-purple-50",
          border: "border-purple-200/50",
        };
      case "synthetic":
        return {
          gradient: "from-amber-500/20 via-amber-400/10 to-transparent",
          iconColor: "text-amber-600",
          bgAccent: "bg-amber-50",
          border: "border-amber-200/50",
        };
    }
  };

  const colors = getColors();

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group border-0 shadow-sm",
      colors.border,
      className
    )}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full" />
      
      <CardHeader className="relative pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-3 text-slate-800">
          <div className={cn("p-2 rounded-lg transition-colors group-hover:scale-110 duration-300", colors.bgAccent)}>
            <span className={colors.iconColor}>
              {getIcon()}
            </span>
          </div>
          <span className="group-hover:text-slate-900 transition-colors">{title}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-slate-900 group-hover:scale-105 transition-transform duration-300">
            {count.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-slate-600 font-medium">Active sensors</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSourceCard;
