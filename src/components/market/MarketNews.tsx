
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, Newspaper, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

// Sample news data - in a real app, this would come from an API
const stockNews = [
  {
    id: 1,
    title: "Tesla Unveils New AI Strategy, Stock Surges 5%",
    source: "Bloomberg",
    url: "https://www.bloomberg.com",
    time: "2 hours ago",
    snippet: "Tesla Inc. revealed its ambitious new AI strategy at its annual investor day, causing shares to surge more than 5% in after-hours trading.",
    impact: "positive",
    relatedSymbols: ["TSLA"],
  },
  {
    id: 2,
    title: "Apple's New iPhone Shipments Expected to Break Records",
    source: "CNBC",
    url: "https://www.cnbc.com",
    time: "4 hours ago",
    snippet: "Analysts predict Apple's latest iPhone model will break previous shipment records, potentially boosting the company's revenue significantly in Q4.",
    impact: "positive",
    relatedSymbols: ["AAPL"],
  },
  {
    id: 3,
    title: "Microsoft Faces Antitrust Scrutiny Over Cloud Services",
    source: "Wall Street Journal",
    url: "https://www.wsj.com",
    time: "6 hours ago",
    snippet: "Microsoft's cloud services division is facing increased regulatory scrutiny in Europe, potentially impacting its market dominance in the region.",
    impact: "negative",
    relatedSymbols: ["MSFT"],
  },
  {
    id: 4,
    title: "Amazon Expands Same-Day Delivery to 15 More Markets",
    source: "Reuters",
    url: "https://www.reuters.com",
    time: "10 hours ago",
    snippet: "Amazon announced an expansion of its same-day delivery service to 15 additional markets, strengthening its competitive position against rival retailers.",
    impact: "positive",
    relatedSymbols: ["AMZN", "WMT", "TGT"],
  },
  {
    id: 5,
    title: "Fed Signals Potential Rate Cut in Next Meeting",
    source: "Financial Times",
    url: "https://www.ft.com",
    time: "1 day ago",
    snippet: "The Federal Reserve has signaled a potential interest rate cut in its upcoming meeting, citing improving inflation data and stable employment figures.",
    impact: "positive",
    relatedSymbols: ["SPY", "QQQ", "DIA"],
  },
];

const cryptoNews = [
  {
    id: 1,
    title: "Bitcoin Breaks $50,000 Barrier After ETF Approval",
    source: "CoinDesk",
    url: "https://www.coindesk.com",
    time: "3 hours ago",
    snippet: "Bitcoin has surpassed the $50,000 mark following the SEC's approval of several spot Bitcoin ETFs, marking a significant milestone for cryptocurrency adoption.",
    impact: "positive",
    relatedSymbols: ["BTC"],
  },
  {
    id: 2,
    title: "Ethereum Completes Major Network Upgrade",
    source: "Cointelegraph",
    url: "https://www.cointelegraph.com",
    time: "5 hours ago",
    snippet: "Ethereum has successfully implemented its latest network upgrade, enhancing transaction throughput and reducing gas fees for users across the platform.",
    impact: "positive",
    relatedSymbols: ["ETH"],
  },
  {
    id: 3,
    title: "Regulatory Concerns Cloud Ripple's Future Despite Court Win",
    source: "The Block",
    url: "https://www.theblock.co",
    time: "8 hours ago",
    snippet: "Despite a recent favorable court ruling, Ripple continues to face regulatory uncertainty in multiple jurisdictions, potentially affecting its long-term growth.",
    impact: "negative",
    relatedSymbols: ["XRP"],
  },
  {
    id: 4,
    title: "Solana Experiences Network Outage, Developers Rush Fix",
    source: "Decrypt",
    url: "https://www.decrypt.co",
    time: "12 hours ago",
    snippet: "The Solana blockchain experienced a brief network outage, causing transaction delays. Developers quickly implemented a fix to restore normal operations.",
    impact: "negative",
    relatedSymbols: ["SOL"],
  },
  {
    id: 5,
    title: "Major Bank Announces Cryptocurrency Custody Services",
    source: "CryptoNews",
    url: "https://www.cryptonews.com",
    time: "1 day ago",
    snippet: "One of the world's largest banks has announced plans to offer cryptocurrency custody services to institutional clients, marking a significant step towards mainstream adoption.",
    impact: "positive",
    relatedSymbols: ["BTC", "ETH", "SOL"],
  },
];

export const MarketNews = () => {
  const [activeTab, setActiveTab] = useState("stock");

  const getImpactBadge = (impact: string) => {
    if (impact === "positive") {
      return (
        <Badge className="bg-green-500">
          <TrendingUp className="h-3 w-3 mr-1" />
          Positive
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-500">
          <TrendingDown className="h-3 w-3 mr-1" />
          Negative
        </Badge>
      );
    }
  };

  const NewsCard = ({ news }: { news: typeof stockNews[0] }) => (
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
        <div className="flex flex-wrap gap-2">
          {news.relatedSymbols.map((symbol) => (
            <Badge key={symbol} variant="secondary" className="bg-muted">
              {symbol}
            </Badge>
          ))}
        </div>
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

  return (
    <div>
      <div className="mb-6">
        <Tabs defaultValue="stock" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="stock">Stock News</TabsTrigger>
            <TabsTrigger value="crypto">Crypto News</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-4">
            <Newspaper className="h-5 w-5 mr-2 text-finance-green" />
            <h3 className="text-xl font-bold">
              Latest {activeTab === "stock" ? "Stock" : "Crypto"} News
            </h3>
          </div>
          {activeTab === "stock" ? (
            stockNews.slice(0, 3).map((news) => <NewsCard key={news.id} news={news} />)
          ) : (
            cryptoNews.slice(0, 3).map((news) => <NewsCard key={news.id} news={news} />)
          )}
        </div>

        <div>
          <div className="flex items-center mb-4">
            <Newspaper className="h-5 w-5 mr-2 text-finance-gold" />
            <h3 className="text-xl font-bold">
              More {activeTab === "stock" ? "Stock" : "Crypto"} Updates
            </h3>
          </div>
          {activeTab === "stock" ? (
            stockNews.slice(3, 6).map((news) => <NewsCard key={news.id} news={news} />)
          ) : (
            cryptoNews.slice(3, 6).map((news) => <NewsCard key={news.id} news={news} />)
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>News articles are refreshed every hour. Last updated: Today at 2:30 PM</p>
        <p className="mt-1">
          The above news is provided for educational and informational purposes only. 
          Market data may be delayed. Not financial advice.
        </p>
      </div>
    </div>
  );
};
