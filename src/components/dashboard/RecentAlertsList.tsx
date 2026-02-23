import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaveData } from "@/types";
import { getAlertColorClass } from "@/utils/mockData";
import { format } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";

interface RecentAlertsListProps {
  alerts: WaveData[];
  className?: string;
}

const RecentAlertsList: React.FC<RecentAlertsListProps> = ({ alerts, className }) => {
  if (!alerts.length) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent alerts</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-2">
          {alerts.map((alert) => {
            // Extracted ternary into independent statement
            const threshold = alert.measurements.waveHeight > 6 ? 6 : 3;
            const isWaveHeightAboveThreshold = alert.measurements.waveHeight > threshold;

            return (
              <div key={alert.id} className="flex items-center px-6 py-2 hover:bg-muted/50">
                <div className="mr-4">
                  <div
                    className={`${getAlertColorClass(
                      alert.alert?.level
                    )} h-10 w-10 rounded-full flex items-center justify-center text-white`}
                  >
                    {isWaveHeightAboveThreshold ? (
                      <ArrowUp className="h-5 w-5" />
                    ) : (
                      <ArrowDown className="h-5 w-5" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium truncate">{alert.alert?.message}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {format(new Date(alert.timestamp), "HH:mm")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground truncate">
                      {alert.location.name} · {alert.source} · 
                      Wave Height: {alert.measurements.waveHeight.toFixed(1)}m
                    </p>
                    <span className="text-xs font-medium whitespace-nowrap ml-2">
                      {alert.alert?.level === "high" && "Critical"}
                      {alert.alert?.level === "medium" && "Warning"}
                      {alert.alert?.level === "low" && "Notice"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlertsList;
