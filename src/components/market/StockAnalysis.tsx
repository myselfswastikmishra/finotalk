
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChart3, Search, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Sample data - in a real app, this would come from an API
const stockData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 167.82, change: 1.23, changePercent: 0.74, recommendation: "Buy" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 334.51, change: -2.14, changePercent: -0.64, recommendation: "Hold" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.19, change: 1.88, changePercent: 1.34, recommendation: "Buy" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 133.09, change: -0.76, changePercent: -0.57, recommendation: "Buy" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 247.31, change: 5.62, changePercent: 2.33, recommendation: "Hold" },
  { symbol: "META", name: "Meta Platforms Inc.", price: 315.22, change: 3.45, changePercent: 1.11, recommendation: "Buy" },
  { symbol: "NFLX", name: "Netflix Inc.", price: 522.67, change: -4.12, changePercent: -0.78, recommendation: "Sell" },
  { symbol: "DIS", name: "Walt Disney Co.", price: 98.43, change: 0.37, changePercent: 0.38, recommendation: "Hold" },
];

// Sample chart data
const stockChartData = [
  { name: "Jan", AAPL: 142, MSFT: 310, GOOGL: 125 },
  { name: "Feb", AAPL: 148, MSFT: 320, GOOGL: 130 },
  { name: "Mar", AAPL: 152, MSFT: 315, GOOGL: 135 },
  { name: "Apr", AAPL: 155, MSFT: 330, GOOGL: 140 },
  { name: "May", AAPL: 160, MSFT: 332, GOOGL: 138 },
  { name: "Jun", AAPL: 165, MSFT: 335, GOOGL: 142 },
];

const predictionData = [
  { name: "Jul", AAPL: 168, MSFT: 338, GOOGL: 144 },
  { name: "Aug", AAPL: 172, MSFT: 342, GOOGL: 146 },
  { name: "Sep", AAPL: 175, MSFT: 340, GOOGL: 148 },
];

const MotionCard = motion(Card);

export const StockAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [showPrediction, setShowPrediction] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      toast.error("Please enter a stock symbol");
      return;
    }
    
    const stock = stockData.find(s => s.symbol.toLowerCase() === searchTerm.toLowerCase());
    if (stock) {
      setSelectedStock(stock.symbol);
      toast.success(`Loaded data for ${stock.name}`);
    } else {
      toast.error("Stock not found. Try AAPL, MSFT, GOOGL, etc.");
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
    toast.success("Stock prediction generated");
    setShowPrediction(true);
  };

  const filteredStocks = stockData.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartConfig = {
    AAPL: { label: "Apple", color: "#2563eb" },
    MSFT: { label: "Microsoft", color: "#16a34a" },
    GOOGL: { label: "Google", color: "#ea580c" },
  };

  const combinedChartData = [...stockChartData, ...(showPrediction ? predictionData : [])];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Stock Price Chart</CardTitle>
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
            <CardDescription>Compare stock performance and view price predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <LineChart data={combinedChartData}>
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
                  <Line
                    type="monotone"
                    dataKey="AAPL"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="MSFT"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="GOOGL"
                    stroke="#ea580c"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
              {showPrediction && (
                <div className="mt-4 bg-muted/40 p-3 rounded-md border border-border">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-amber-500" />
                    <p className="text-xs text-muted-foreground">
                      Prediction based on historical data and market trends. This is for educational purposes only.
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
              <CardTitle className="text-lg">Stock Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Search for a stock symbol..."
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
              <CardTitle className="text-lg">Top Recommendations</CardTitle>
              <CardDescription>Based on analyst ratings and market trends</CardDescription>
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
                  {filteredStocks.slice(0, 5).map((stock) => (
                    <TableRow 
                      key={stock.symbol}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => {
                        setSelectedStock(stock.symbol);
                        toast.success(`Loaded data for ${stock.name}`);
                      }}
                    >
                      <TableCell className="font-medium">{stock.symbol}</TableCell>
                      <TableCell>${stock.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {stock.change > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={stock.change > 0 ? "text-green-500" : "text-red-500"}>
                            {stock.changePercent > 0 ? "+" : ""}
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRecommendationColor(stock.recommendation)}>
                          {stock.recommendation}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="pt-3">
              <p className="text-xs text-muted-foreground">
                Data provided for educational purposes only. Not financial advice.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
