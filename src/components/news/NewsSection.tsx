
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Globe, TrendingUp, TrendingDown, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const MotionCard = motion(Card);

// Types for news items
interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  time: string;
  snippet: string;
  impact?: "positive" | "negative" | "neutral";
  relatedSymbols?: string[];
  category: string;
}

// Mock fetcher function - in production, this would fetch from a real API
const fetchNewsData = async (category: string): Promise<NewsItem[]> => {
  // Simulating network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This function would be replaced with actual API calls in production
  // For demo purposes, we're returning static data based on category
  
  const allNews: Record<string, NewsItem[]> = {
    financial: [
      {
        id: "fin-1",
        title: "Fed Signals Potential Rate Cut in Next Meeting",
        source: "Financial Times",
        url: "https://www.ft.com",
        time: "1 hour ago",
        snippet: "The Federal Reserve has signaled a potential interest rate cut in its upcoming meeting, citing improving inflation data and stable employment figures.",
        impact: "positive",
        category: "financial"
      },
      {
        id: "fin-2",
        title: "Global Markets Rally as Inflation Pressures Ease",
        source: "Bloomberg",
        url: "https://www.bloomberg.com",
        time: "3 hours ago",
        snippet: "Global markets are experiencing a significant rally as recent data suggests inflation pressures are easing in major economies.",
        impact: "positive",
        category: "financial"
      },
      {
        id: "fin-3",
        title: "Treasury Yields Fall to Six-Month Low on Economic Data",
        source: "Reuters",
        url: "https://www.reuters.com",
        time: "5 hours ago",
        snippet: "Treasury yields have dropped to a six-month low following the release of weaker-than-expected economic data, prompting investors to reassess growth forecasts.",
        impact: "neutral",
        category: "financial"
      },
    ],
    stocks: [
      {
        id: "stock-1",
        title: "Tesla Unveils New AI Strategy, Stock Surges 5%",
        source: "Bloomberg",
        url: "https://www.bloomberg.com",
        time: "2 hours ago",
        snippet: "Tesla Inc. revealed its ambitious new AI strategy at its annual investor day, causing shares to surge more than 5% in after-hours trading.",
        impact: "positive",
        relatedSymbols: ["TSLA"],
        category: "stocks"
      },
      {
        id: "stock-2",
        title: "Apple's New iPhone Shipments Expected to Break Records",
        source: "CNBC",
        url: "https://www.cnbc.com",
        time: "4 hours ago",
        snippet: "Analysts predict Apple's latest iPhone model will break previous shipment records, potentially boosting the company's revenue significantly in Q4.",
        impact: "positive",
        relatedSymbols: ["AAPL"],
        category: "stocks"
      },
      {
        id: "stock-3",
        title: "Microsoft Faces Antitrust Scrutiny Over Cloud Services",
        source: "Wall Street Journal",
        url: "https://www.wsj.com",
        time: "6 hours ago",
        snippet: "Microsoft's cloud services division is facing increased regulatory scrutiny in Europe, potentially impacting its market dominance in the region.",
        impact: "negative",
        relatedSymbols: ["MSFT"],
        category: "stocks"
      },
    ],
    crypto: [
      {
        id: "crypto-1",
        title: "Bitcoin Breaks $50,000 Barrier After ETF Approval",
        source: "CoinDesk",
        url: "https://www.coindesk.com",
        time: "3 hours ago",
        snippet: "Bitcoin has surpassed the $50,000 mark following the SEC's approval of several spot Bitcoin ETFs, marking a significant milestone for cryptocurrency adoption.",
        impact: "positive",
        relatedSymbols: ["BTC"],
        category: "crypto"
      },
      {
        id: "crypto-2",
        title: "Ethereum Completes Major Network Upgrade",
        source: "Cointelegraph",
        url: "https://www.cointelegraph.com",
        time: "5 hours ago",
        snippet: "Ethereum has successfully implemented its latest network upgrade, enhancing transaction throughput and reducing gas fees for users across the platform.",
        impact: "positive",
        relatedSymbols: ["ETH"],
        category: "crypto"
      },
      {
        id: "crypto-3",
        title: "Regulatory Concerns Cloud Ripple's Future Despite Court Win",
        source: "The Block",
        url: "https://www.theblock.co",
        time: "8 hours ago",
        snippet: "Despite a recent favorable court ruling, Ripple continues to face regulatory uncertainty in multiple jurisdictions, potentially affecting its long-term growth.",
        impact: "negative",
        relatedSymbols: ["XRP"],
        category: "crypto"
      },
    ],
    economics: [
      {
        id: "econ-1",
        title: "US Employment Rate Exceeds Expectations in Q3",
        source: "The Economist",
        url: "https://www.economist.com",
        time: "2 hours ago",
        snippet: "The latest employment figures show stronger-than-expected job growth in the US for the third quarter, challenging predictions of an economic slowdown.",
        impact: "positive",
        category: "economics"
      },
      {
        id: "econ-2",
        title: "China Announces New Economic Stimulus Package",
        source: "South China Morning Post",
        url: "https://www.scmp.com",
        time: "5 hours ago",
        snippet: "The Chinese government has announced a new stimulus package to boost its slowing economy, focusing on infrastructure investments and consumer spending incentives.",
        impact: "positive",
        category: "economics"
      },
      {
        id: "econ-3",
        title: "European Central Bank Warns of Inflation Risks",
        source: "Financial Times",
        url: "https://www.ft.com",
        time: "7 hours ago",
        snippet: "The European Central Bank has issued warnings about persistent inflation risks despite recent rate hikes, suggesting a potentially extended period of tight monetary policy.",
        impact: "negative",
        category: "economics"
      },
    ]
  };
  
  return allNews[category] || [];
};

export const NewsSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>("financial");
  
  // Using React Query for data fetching
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['news', activeCategory],
    queryFn: () => fetchNewsData(activeCategory),
  });
  
  const getImpactBadge = (impact?: string) => {
    if (impact === "positive") {
      return (
        <Badge className="bg-green-500">
          <TrendingUp className="h-3 w-3 mr-1" />
          Positive
        </Badge>
      );
    } else if (impact === "negative") {
      return (
        <Badge className="bg-red-500">
          <TrendingDown className="h-3 w-3 mr-1" />
          Negative
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline">
          <Globe className="h-3 w-3 mr-1" />
          Neutral
        </Badge>
      );
    }
  };

  const NewsCard = ({ news }: { news: NewsItem }) => (
    <MotionCard 
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{news.title}</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline">{news.source}</Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {news.time}
              </div>
            </div>
          </div>
          {getImpactBadge(news.impact)}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{news.snippet}</p>
        {news.relatedSymbols && news.relatedSymbols.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {news.relatedSymbols.map((symbol) => (
              <Badge key={symbol} variant="secondary" className="bg-muted">
                {symbol}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <a href={news.url} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="outline" className="w-full">
            Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </MotionCard>
  );

  const LoadingSkeleton = () => (
    <div className="mb-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <Tabs defaultValue="financial" onValueChange={setActiveCategory}>
          <TabsList className={`grid w-full ${compact ? 'grid-cols-2 max-w-md' : 'grid-cols-4 max-w-2xl'} mx-auto`}>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="economics">Economics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
        {isLoading ? (
          // Show loading skeletons while data is loading
          Array.from({ length: compact ? 4 : 6 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))
        ) : newsItems && newsItems.length > 0 ? (
          // Show news items
          newsItems.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))
        ) : (
          // Show empty state
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">No news available</h3>
            <p className="text-muted-foreground text-center max-w-md">
              We couldn't find any {activeCategory} news at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>News articles are refreshed every hour. Last updated: {new Date().toLocaleTimeString()}</p>
        <p className="mt-1">
          The above news is provided for educational and informational purposes only. 
          Not financial advice.
        </p>
      </div>
    </div>
  );
};
