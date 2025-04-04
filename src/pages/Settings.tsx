
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">System Settings</h1>
          <p className="text-muted-foreground">
            Configure the wave detection system parameters and data sources
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="data-sources">Data Sources</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mapboxApiKey">Mapbox API Key</Label>
                    <Input id="mapboxApiKey" placeholder="Enter your Mapbox API key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weatherApiKey">Weather API Key</Label>
                    <Input id="weatherApiKey" placeholder="Enter your Weather API key" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Keys</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="refreshRate">Data Refresh Rate</Label>
                    <span className="text-sm">30s</span>
                  </div>
                  <Slider defaultValue={[30]} min={5} max={60} step={5} />
                  <p className="text-xs text-muted-foreground">
                    How often to fetch new data (in seconds)
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="realtime">Real-time Updates</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive real-time data updates
                      </p>
                    </div>
                    <Switch id="realtime" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animations">Enable Animations</Label>
                      <p className="text-xs text-muted-foreground">
                        Show animations in visualizations
                      </p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="darkMode">Use System Theme</Label>
                      <p className="text-xs text-muted-foreground">
                        Follow system dark/light mode
                      </p>
                    </div>
                    <Switch id="darkMode" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data-sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Source Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Satellite Data</h3>
                        <p className="text-xs text-muted-foreground">
                          Enable satellite sensor data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Data Provider</Label>
                      <Select defaultValue="sentinel">
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sentinel">Sentinel-1</SelectItem>
                          <SelectItem value="landsat">Landsat-8</SelectItem>
                          <SelectItem value="modis">MODIS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Buoy Data</h3>
                        <p className="text-xs text-muted-foreground">
                          Enable oceanographic buoy data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Data Provider</Label>
                      <Select defaultValue="noaa">
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="noaa">NOAA</SelectItem>
                          <SelectItem value="ndbc">NDBC</SelectItem>
                          <SelectItem value="metocean">MetOcean</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Drone Data</h3>
                        <p className="text-xs text-muted-foreground">
                          Enable UAV sensor data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Data Provider</Label>
                      <Select defaultValue="custom">
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">Custom UAV</SelectItem>
                          <SelectItem value="saildrone">Saildrone</SelectItem>
                          <SelectItem value="liquid">Liquid Robotics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Synthetic Data</h3>
                        <p className="text-xs text-muted-foreground">
                          Enable WRF model simulations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Data Provider</Label>
                      <Select defaultValue="wrf">
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wrf">WRF-ARW</SelectItem>
                          <SelectItem value="wavewatch">WaveWatch III</SelectItem>
                          <SelectItem value="swan">SWAN</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Data Sources</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Selection & Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Detection Model</Label>
                  <Select defaultValue="hybrid">
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hybrid">Hybrid CNN+LSTM</SelectItem>
                      <SelectItem value="cnn">CNN Only</SelectItem>
                      <SelectItem value="lstm">LSTM Only</SelectItem>
                      <SelectItem value="statistical">Statistical</SelectItem>
                      <SelectItem value="traditional">Traditional ML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Model Parameters</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="confidenceThreshold">Confidence Threshold</Label>
                      <span className="text-sm">70%</span>
                    </div>
                    <Slider defaultValue={[70]} min={50} max={95} step={5} />
                    <p className="text-xs text-muted-foreground">
                      Minimum confidence level required for detection
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="anomalyThreshold">Anomaly Detection Threshold</Label>
                      <span className="text-sm">65%</span>
                    </div>
                    <Slider defaultValue={[65]} min={50} max={95} step={5} />
                    <p className="text-xs text-muted-foreground">
                      Threshold for classifying wave patterns as anomalous
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Explanation Settings</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="shap">SHAP Explanations</Label>
                      <p className="text-xs text-muted-foreground">
                        Enable model explanation with SHAP values
                      </p>
                    </div>
                    <Switch id="shap" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="lime">LIME Visualizations</Label>
                      <p className="text-xs text-muted-foreground">
                        Enable local explanations with LIME
                      </p>
                    </div>
                    <Switch id="lime" defaultChecked />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Model Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Notification Channels</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email">Email Alerts</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive alerts via email
                      </p>
                    </div>
                    <Switch id="email" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms">SMS Alerts</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive alerts via SMS
                      </p>
                    </div>
                    <Switch id="sms" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push">Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive push notifications
                      </p>
                    </div>
                    <Switch id="push" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="api">API Webhooks</Label>
                      <p className="text-xs text-muted-foreground">
                        Send alerts to external systems
                      </p>
                    </div>
                    <Switch id="api" defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Preferences</h3>

                  <div className="space-y-2">
                    <Label>Minimum Alert Level</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (All Alerts)</SelectItem>
                        <SelectItem value="medium">Medium & High</SelectItem>
                        <SelectItem value="high">High Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Notification Frequency</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="digest">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Notification Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
