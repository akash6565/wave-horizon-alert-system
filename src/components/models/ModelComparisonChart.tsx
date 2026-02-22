
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelComparison } from "@/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ModelComparisonChartProps {
  models: ModelComparison[];
  metric: keyof ModelComparison["metrics"];
  title: string;
  className?: string;
}

const ModelComparisonChart: React.FC<ModelComparisonChartProps> = ({
  models,
  metric,
  title,
  className,
}) => {
  const chartData = models.map((model) => ({
    name: model.name,
    value: model.metrics[metric],
    type: model.type,
  }));

const getColor = (type: string) => {
  const colorMap: Record<string, string> = {
    "CNN+LSTM": "#3b82f6", // blue
    "CNN": "#8b5cf6",      // purple
    "LSTM": "#10b981",     // green
    "Statistical": "#f59e0b", // amber
  };

  return colorMap[type] ?? "#6b7280"; // default gray
};


  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                tick={{ fontSize: 12 }} 
              />
              <YAxis 
                domain={[0, metric === "latency" ? "dataMax" : 1]} 
                tickFormatter={metric === "latency" ? undefined : (value) => `${(value * 100).toFixed(0)}%`}
              />
              <Tooltip 
                formatter={(value: number) => 
                  metric === "latency" ? 
                    `${value} ms` : 
                    `${(value * 100).toFixed(1)}%`
                } 
              />
              <Legend />
              <Bar 
                dataKey="value" 
                name={metric === "latency" ? "Latency (ms)" : metric.charAt(0).toUpperCase() + metric.slice(1)} 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelComparisonChart;
