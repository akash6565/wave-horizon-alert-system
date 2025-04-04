
import React from "react";
import Layout from "@/components/layout/Layout";
import { alertConfigurations } from "@/utils/mockData";
import AlertConfigCard from "@/components/alerts/AlertConfigCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Alerts = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Alert Configuration</h1>
          <p className="text-muted-foreground">
            Manage dynamic alert thresholds for wave pattern detection
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Bayesian Adaptive Thresholds</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Our system uses Bayesian inference to dynamically adjust alert thresholds based on historical data patterns and current ocean conditions, significantly reducing false alarms while maintaining sensitivity to genuine anomalies.
              </p>
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Adaptive Learning</h4>
                  <p className="text-xs text-muted-foreground">
                    Thresholds automatically adjust based on seasonal patterns and recent observations
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Contextual Awareness</h4>
                  <p className="text-xs text-muted-foreground">
                    Different thresholds applied based on location, time, and surrounding conditions
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <h4 className="font-medium text-sm mb-1">Confidence Weighting</h4>
                  <p className="text-xs text-muted-foreground">
                    Alert priority adjusted based on data quality and sensor reliability
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4">
              <div className="w-full max-w-md p-4 bg-ocean-800 rounded-lg text-white">
                <h3 className="font-medium mb-3 text-center">False Alarm Reduction</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Static Thresholds</span>
                  <span className="font-bold">32%</span>
                </div>
                <div className="w-full bg-ocean-700 rounded-full h-2 mb-4">
                  <div className="bg-orange-400 h-2 rounded-full" style={{ width: "32%" }}></div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Bayesian Adaptive</span>
                  <span className="font-bold">85%</span>
                </div>
                <div className="w-full bg-ocean-700 rounded-full h-2 mb-4">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <p className="text-xs text-center text-ocean-200 mt-2">
                  Percentage reduction in false alarms during performance testing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alertConfigurations.map((config) => (
            <AlertConfigCard key={config.id} config={config} />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Real-Time Processing Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm mb-2">Data Ingest</h3>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Apache Kafka streaming platform</li>
                  <li>Multiple data source connectors</li>
                  <li>Real-time data validation</li>
                  <li>Automatic data quality scoring</li>
                </ul>
              </div>
              <div className="flex-1 bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm mb-2">Processing</h3>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Apache Flink stream processing</li>
                  <li>CNN+LSTM model inference</li>
                  <li>Dynamic threshold evaluation</li>
                  <li>Anomaly score calculation</li>
                </ul>
              </div>
              <div className="flex-1 bg-muted p-4 rounded-lg">
                <h3 className="font-medium text-sm mb-2">Alert Distribution</h3>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Multi-channel notifications</li>
                  <li>Priority-based routing</li>
                  <li>Automatic escalation</li>
                  <li>Alert aggregation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Alerts;
