
import React from "react";
import { NewsSection } from "@/components/news/NewsSection";

const FinancialNews = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Financial News Center</h1>
        <p className="text-muted-foreground">
          Stay informed with the latest news from the financial world, including markets, stocks, cryptocurrencies, and economic trends.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <NewsSection />
      </div>
    </div>
  );
};

export default FinancialNews;
