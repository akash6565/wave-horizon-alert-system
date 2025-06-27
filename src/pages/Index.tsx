
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/dashboard/HeroSection";
import DataSourceCard from "@/components/dashboard/DataSourceCard";
import WaveMetricsCard from "@/components/dashboard/WaveMetricsCard";
import WaveHeightChart from "@/components/dashboard/WaveHeightChart";
import MapView from "@/components/dashboard/MapView";
import RecentAlertsList from "@/components/dashboard/RecentAlertsList";
import { Separator } from "@/components/ui/separator";

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
              <WaveHeightChart />
              <MapView />
            </div>
            <div className="space-y-6">
              <WaveMetricsCard />
              <RecentAlertsList />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
