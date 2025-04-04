
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaveData } from "@/types";
import { format } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WaveHeightChartProps {
  data: WaveData[];
  className?: string;
}

const WaveHeightChart: React.FC<WaveHeightChartProps> = ({ data, className }) => {
  const chartData = useMemo(() => {
    // Sort by timestamp
    const sortedData = [...data].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Group by source and timestamp (hourly)
    const groupedData: Record<string, any> = {};

    sortedData.forEach((item) => {
      const date = new Date(item.timestamp);
      const hour = date.getHours();
      const timeKey = `${hour}:00`;

      if (!groupedData[timeKey]) {
        groupedData[timeKey] = {
          time: timeKey,
          satellite: 0,
          buoy: 0,
          drone: 0,
          synthetic: 0,
          count: {
            satellite: 0,
            buoy: 0,
            drone: 0,
            synthetic: 0,
          },
        };
      }

      groupedData[timeKey][item.source] += item.measurements.waveHeight;
      groupedData[timeKey].count[item.source] += 1;
    });

    // Calculate averages
    return Object.values(groupedData).map((group: any) => ({
      time: group.time,
      satellite: group.count.satellite ? group.satellite / group.count.satellite : 0,
      buoy: group.count.buoy ? group.buoy / group.count.buoy : 0,
      drone: group.count.drone ? group.drone / group.count.drone : 0,
      synthetic: group.count.synthetic ? group.synthetic / group.count.synthetic : 0,
    }));
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Wave Height Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="time" />
              <YAxis label={{ value: "Height (m)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="satellite"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="buoy"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="drone"
                stackId="3"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
                activeDot={{ r: 6 }}
              />
              <Area
                type="monotone"
                dataKey="synthetic"
                stackId="4"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.3}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaveHeightChart;
