
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockAnalysis } from "@/components/market/StockAnalysis";
import { CryptoAnalysis } from "@/components/market/CryptoAnalysis";
import { MarketNews } from "@/components/market/MarketNews";
import { NewsSection } from "@/components/news/NewsSection";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MarketAnalysis = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Market Analysis & Insights</h1>
        <p className="text-muted-foreground">
          Track market trends, analyze stocks and cryptocurrencies, and stay updated with the latest financial news.
        </p>
      </div>

      <Tabs defaultValue="stocks" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="stocks">Stock Analysis</TabsTrigger>
          <TabsTrigger value="crypto">Crypto Analysis</TabsTrigger>
          <TabsTrigger value="news">Market News</TabsTrigger>
          <TabsTrigger value="real-time-news">Real-Time News</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stocks" className="mt-6">
          <StockAnalysis />
        </TabsContent>
        
        <TabsContent value="crypto" className="mt-6">
          <CryptoAnalysis />
        </TabsContent>
        
        <TabsContent value="news" className="mt-6">
          <MarketNews />
        </TabsContent>
        
        <TabsContent value="real-time-news" className="mt-6">
          <div className="mb-6">
            <NewsSection compact={true} />
          </div>
          
          <div className="text-center mt-8">
            <Link to="/financial-news">
              <Button variant="outline" size="lg">
                View Full News Center <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketAnalysis;
