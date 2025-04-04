
import React from "react";
import Layout from "@/components/layout/Layout";
import { modelComparisonData } from "@/utils/mockData";
import ModelComparisonChart from "@/components/models/ModelComparisonChart";
import ModelFeatureComparison from "@/components/models/ModelFeatureComparison";
import ModelPerformanceRadar from "@/components/models/ModelPerformanceRadar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Models = () => {
  // Highlight the CNN+LSTM hybrid model
  const hybridModel = modelComparisonData.find((model) => model.type === "CNN+LSTM");

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Wave Detection Models</h1>
          <p className="text-muted-foreground">
            Compare different model architectures for wave pattern detection and analysis
          </p>
        </div>

        <Card className="bg-gradient-to-r from-ocean-800 to-ocean-900 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Hybrid CNN+LSTM Architecture</CardTitle>
            <CardDescription className="text-ocean-100">
              Our recommended model for optimal performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Architecture Overview</h3>
                <p className="text-sm text-ocean-100 mb-4">
                  Our hybrid model combines CNN layers for spatial feature extraction from satellite imagery with LSTM layers for temporal sequence modeling from buoy data. This fusion approach achieves superior accuracy through multi-source data integration.
                </p>
                <h3 className="font-medium mb-2">Key Strengths</h3>
                <ul className="list-disc list-inside text-sm text-ocean-100 space-y-1">
                  <li>Multi-source data fusion capability</li>
                  <li>Robust to missing or noisy data</li>
                  <li>Captures both spatial and temporal patterns</li>
                  <li>Adaptive thresholding for dynamic environments</li>
                  <li>Higher accuracy for anomaly detection</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-ocean-700/50 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1">
                      {hybridModel ? (hybridModel.metrics.accuracy * 100).toFixed(1) : "N/A"}%
                    </div>
                    <div className="text-xs text-ocean-200">Accuracy</div>
                  </div>
                  <div className="bg-ocean-700/50 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1">
                      {hybridModel ? (hybridModel.metrics.f1Score * 100).toFixed(1) : "N/A"}%
                    </div>
                    <div className="text-xs text-ocean-200">F1 Score</div>
                  </div>
                  <div className="bg-ocean-700/50 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1">
                      {hybridModel ? (hybridModel.metrics.precision * 100).toFixed(1) : "N/A"}%
                    </div>
                    <div className="text-xs text-ocean-200">Precision</div>
                  </div>
                  <div className="bg-ocean-700/50 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1">
                      {hybridModel ? (hybridModel.metrics.recall * 100).toFixed(1) : "N/A"}%
                    </div>
                    <div className="text-xs text-ocean-200">Recall</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModelComparisonChart 
            models={modelComparisonData}
            metric="accuracy"
            title="Accuracy Comparison"
          />
          <ModelComparisonChart 
            models={modelComparisonData}
            metric="f1Score"
            title="F1 Score Comparison"
          />
        </div>

        <ModelPerformanceRadar models={modelComparisonData} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModelComparisonChart 
            models={modelComparisonData}
            metric="latency"
            title="Processing Latency (ms)"
          />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Explainable AI Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our hybrid CNN+LSTM model incorporates SHAP (SHapley Additive exPlanations) values to provide interpretability of model predictions, essential for critical maritime applications.
              </p>
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Feature Importance</h4>
                  <p className="text-xs text-muted-foreground">
                    SHAP values quantify the contribution of each feature to the prediction, enabling users to understand which data sources most influence alerts.
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Decision Boundary Visualization</h4>
                  <p className="text-xs text-muted-foreground">
                    Interactive visualizations show how combinations of wave height, period, and wind speed trigger different alert thresholds.
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Confidence Metrics</h4>
                  <p className="text-xs text-muted-foreground">
                    Each prediction includes confidence intervals and uncertainty estimates, critical for operational decision-making.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ModelFeatureComparison models={modelComparisonData} />
      </div>
    </Layout>
  );
};

export default Models;
