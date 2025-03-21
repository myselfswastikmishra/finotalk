
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownToLine, BookOpen, Calculator, ExternalLink, FileText, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const Resources = () => {
  const tools = [
    {
      title: "Compound Interest Calculator",
      description: "Calculate how your investments grow over time with compound interest.",
      icon: <Calculator className="h-8 w-8 text-finance-green" />
    },
    {
      title: "Budget Planner",
      description: "Create a personalized budget plan based on your income and expenses.",
      icon: <PieChart className="h-8 w-8 text-finance-gold" />
    },
    {
      title: "Retirement Calculator",
      description: "Plan your retirement by calculating your future financial needs.",
      icon: <Calculator className="h-8 w-8 text-finance-blue" />
    }
  ];

  const guides = [
    {
      title: "Beginner's Guide to Investing",
      description: "A comprehensive guide to help you start your investment journey.",
      icon: <BookOpen className="h-8 w-8 text-finance-green" />
    },
    {
      title: "Understanding Stock Markets",
      description: "Learn how stock markets work and how to analyze stock performance.",
      icon: <FileText className="h-8 w-8 text-finance-gold" />
    },
    {
      title: "Retirement Planning 101",
      description: "Essential tips and strategies for planning a secure retirement.",
      icon: <FileText className="h-8 w-8 text-finance-blue" />
    }
  ];

  const templates = [
    {
      title: "Monthly Budget Template",
      description: "Track your income and expenses with this easy-to-use budget template.",
      icon: <ArrowDownToLine className="h-8 w-8 text-finance-green" />
    },
    {
      title: "Investment Tracker",
      description: "Monitor your investment portfolio performance with this tracker.",
      icon: <ArrowDownToLine className="h-8 w-8 text-finance-gold" />
    },
    {
      title: "Debt Repayment Planner",
      description: "Plan your debt repayment strategy with this comprehensive template.",
      icon: <ArrowDownToLine className="h-8 w-8 text-finance-blue" />
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
          <MotionDiv
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {tools.map((tool, index) => (
              <MotionDiv
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-2">{tool.icon}</div>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {/* Tool content would go here */}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Open Tool <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </MotionDiv>
            ))}
          </MotionDiv>
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
                    {/* Guide content would go here */}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Read Guide <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
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
                    {/* Template content would go here */}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Download Template <ArrowDownToLine className="ml-2 h-4 w-4" />
                    </Button>
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
