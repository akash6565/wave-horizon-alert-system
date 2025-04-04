
import { WaveData, ModelComparison, AlertConfig } from "@/types";

// Generate a random date within the last 24 hours
const getRandomRecentDate = () => {
  const now = new Date();
  const pastHours = Math.floor(Math.random() * 24); // Random hours in the past (0-24)
  const pastMinutes = Math.floor(Math.random() * 60); // Random minutes (0-59)
  now.setHours(now.getHours() - pastHours);
  now.setMinutes(now.getMinutes() - pastMinutes);
  return now.toISOString();
};

// Generate a random location around the world's oceans
const getRandomOceanLocation = () => {
  // Simplified - these are rough approximations of ocean locations
  const oceanLocations = [
    // Pacific Ocean
    { lat: Math.random() * 60 - 30, lng: Math.random() * 70 + 140 },
    // Atlantic Ocean
    { lat: Math.random() * 60 - 30, lng: Math.random() * 50 - 40 },
    // Indian Ocean
    { lat: Math.random() * 40 - 20, lng: Math.random() * 40 + 60 },
    // Southern Ocean
    { lat: Math.random() * 10 - 60, lng: Math.random() * 360 - 180 },
  ];

  return oceanLocations[Math.floor(Math.random() * oceanLocations.length)];
};

// Generate random wave data
export const generateMockWaveData = (count: number): WaveData[] => {
  const sources: Array<WaveData["source"]> = ["satellite", "buoy", "drone", "synthetic"];
  const data: WaveData[] = [];

  for (let i = 0; i < count; i++) {
    const location = getRandomOceanLocation();
    const waveHeight = Math.random() * 10; // 0-10 meters
    const source = sources[Math.floor(Math.random() * sources.length)];
    const confidence = Math.random();
    
    // Determine if this is an anomaly
    const isAnomaly = Math.random() > 0.8;
    const anomalyScore = isAnomaly ? 0.7 + Math.random() * 0.3 : undefined;
    
    // Set alert based on wave height
    let alert = undefined;
    if (waveHeight > 7) {
      alert = {
        level: "high",
        message: "Extreme wave height detected",
      };
    } else if (waveHeight > 4) {
      alert = {
        level: "medium",
        message: "Significant wave height detected",
      };
    } else if (isAnomaly && anomalyScore && anomalyScore > 0.85) {
      alert = {
        level: "low",
        message: "Anomalous wave pattern detected",
      };
    }
    
    data.push({
      id: `wave-${i}`,
      timestamp: getRandomRecentDate(),
      location: {
        lat: location.lat,
        lng: location.lng,
        name: `Ocean Region ${i}`,
      },
      source,
      measurements: {
        waveHeight,
        wavePeriod: 4 + Math.random() * 16, // 4-20 seconds
        waveDirection: Math.random() * 360, // 0-360 degrees
        windSpeed: Math.random() * 25, // 0-25 m/s
        windDirection: Math.random() * 360, // 0-360 degrees
      },
      confidence,
      anomalyScore,
      alert,
    });
  }

  return data;
};

// Model comparison data
export const modelComparisonData: ModelComparison[] = [
  {
    id: "model-1",
    name: "Traditional Statistical",
    type: "Statistical",
    metrics: {
      accuracy: 0.72,
      precision: 0.68,
      recall: 0.65,
      f1Score: 0.66,
      latency: 150,
    },
    features: ["Wave Height", "Period", "Direction"],
    description: "Traditional statistical models using time-series analysis",
  },
  {
    id: "model-2",
    name: "CNN Spatial",
    type: "CNN",
    metrics: {
      accuracy: 0.85,
      precision: 0.82,
      recall: 0.79,
      f1Score: 0.80,
      latency: 220,
    },
    features: ["Satellite Imagery", "Spatial Patterns"],
    description: "Convolutional Neural Network for spatial pattern recognition",
  },
  {
    id: "model-3",
    name: "LSTM Temporal",
    type: "LSTM",
    metrics: {
      accuracy: 0.83,
      precision: 0.81,
      recall: 0.85,
      f1Score: 0.83,
      latency: 180,
    },
    features: ["Wave Sequence", "Temporal Patterns"],
    description: "Long Short-Term Memory network for temporal forecasting",
  },
  {
    id: "model-4",
    name: "Hybrid CNN+LSTM",
    type: "CNN+LSTM",
    metrics: {
      accuracy: 0.91,
      precision: 0.89,
      recall: 0.92,
      f1Score: 0.90,
      latency: 250,
    },
    features: ["Satellite Imagery", "Temporal Sequence", "Multi-source Fusion"],
    description: "Hybrid architecture combining CNN for spatial features and LSTM for temporal dynamics",
  },
  {
    id: "model-5",
    name: "Random Forest",
    type: "Traditional ML",
    metrics: {
      accuracy: 0.78,
      precision: 0.77,
      recall: 0.74,
      f1Score: 0.75,
      latency: 120,
    },
    features: ["Numeric Features", "Wind Data"],
    description: "Ensemble method using multiple decision trees",
  },
];

// Alert configuration data
export const alertConfigurations: AlertConfig[] = [
  {
    id: "alert-1",
    name: "High Wave Alert - Pacific",
    conditions: {
      waveHeight: {
        min: 6,
      },
      windSpeed: {
        min: 15,
      },
    },
    regions: [
      {
        lat: 23.5,
        lng: -175.2,
        radius: 500,
        name: "Central Pacific",
      },
    ],
    priority: "high",
    active: true,
  },
  {
    id: "alert-2",
    name: "Storm Monitoring - Atlantic",
    conditions: {
      waveHeight: {
        min: 4,
      },
      wavePeriod: {
        min: 10,
      },
    },
    regions: [
      {
        lat: 28.7,
        lng: -70.5,
        radius: 300,
        name: "North Atlantic",
      },
    ],
    priority: "medium",
    active: true,
  },
  {
    id: "alert-3",
    name: "Coastal Monitoring",
    conditions: {
      waveHeight: {
        min: 2.5,
      },
    },
    regions: [
      {
        lat: -33.8,
        lng: 151.2,
        radius: 100,
        name: "Sydney Coast",
      },
      {
        lat: 37.8,
        lng: -122.4,
        radius: 100,
        name: "San Francisco Bay",
      },
    ],
    priority: "low",
    active: true,
  },
];

// Get recent alerts from wave data
export const getRecentAlerts = (data: WaveData[], limit = 5) => {
  return data
    .filter(item => item.alert)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

// Helper to get appropriate color class based on alert level
export const getAlertColorClass = (level: "low" | "medium" | "high" | undefined) => {
  switch (level) {
    case "high":
      return "bg-alert-high";
    case "medium":
      return "bg-alert-medium";
    case "low":
      return "bg-alert-low";
    default:
      return "bg-muted";
  }
};
