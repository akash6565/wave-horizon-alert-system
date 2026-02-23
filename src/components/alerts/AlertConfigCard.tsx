
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AlertConfig } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Map } from "lucide-react";

interface AlertConfigCardProps {
  config: AlertConfig;
  className?: string;
}

const AlertConfigCard: React.FC<AlertConfigCardProps> = ({ config, className }) => {
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-alert-high text-white";
      case "medium":
        return "bg-alert-medium text-white";
      case "low":
        return "bg-alert-low text-white";
      default:
        return "bg-secondary";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{config.name}</CardTitle>
            <CardDescription>
              Priority: <Badge className={getPriorityClass(config.priority)}>{config.priority}</Badge>
            </CardDescription>
          </div>
          <Switch checked={config.active} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Conditions</h4>
            <div className="grid grid-cols-2 gap-2">
              {config.conditions.waveHeight && (
                <div className="bg-muted p-2 rounded-md text-sm">
                  <span className="font-medium">Wave Height:</span>{" "}
                  {config.conditions.waveHeight.min
                    ? `>${config.conditions.waveHeight.min}m`
                    : ""}
                  {config.conditions.waveHeight.max
                    ? `${config.conditions.waveHeight.min ? " to " : "<"}${
                        config.conditions.waveHeight.max
                      }m`
                    : ""}
                </div>
              )}
              {config.conditions.wavePeriod && (
                <div className="bg-muted p-2 rounded-md text-sm">
                  <span className="font-medium">Wave Period:</span>{" "}
                  {config.conditions.wavePeriod.min
                    ? `>${config.conditions.wavePeriod.min}s`
                    : ""}
                  {config.conditions.wavePeriod.max
                    ? `${config.conditions.wavePeriod.min ? " to " : "<"}${
                        config.conditions.wavePeriod.max
                      }s`
                    : ""}
                </div>
              )}
              {config.conditions.windSpeed && (
                <div className="bg-muted p-2 rounded-md text-sm">
                  <span className="font-medium">Wind Speed:</span>{" "}
                  {config.conditions.windSpeed.min
                    ? `>${config.conditions.windSpeed.min}m/s`
                    : ""}
                  {config.conditions.windSpeed.max
                    ? `${config.conditions.windSpeed.min ? " to " : "<"}${
                        config.conditions.windSpeed.max
                      }m/s`
                    : ""}
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Monitored Regions</h4>
            <div className="flex flex-wrap gap-2">
              {config.regions.map((region) => (
                <div
                  key={region.id}
                  className="bg-muted p-2 rounded-md text-sm flex items-center gap-1"
                >
                  <Map className="h-3 w-3" />
                  <span>{region.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertConfigCard;
