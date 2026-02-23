import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaveData } from "@/types";
import { getAlertColorClass } from "@/utils/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapIcon } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapViewProps {
  data: WaveData[];
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({ data, className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !apiKey || showKeyInput) return;

    mapboxgl.accessToken = apiKey;

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [0, 20],
      zoom: 1.8,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
    };
  }, [apiKey, showKeyInput]);

  useEffect(() => {
    if (!map.current || !apiKey || showKeyInput || !data.length) return;

    const handleLoad = () => {
      if (!map.current) return;
      clearMarkers();
      addMarkers(data);
    };

    map.current.on("load", handleLoad);

    if (map.current.loaded()) {
      handleLoad();
    }

    return () => {
      map.current?.off("load", handleLoad);
    };
  }, [data, apiKey, showKeyInput]);

  // --- Helper functions ---
  function clearMarkers() {
    document.querySelectorAll(".wave-marker").forEach(marker => marker.remove());
  }

  function getMarkerSize(level?: string): number {
    if (!level) return 12;
    if (level === "high") return 24;
    if (level === "medium") return 20;
    return 16;
  }

  function getAlertColor(level?: string): string {
    if (level === "high") return "#ef4444";
    if (level === "medium") return "#f59e0b";
    return "#10b981";
  }

  function addMarkers(data: WaveData[]) {
    data.forEach((item) => {
      if (!map.current) return;
      const el = createMarkerElement(item);
      const popup = createPopup(item);

      new mapboxgl.Marker(el)
        .setLngLat([item.location.lng, item.location.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }

  function createMarkerElement(item: WaveData): HTMLDivElement {
    const el = document.createElement("div");
    const size = getMarkerSize(item.alert?.level);

    const alertClass = item.alert
      ? getAlertColorClass(item.alert.level)
      : "bg-blue-500";

    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.borderRadius = "50%";
    el.style.cursor = "pointer";
    el.style.border = "2px solid white";
    el.className = `${alertClass} wave-marker`;

    if (item.alert?.level === "high") {
      el.style.animation = "pulse 1.5s infinite";
    }

    return el;
  }

  function createPopup(item: WaveData): mapboxgl.Popup {
    const alertColor = getAlertColor(item.alert?.level);

    return new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div style="font-family: system-ui, sans-serif; padding: 8px;">
        <h3 style="font-weight: bold; margin-bottom: 8px;">${item.location.name || "Ocean Location"}</h3>
        <p><strong>Source:</strong> ${item.source}</p>
        <p><strong>Wave Height:</strong> ${item.measurements.waveHeight.toFixed(1)}m</p>
        <p><strong>Wind Speed:</strong> ${item.measurements.windSpeed.toFixed(1)} m/s</p>
        ${item.alert ? `<p style="color: ${alertColor}; font-weight: bold; margin-top: 8px;">${item.alert.message}</p>` : ""}
      </div>
    `);
  }

  const handleSubmitApiKey = () => {
    if (apiKey) {
      setShowKeyInput(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Wave Monitor Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden relative h-[500px]">
        {showKeyInput ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-6">
            <MapIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">MapBox API Key Required</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Please enter your MapBox public token to display the interactive map.
              You can get one for free at mapbox.com
            </p>
            <div className="flex gap-2 w-full max-w-md">
              <Input
                type="text"
                placeholder="Enter your MapBox public token"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSubmitApiKey}>Load Map</Button>
            </div>
          </div>
        ) : null}
        <div ref={mapContainer} className="w-full h-full" />
      </CardContent>
    </Card>
  );
};

export default MapView;
