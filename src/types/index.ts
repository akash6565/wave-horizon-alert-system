
export interface WaveData {
  id: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
    name?: string;
  };
  source: "satellite" | "buoy" | "drone" | "synthetic";
  measurements: {
    waveHeight: number; // in meters
    wavePeriod: number; // in seconds
    waveDirection: number; // in degrees
    windSpeed: number; // in m/s
    windDirection: number; // in degrees
  };
  confidence: number; // 0-1
  anomalyScore?: number; // 0-1
  alert?: {
    level: "low" | "medium" | "high";
    message: string;
  };
}

export interface ModelComparison {
  id: string;
  name: string;
  type: "CNN" | "LSTM" | "CNN+LSTM" | "Statistical" | "Traditional ML";
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    latency: number; // in milliseconds
  };
  features: string[];
  description: string;
}

export interface AlertConfig {
  id: string;
  name: string;
  conditions: {
    waveHeight?: {
      min?: number;
      max?: number;
    };
    wavePeriod?: {
      min?: number;
      max?: number;
    };
    windSpeed?: {
      min?: number;
      max?: number;
    };
  };
  regions: Array<{
    lat: number;
    lng: number;
    radius: number; // in km
    name?: string;
  }>;
  priority: "low" | "medium" | "high";
  active: boolean;
}
