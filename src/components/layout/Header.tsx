
import React from "react";
import { Cloud, Database, Map, Satellite, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Models", path: "/models" },
    { label: "Alerts", path: "/alerts" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 w-full border-b border-slate-200/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Cloud className="h-8 w-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                WaveHorizon
              </h1>
              <p className="text-xs text-slate-500 -mt-1">Ocean Intelligence</p>
            </div>
          </div>
          
          <Separator orientation="vertical" className="mx-2 h-8" />
          
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg px-4"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-green-700">Real-time</p>
                <Switch defaultChecked size="sm" />
              </div>
            </div>
            
            <Separator orientation="vertical" className="h-8" />
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                <Satellite className="h-4 w-4" />
                <span className="text-xs font-medium">Satellite</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors">
                <Database className="h-4 w-4" />
                <span className="text-xs font-medium">Buoy</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors">
                <Map className="h-4 w-4" />
                <span className="text-xs font-medium">WRF</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="justify-start text-left h-12"
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Real-time Mode</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
