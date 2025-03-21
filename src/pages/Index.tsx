
import { ArrowRight, BarChart2, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MotionDiv = motion.div;

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-finance-green" />,
      title: "Financial Education",
      description: "Learn essential financial concepts with our comprehensive guides and resources."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-finance-gold" />,
      title: "Investment Insights",
      description: "Get data-driven insights and analysis to make informed investment decisions."
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-finance-blue" />,
      title: "Market Analysis",
      description: "Stay updated with the latest market trends, analysis, and forecasts."
    },
    {
      icon: <DollarSign className="h-10 w-10 text-finance-green" />,
      title: "Personal Finance",
      description: "Master budgeting, saving, and long-term financial planning strategies."
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-finance-green/10 filter blur-3xl"></div>
          <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-finance-gold/10 filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">Financial wisdom at your fingertips</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Your Guide to Financial Intelligence
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover, learn, and master finance with personalized AI guidance. Get answers to all your financial questions instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/chat" className="group">
                  Start Chatting <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/learn">Explore Resources</Link>
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Empowering Your Financial Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              FinoTalk provides the tools and knowledge you need to make informed financial decisions.
            </p>
          </div>

          <MotionDiv
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <MotionDiv 
                key={index}
                variants={itemVariants}
                className="p-6 glass-panel hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-finance-green/10 to-finance-gold/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Financial Knowledge?</h2>
            <p className="text-muted-foreground mb-8">
              Start chatting with our AI-powered financial assistant today and get personalized guidance.
            </p>
            <Button size="lg" asChild>
              <Link to="/chat">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
