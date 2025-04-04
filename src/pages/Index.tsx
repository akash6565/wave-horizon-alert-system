
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { generateMockWaveData, getRecentAlerts } from "@/utils/mockData";
import { WaveData } from "@/types";
import DataSourceCard from "@/components/dashboard/DataSourceCard";
import RecentAlertsList from "@/components/dashboard/RecentAlertsList";
import WaveMetricsCard from "@/components/dashboard/WaveMetricsCard";
import WaveHeightChart from "@/components/dashboard/WaveHeightChart";
import MapView from "@/components/dashboard/MapView";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [waveData, setWaveData] = useState<WaveData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initial data load
    setIsLoading(true);
    const initialData = generateMockWaveData(50);
    setWaveData(initialData);
    setIsLoading(false);

    // Set up simulated real-time updates
    const intervalId = setInterval(() => {
      // Generate 1-3 new data points
      const newCount = Math.floor(Math.random() * 3) + 1;
      const newData = generateMockWaveData(newCount);
      
      // Check for high alerts
      const highAlerts = newData.filter(
        (item) => item.alert && item.alert.level === "high"
      );
      
      // Show toast for high alerts
      if (highAlerts.length > 0) {
        highAlerts.forEach((alert) => {
          toast({
            title: "High Priority Alert",
            description: `${alert.alert?.message} at ${alert.location.name || "ocean location"}`,
            variant: "destructive",
          });
        });
      }
      
      // Update state with new data
      setWaveData((prev) => [...newData, ...prev].slice(0, 100));
    }, 30000); // Every 30 seconds

    return () => clearInterval(intervalId);
  }, [toast]);

  // Count by source
  const satelliteCount = waveData.filter((item) => item.source === "satellite").length;
  const buoyCount = waveData.filter((item) => item.source === "buoy").length;
  const droneCount = waveData.filter((item) => item.source === "drone").length;
  const syntheticCount = waveData.filter((item) => item.source === "synthetic").length;

  // Get recent alerts
  const recentAlerts = getRecentAlerts(waveData);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Loading Data</h2>
            <p className="text-muted-foreground">
              Please wait while we fetch wave detection data...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <DataSourceCard
            title="Satellite Data"
            count={satelliteCount}
            type="satellite"
          />
          <DataSourceCard
            title="Buoy Data"
            count={buoyCount}
            type="buoy"
          />
          <DataSourceCard
            title="Drone Data"
            count={droneCount}
            type="drone"
          />
          <DataSourceCard
            title="Synthetic Data"
            count={syntheticCount}
            type="synthetic"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WaveHeightChart data={waveData} className="lg:col-span-2" />
          <RecentAlertsList alerts={recentAlerts} />
        </div>

        <MapView data={waveData} />

        <WaveMetricsCard data={waveData} />
      </div>
    </Layout>
  );
};

export default Index;
