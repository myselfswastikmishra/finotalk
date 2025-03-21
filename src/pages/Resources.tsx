
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownToLine, BookOpen, Calculator, ExternalLink, FileText, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";
import { BudgetPlanner } from "@/components/calculators/BudgetPlanner";
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";

const MotionDiv = motion.div;

const Resources = () => {
  const tools = [
    {
      title: "Compound Interest Calculator",
      description: "Calculate how your investments grow over time with compound interest.",
      icon: <Calculator className="h-8 w-8 text-finance-green" />,
      component: <CompoundInterestCalculator />
    },
    {
      title: "Budget Planner",
      description: "Create a personalized budget plan based on your income and expenses.",
      icon: <PieChart className="h-8 w-8 text-finance-gold" />,
      component: <BudgetPlanner />
    },
    {
      title: "Retirement Calculator",
      description: "Plan your retirement by calculating your future financial needs.",
      icon: <Calculator className="h-8 w-8 text-finance-blue" />,
      component: <RetirementCalculator />
    }
  ];

  const guides = [
    {
      title: "Beginner's Guide to Investing",
      description: "A comprehensive guide to help you start your investment journey.",
      icon: <BookOpen className="h-8 w-8 text-finance-green" />,
      url: "https://www.investopedia.com/articles/basics/06/invest1000.asp"
    },
    {
      title: "Understanding Stock Markets",
      description: "Learn how stock markets work and how to analyze stock performance.",
      icon: <FileText className="h-8 w-8 text-finance-gold" />,
      url: "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work"
    },
    {
      title: "Retirement Planning 101",
      description: "Essential tips and strategies for planning a secure retirement.",
      icon: <FileText className="h-8 w-8 text-finance-blue" />,
      url: "https://www.nerdwallet.com/article/investing/retirement-planning-guide"
    }
  ];

  const templates = [
    {
      title: "Monthly Budget Template",
      description: "Track your income and expenses with this easy-to-use budget template.",
      icon: <ArrowDownToLine className="h-8 w-8 text-finance-green" />,
      url: "https://www.vertex42.com/ExcelTemplates/personal-budget-spreadsheet.html"
    },
    {
      title: "Investment Tracker",
      description: "Monitor your investment portfolio performance with this tracker.",
      icon: <ArrowDownToLine className="h-8 w-8 text-finance-gold" />,
      url: "https://www.vertex42.com/ExcelTemplates/investment-tracking-spreadsheet.html"
    },
    {
      title: "Debt Repayment Planner",
      description: "Plan your debt repayment strategy with this comprehensive template.",
      icon: <ArrowDownToLine className="h-8 w-8 text-finance-blue" />,
      url: "https://www.vertex42.com/Calculators/debt-reduction-calculator.html"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Financial Resources</h1>
        <p className="text-muted-foreground">
          Access tools, guides, and templates to help you manage your finances effectively.
        </p>
      </div>

      <Tabs defaultValue="tools" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tools">Financial Tools</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tools" className="mt-6">
          <Tabs defaultValue="compound-interest" className="w-full mt-6">
            <TabsList className="w-full flex justify-between border-b mb-6">
              {tools.map((tool, index) => (
                <TabsTrigger key={index} value={tool.title.toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex items-center space-x-2">
                    {tool.icon}
                    <span>{tool.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {tools.map((tool, index) => (
              <TabsContent key={index} value={tool.title.toLowerCase().replace(/\s+/g, '-')}>
                {tool.component}
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
        
        <TabsContent value="guides" className="mt-6">
          <MotionDiv
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {guides.map((guide, index) => (
              <MotionDiv
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-2">{guide.icon}</div>
                    <CardTitle>{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      This guide covers essential concepts, strategies, and practical advice 
                      that will help you navigate the financial landscape with confidence.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <a href={guide.url} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button className="w-full">
                        Read Guide <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </MotionDiv>
            ))}
          </MotionDiv>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <MotionDiv
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {templates.map((template, index) => (
              <MotionDiv
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-2">{template.icon}</div>
                    <CardTitle>{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      Download this template to streamline your financial management process 
                      and keep track of your progress towards your financial goals.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <a href={template.url} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button className="w-full">
                        Download Template <ArrowDownToLine className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </MotionDiv>
            ))}
          </MotionDiv>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;
