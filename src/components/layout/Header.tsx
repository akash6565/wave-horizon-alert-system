
import React from "react";
import { Cloud, Database, Map, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-10 w-full border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">WaveHorizon</h1>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <nav className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-sm" 
              onClick={() => navigate("/")}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="text-sm" 
              onClick={() => navigate("/models")}
            >
              Models
            </Button>
            <Button 
              variant="ghost" 
              className="text-sm" 
              onClick={() => navigate("/alerts")}
            >
              Alerts
            </Button>
            <Button 
              variant="ghost" 
              className="text-sm" 
              onClick={() => navigate("/settings")}
            >
              Settings
            </Button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm hidden md:block">Real-time</p>
            <Switch defaultChecked />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Satellite className="h-4 w-4" />
              <span className="text-xs">Satellite</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Database className="h-4 w-4" />
              <span className="text-xs">Buoy</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Map className="h-4 w-4" />
              <span className="text-xs">WRF</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
