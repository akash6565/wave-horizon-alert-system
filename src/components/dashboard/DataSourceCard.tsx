
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
        return <Satellite className="h-5 w-5" />;
      case "buoy":
        return <Database className="h-5 w-5" />;
      case "drone":
        return <Cloud className="h-5 w-5" />;
      case "synthetic":
        return <CloudLightning className="h-5 w-5" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case "satellite":
        return "from-blue-500/20 to-blue-500/5";
      case "buoy":
        return "from-green-500/20 to-green-500/5";
      case "drone":
        return "from-purple-500/20 to-purple-500/5";
      case "synthetic":
        return "from-amber-500/20 to-amber-500/5";
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()}`} />
      <CardHeader className="relative pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {getIcon()}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">Active sensors</p>
      </CardContent>
    </Card>
  );
};

export default DataSourceCard;
