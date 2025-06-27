
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/dashboard/HeroSection";
import DataSourceCard from "@/components/dashboard/DataSourceCard";
import WaveMetricsCard from "@/components/dashboard/WaveMetricsCard";
import WaveHeightChart from "@/components/dashboard/WaveHeightChart";
import MapView from "@/components/dashboard/MapView";
import RecentAlertsList from "@/components/dashboard/RecentAlertsList";
import { Separator } from "@/components/ui/separator";
import { WaveData } from "@/types";

// Mock data for the dashboard
const mockWaveData: WaveData[] = [
  {
    id: "1",
    timestamp: new Date().toISOString(),
    location: { lat: 40.7128, lng: -74.0060, name: "New York Coast" },
    source: "satellite",
    measurements: {
      waveHeight: 3.2,
      wavePeriod: 8.5,
      waveDirection: 45,
      windSpeed: 12.3,
      windDirection: 180
    },
    confidence: 0.95,
    alert: {
      level: "medium",
      message: "Moderate wave conditions detected"
    }
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    location: { lat: 34.0522, lng: -118.2437, name: "Los Angeles Coast" },
    source: "buoy",
    measurements: {
      waveHeight: 2.1,
      wavePeriod: 6.2,
      waveDirection: 90,
      windSpeed: 8.7,
      windDirection: 225
    },
    confidence: 0.88
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    location: { lat: 25.7617, lng: -80.1918, name: "Miami Coast" },
    source: "drone",
    measurements: {
      waveHeight: 4.8,
      wavePeriod: 10.1,
      waveDirection: 120,
      windSpeed: 18.5,
      windDirection: 90
    },
    confidence: 0.92,
    alert: {
      level: "high",
      message: "High wave conditions - Exercise caution"
    }
  }
];

const mockAlerts = mockWaveData.filter(data => data.alert);

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Data Sources Overview */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900">Data Sources</h2>
            <Separator className="flex-1" />
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Multi-Source Integration
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DataSourceCard
              title="Satellite Data"
              count={156}
              type="satellite"
            />
            <DataSourceCard
              title="Ocean Buoys"
              count={89}
              type="buoy"
            />
            <DataSourceCard
              title="Drone Sensors"
              count={34}
              type="drone"
            />
            <DataSourceCard
              title="WRF Synthetic"
              count={12}
              type="synthetic"
            />
          </div>
        </section>

        {/* Wave Analytics */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900">Wave Analytics</h2>
            <Separator className="flex-1" />
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              CNN+LSTM Hybrid Model
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <WaveHeightChart data={mockWaveData} />
              <MapView data={mockWaveData} />
            </div>
            <div className="space-y-6">
              <WaveMetricsCard data={mockWaveData} />
              <RecentAlertsList alerts={mockAlerts} />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
