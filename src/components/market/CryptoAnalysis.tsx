
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Search, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Sample data - in a real app, this would come from an API
const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: 47362.15, change: 1523.45, changePercent: 3.32, recommendation: "Buy" },
  { symbol: "ETH", name: "Ethereum", price: 3287.94, change: 87.21, changePercent: 2.73, recommendation: "Buy" },
  { symbol: "SOL", name: "Solana", price: 136.27, change: -4.58, changePercent: -3.25, recommendation: "Hold" },
  { symbol: "XRP", name: "Ripple", price: 0.5134, change: 0.0217, changePercent: 4.41, recommendation: "Buy" },
  { symbol: "ADA", name: "Cardano", price: 0.4783, change: -0.0127, changePercent: -2.59, recommendation: "Sell" },
  { symbol: "AVAX", name: "Avalanche", price: 35.76, change: 1.28, changePercent: 3.71, recommendation: "Buy" },
  { symbol: "DOT", name: "Polkadot", price: 7.43, change: 0.21, changePercent: 2.91, recommendation: "Hold" },
  { symbol: "DOGE", name: "Dogecoin", price: 0.1296, change: 0.0027, changePercent: 2.13, recommendation: "Hold" },
];

// Sample chart data
const cryptoChartData = [
  { name: "Jan", BTC: 38000, ETH: 2800, SOL: 120 },
  { name: "Feb", BTC: 40000, ETH: 2900, SOL: 110 },
  { name: "Mar", BTC: 42000, ETH: 3000, SOL: 115 },
  { name: "Apr", BTC: 44000, ETH: 3100, SOL: 125 },
  { name: "May", BTC: 46000, ETH: 3200, SOL: 130 },
  { name: "Jun", BTC: 47000, ETH: 3250, SOL: 135 },
];

const predictionData = [
  { name: "Jul", BTC: 48000, ETH: 3300, SOL: 140 },
  { name: "Aug", BTC: 49000, ETH: 3400, SOL: 145 },
  { name: "Sep", BTC: 50000, ETH: 3500, SOL: 150 },
];

const MotionCard = motion(Card);

export const CryptoAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [showPrediction, setShowPrediction] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      toast.error("Please enter a crypto symbol");
      return;
    }
    
    const crypto = cryptoData.find(c => c.symbol.toLowerCase() === searchTerm.toLowerCase());
    if (crypto) {
      setSelectedCrypto(crypto.symbol);
      toast.success(`Loaded data for ${crypto.name}`);
    } else {
      toast.error("Cryptocurrency not found. Try BTC, ETH, SOL, etc.");
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Buy": return "bg-green-500";
      case "Sell": return "bg-red-500";
      case "Hold": return "bg-amber-500";
      default: return "bg-slate-500";
    }
  };

  const handleGeneratePrediction = () => {
    toast.success("Crypto prediction generated");
    setShowPrediction(true);
  };

  const filteredCryptos = cryptoData.filter(crypto => 
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartConfig = {
    BTC: { label: "Bitcoin", color: "#f59e0b" },
    ETH: { label: "Ethereum", color: "#8b5cf6" },
    SOL: { label: "Solana", color: "#06b6d4" },
  };

  const combinedChartData = [...cryptoChartData, ...(showPrediction ? predictionData : [])];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Cryptocurrency Price Chart</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowPrediction(!showPrediction)}>
                  {showPrediction ? "Hide Prediction" : "Show Prediction"}
                </Button>
                <Button variant="default" size="sm" onClick={handleGeneratePrediction}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate Prediction
                </Button>
              </div>
            </div>
            <CardDescription>Compare cryptocurrency performance and view price predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <AreaChart data={combinedChartData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={{ stroke: "#888" }} 
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={{ stroke: "#888" }} 
                    tickLine={false} 
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <defs>
                    <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorETH" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSOL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="BTC"
                    stroke="#f59e0b"
                    fillOpacity={1}
                    fill="url(#colorBTC)"
                  />
                  <Area
                    type="monotone"
                    dataKey="ETH"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorETH)"
                  />
                  <Area
                    type="monotone"
                    dataKey="SOL"
                    stroke="#06b6d4"
                    fillOpacity={1}
                    fill="url(#colorSOL)"
                  />
                </AreaChart>
              </ChartContainer>
              {showPrediction && (
                <div className="mt-4 bg-muted/40 p-3 rounded-md border border-border">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-amber-500" />
                    <p className="text-xs text-muted-foreground">
                      Prediction based on historical data and market trends. Cryptocurrency markets are highly volatile. This is for educational purposes only.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Crypto Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Search for a crypto symbol..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button size="icon" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Top Crypto Picks</CardTitle>
              <CardDescription>Based on market analysis and trends</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCryptos.slice(0, 5).map((crypto) => (
                    <TableRow 
                      key={crypto.symbol}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => {
                        setSelectedCrypto(crypto.symbol);
                        toast.success(`Loaded data for ${crypto.name}`);
                      }}
                    >
                      <TableCell className="font-medium">{crypto.symbol}</TableCell>
                      <TableCell>
                        ${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {crypto.change > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={crypto.change > 0 ? "text-green-500" : "text-red-500"}>
                            {crypto.changePercent > 0 ? "+" : ""}
                            {crypto.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRecommendationColor(crypto.recommendation)}>
                          {crypto.recommendation}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="pt-3">
              <p className="text-xs text-muted-foreground">
                Cryptocurrency investments are subject to high market risk. This is for educational purposes only.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
