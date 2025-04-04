
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelComparison } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface ModelFeatureComparisonProps {
  models: ModelComparison[];
  className?: string;
}

const ModelFeatureComparison: React.FC<ModelFeatureComparisonProps> = ({
  models,
  className,
}) => {
  // Collect all unique features
  const allFeatures = [...new Set(models.flatMap((model) => model.features))];

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Feature Comparison</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Model</th>
                {allFeatures.map((feature) => (
                  <th key={feature} className="text-left py-3 px-4 font-medium">
                    {feature}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{model.name}</div>
                    <div className="text-xs text-muted-foreground">{model.type}</div>
                  </td>
                  {allFeatures.map((feature) => (
                    <td key={`${model.id}-${feature}`} className="py-3 px-4">
                      {model.features.includes(feature) ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelFeatureComparison;
