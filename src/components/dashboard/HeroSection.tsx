
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, Activity, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  const stats = [
    { icon: Waves, label: "Wave Patterns", value: "2.4M", trend: "+12%" },
    { icon: Activity, label: "Real-time Feeds", value: "847", trend: "+5%" },
    { icon: Shield, label: "Accuracy Rate", value: "99.2%", trend: "+0.3%" },
    { icon: Zap, label: "Processing Speed", value: "< 50ms", trend: "Optimal" },
  ];

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-cyan-50 to-slate-50 rounded-2xl"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-transparent rounded-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-200/30 to-transparent rounded-2xl"></div>
      
      <Card className="relative p-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1">
                🌊 Advanced Ocean Intelligence
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                High-Resolution
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Wave Detection
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Multi-source data fusion with hybrid CNN+LSTM architecture for real-time ocean wave pattern analysis and intelligent alerting.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <stat.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto animate-pulse-wave">
                  <Waves className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Real-Time</div>
                  <div className="text-sm opacity-90">Ocean Monitoring</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HeroSection;
