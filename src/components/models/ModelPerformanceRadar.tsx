
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelComparison } from "@/types";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ModelPerformanceRadarProps {
  models: ModelComparison[];
  className?: string;
}

const ModelPerformanceRadar: React.FC<ModelPerformanceRadarProps> = ({
  models,
  className,
}) => {
  // Prepare data for radar chart
  const metricsKeys: Array<keyof ModelComparison["metrics"]> = [
    "accuracy",
    "precision",
    "recall",
    "f1Score",
  ];

  const radarData = metricsKeys.map((key) => {
    const item: Record<string, any> = {
      metric: key.charAt(0).toUpperCase() + key.slice(1),
    };

    models.forEach((model) => {
      item[model.name] = model.metrics[key];
    });

    return item;
  });

  // Get a color for each model
  const getModelColor = (index: number) => {
    const colors = [
      "#3b82f6", // blue
      "#10b981", // green  
      "#8b5cf6", // purple
      "#f59e0b", // amber
      "#ef4444", // red
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Performance Metrics Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
              <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
              
              {models.map((model, index) => (
                <Radar
                  key={model.id}
                  name={model.name}
                  dataKey={model.name}
                  stroke={getModelColor(index)}
                  fill={getModelColor(index)}
                  fillOpacity={0.2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelPerformanceRadar;
