
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Clock, CreditCard, Landmark, LineChart, PiggyBank, ScrollText, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const categories = [
  {
    title: "Investment Basics",
    description: "Learn essential concepts of investing and growing your wealth.",
    icon: <LineChart className="h-10 w-10 text-finance-green" />,
    topics: ["Stocks & Bonds", "ETFs & Mutual Funds", "Risk Management", "Portfolio Diversification"],
    route: "investment-basics"
  },
  {
    title: "Personal Finance",
    description: "Master your personal finances and budgeting techniques.",
    icon: <Wallet className="h-10 w-10 text-finance-gold" />,
    topics: ["Budgeting", "Emergency Funds", "Debt Management", "Financial Goals"],
    route: "personal-finance"
  },
  {
    title: "Retirement Planning",
    description: "Plan for a secure and comfortable retirement.",
    icon: <PiggyBank className="h-10 w-10 text-finance-blue" />,
    topics: ["Retirement Accounts", "Social Security", "Retirement Income", "Estate Planning"],
    route: "retirement-planning"
  },
  {
    title: "Credit & Loans",
    description: "Understand credit scores, loans, and debt management.",
    icon: <CreditCard className="h-10 w-10 text-finance-green" />,
    topics: ["Credit Scores", "Mortgage Loans", "Student Loans", "Debt Consolidation"],
    route: "credit-loans"
  },
  {
    title: "Banking",
    description: "Navigate banking services and account options.",
    icon: <Landmark className="h-10 w-10 text-finance-gold" />,
    topics: ["Account Types", "Interest Rates", "Online Banking", "Banking Fees"],
    route: "banking"
  },
  {
    title: "Tax Planning",
    description: "Optimize your tax strategy and understand tax implications.",
    icon: <ScrollText className="h-10 w-10 text-finance-blue" />,
    topics: ["Tax Deductions", "Tax-Advantaged Accounts", "Capital Gains", "Tax Filing"],
    route: "tax-planning"
  }
];

const popularArticles = [
  {
    title: "Understanding Market Volatility",
    description: "Learn how market fluctuations work and strategies to navigate volatile markets effectively.",
    readTime: "5 min",
    route: "market-volatility"
  },
  {
    title: "Emergency Fund: How Much Is Enough?",
    description: "Discover the right size for your emergency fund based on your personal financial situation.",
    readTime: "4 min",
    route: "emergency-fund"
  },
  {
    title: "Roth vs. Traditional IRA: Which Is Right For You?",
    description: "Compare these two popular retirement accounts and learn which one better suits your needs.",
    readTime: "7 min",
    route: "roth-vs-traditional"
  },
  {
    title: "Paying Off Debt: Avalanche vs. Snowball Method",
    description: "Explore two powerful strategies for eliminating debt and improving your financial health.",
    readTime: "6 min",
    route: "debt-repayment-methods"
  }
];

const Learn = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Financial Learning Resources</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive guides and resources to enhance your financial knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <MotionCard 
            key={index}
            className="overflow-hidden hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <CardHeader className="pb-2">
              <div className="mb-2">{category.icon}</div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.topics.map((topic, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                    {topic}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link 
                to={`/learn/${category.route}`}
                className="text-primary hover:underline flex items-center text-sm"
              >
                Explore {category.title} <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </MotionCard>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Popular Financial Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {popularArticles.map((article, index) => (
            <MotionCard 
              key={index} 
              className="text-left hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <CardHeader>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 mr-1" /> {article.readTime} read
                </div>
                <CardTitle className="text-xl">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {article.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link 
                  to={`/learn/article/${article.route}`}
                  className="text-primary hover:underline flex items-center text-sm"
                >
                  Read Article <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </MotionCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;
