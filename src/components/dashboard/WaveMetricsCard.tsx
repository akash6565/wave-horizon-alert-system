
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { WaveData } from "@/types";

interface WaveMetricsCardProps {
  data: WaveData[];
  className?: string;
}

const WaveMetricsCard: React.FC<WaveMetricsCardProps> = ({ data, className }) => {
  // Calculate metrics
  const averageWaveHeight = data.reduce((sum, item) => sum + item.measurements.waveHeight, 0) / (data.length || 1);
  const maxWaveHeight = Math.max(...data.map(item => item.measurements.waveHeight));
  const averageWindSpeed = data.reduce((sum, item) => sum + item.measurements.windSpeed, 0) / (data.length || 1);
  const averageConfidence = data.reduce((sum, item) => sum + item.confidence, 0) / (data.length || 1);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Wave Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-sm font-medium">Average Wave Height</p>
              <span className="text-sm">{averageWaveHeight.toFixed(1)}m</span>
            </div>
            <Progress 
              value={(averageWaveHeight / 10) * 100} 
              className="h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Max: {maxWaveHeight.toFixed(1)}m
            </p>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between mb-1">
              <p className="text-sm font-medium">Average Wind Speed</p>
              <span className="text-sm">{averageWindSpeed.toFixed(1)} m/s</span>
            </div>
            <Progress 
              value={(averageWindSpeed / 25) * 100} 
              className="h-2"
            />
          </div>

          <Separator />

          <div>
            <div className="flex justify-between mb-1">
              <p className="text-sm font-medium">Data Confidence</p>
              <span className="text-sm">{(averageConfidence * 100).toFixed(0)}%</span>
            </div>
            <Progress 
              value={averageConfidence * 100} 
              className="h-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Based on sensor reliability and data quality
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaveMetricsCard;
