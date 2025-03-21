
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

// Update the resource type to include optional isDownloadable property
type Resource = {
  title: string;
  url: string;
  isDownloadable?: boolean;
};

// Update the section type
type Section = {
  title: string;
  content: string;
};

// Update the content type
type LearnContent = {
  title: string;
  description: string;
  sections: Section[];
  resources: Resource[];
};

// Define the content for each topic
const learnContent: Record<string, LearnContent> = {
  "investment-basics": {
    title: "Investment Basics",
    description: "Learn essential concepts of investing and growing your wealth.",
    sections: [
      {
        title: "Understanding Stocks & Bonds",
        content: `Stocks represent ownership in a company, while bonds are loans made to a company or government. When you buy a stock, you become a partial owner of that company, sharing in its profits and losses. Bonds, on the other hand, represent debt that the issuer promises to repay with interest.

Stocks generally offer higher potential returns but come with higher risk, while bonds typically provide more stable, predictable returns with lower risk. A diversified portfolio often contains both to balance risk and return.`,
      },
      {
        title: "ETFs & Mutual Funds",
        content: `Exchange-Traded Funds (ETFs) and mutual funds allow investors to own a diversified portfolio of assets through a single investment. Both pool money from many investors to buy a collection of stocks, bonds, or other securities.

ETFs trade like stocks throughout the day, while mutual funds trade once per day after markets close. ETFs typically have lower expense ratios and minimum investments than mutual funds, making them accessible to beginning investors.`,
      },
      {
        title: "Risk Management",
        content: `Risk management is the process of identifying, analyzing, and accepting or mitigating investment uncertainty. Proper risk management involves understanding your risk tolerance, diversifying investments, and maintaining a long-term perspective.

Common risk management strategies include asset allocation, diversification across different asset classes, regular portfolio rebalancing, and dollar-cost averaging (investing a fixed amount at regular intervals).`,
      },
      {
        title: "Portfolio Diversification",
        content: `Diversification is the practice of spreading investments across various assets to reduce risk. By owning different types of investments, you reduce the impact any single investment's performance has on your overall portfolio.

Effective diversification includes spreading investments across different asset classes (stocks, bonds, real estate), industries, geographic regions, and company sizes. The goal is to create a portfolio where components respond differently to market conditions.`,
      },
    ],
    resources: [
      {
        title: "Investopedia - Investing Essentials",
        url: "https://www.investopedia.com/investing-essentials-4689754",
      },
      {
        title: "SEC's Beginners' Guide to Investing",
        url: "https://www.investor.gov/introduction-investing",
      },
    ],
  },
  "personal-finance": {
    title: "Personal Finance",
    description: "Master your personal finances and budgeting techniques.",
    sections: [
      {
        title: "Budgeting Fundamentals",
        content: `A budget is a financial plan that helps you track your income and expenses. Creating a budget involves identifying your income sources, listing all expenses, categorizing spending, and allocating funds to different categories.

Popular budgeting methods include the 50/30/20 rule (50% for needs, 30% for wants, 20% for savings), zero-based budgeting (every dollar has a job), and envelope budgeting (dividing cash into envelopes for different expense categories).

Effective budgeting requires regular monitoring and adjusting as your financial situation changes. Digital tools like budgeting apps can simplify this process by automatically categorizing transactions and tracking your progress.`,
      },
      {
        title: "Building Emergency Funds",
        content: `An emergency fund is money set aside to cover unexpected expenses or financial emergencies. Financial experts typically recommend having 3-6 months of living expenses saved in an easily accessible account.

To build an emergency fund, start small with a goal of $1,000, then gradually increase to the recommended amount. Automate contributions to make saving consistent and prioritize replenishing the fund after using it.

Keep your emergency fund in a high-yield savings account that offers better interest rates than traditional savings accounts while maintaining liquidity and safety.`,
      },
      {
        title: "Debt Management Strategies",
        content: `Effective debt management involves understanding your debts, creating a repayment plan, and avoiding unnecessary new debt. Start by listing all debts with their interest rates, minimum payments, and balances.

Two popular debt repayment strategies are the avalanche method (paying off highest-interest debt first) and the snowball method (paying off smallest balances first). The avalanche method saves more money in interest, while the snowball method provides psychological wins that can keep you motivated.

Consider debt consolidation if you have multiple high-interest debts. This combines multiple debts into a single loan with a lower interest rate, making payments more manageable and potentially saving money.`,
      },
      {
        title: "Setting Financial Goals",
        content: `Financial goals provide direction for your money decisions and motivation to maintain good financial habits. Effective goals are Specific, Measurable, Achievable, Relevant, and Time-bound (SMART).

Categorize your goals as short-term (under 1 year), medium-term (1-5 years), and long-term (over 5 years). Examples include building an emergency fund (short-term), saving for a home down payment (medium-term), or retirement planning (long-term).

Review and adjust your goals regularly as your life circumstances and financial situation change. Track your progress to stay motivated and make necessary adjustments to your financial plan.`,
      },
    ],
    resources: [
      {
        title: "Consumer Financial Protection Bureau - Budgeting Tools",
        url: "https://www.consumerfinance.gov/consumer-tools/budgeting/",
      },
      {
        title: "NerdWallet - Personal Finance Guides",
        url: "https://www.nerdwallet.com/personal-finance",
      },
      {
        title: "Personal Finance Worksheet Templates",
        url: "https://www.vertex42.com/ExcelTemplates/personal-finances.html",
        isDownloadable: true,
      },
    ],
  },
  "retirement-planning": {
    title: "Retirement Planning",
    description: "Plan for a secure and comfortable retirement.",
    sections: [
      {
        title: "Retirement Accounts",
        content: `Various retirement accounts offer tax advantages that help your money grow more efficiently. Common retirement accounts include 401(k)s (employer-sponsored), Traditional IRAs, Roth IRAs, SEP IRAs (for self-employed), and Solo 401(k)s.

401(k) plans often include employer matching contributions, which is essentially free money. Traditional retirement accounts typically offer tax deductions now with taxes paid upon withdrawal, while Roth accounts use after-tax money but provide tax-free growth and withdrawals.`,
      },
      {
        title: "Social Security Benefits",
        content: `Social Security provides retirement income based on your lifetime earnings. The amount you receive depends on your earnings history and the age at which you start collecting benefits.

You can start collecting Social Security as early as age 62, but benefits are reduced. Full retirement age is between 66-67 depending on your birth year. Delaying benefits until age 70 results in a larger monthly payment.

Social Security typically replaces about 40% of pre-retirement income for average earners, highlighting the importance of additional retirement savings.`,
      },
      {
        title: "Retirement Income Strategies",
        content: `Developing a retirement income strategy involves determining how much money you'll need in retirement and how to withdraw from your savings sustainably.

The 4% rule suggests withdrawing 4% of your retirement savings in the first year, then adjusting that amount for inflation in subsequent years. This approach aims to make your savings last approximately 30 years.

Consider multiple income sources in retirement, including Social Security, pensions, retirement account withdrawals, annuities, and possibly part-time work or passive income from investments or rental properties.`,
      },
      {
        title: "Estate Planning Basics",
        content: `Estate planning involves arranging for the management and disposal of your estate during your life and after death. Key documents include a will, power of attorney, healthcare directive, and potentially trusts.

A will specifies how your assets should be distributed after death and names guardians for minor children. Without a will, state laws determine how your assets are distributed, which may not align with your wishes.

Regular review and updating of estate planning documents is essential, especially after major life events like marriage, divorce, births, deaths, or significant changes in financial situation.`,
      },
    ],
    resources: [
      {
        title: "SSA - Plan Your Retirement",
        url: "https://www.ssa.gov/planners/retire/",
      },
      {
        title: "Vanguard - Retirement Planning",
        url: "https://investor.vanguard.com/retirement/",
      },
    ],
  },
  "credit-loans": {
    title: "Credit & Loans",
    description: "Understand credit scores, loans, and debt management.",
    sections: [
      {
        title: "Credit Scores Explained",
        content: `Your credit score is a numerical representation of your creditworthiness, typically ranging from 300-850. The most common scoring model is FICO, which considers payment history (35%), amounts owed (30%), length of credit history (15%), new credit (10%), and credit mix (10%).

Payment history is the most influential factor, making on-time payments crucial. Keep credit card balances low, ideally below 30% of your credit limit, to maintain a good score. Regularly check your credit reports for errors and dispute any inaccuracies.`,
      },
      {
        title: "Mortgage Loans",
        content: `Mortgage loans finance home purchases, with the property serving as collateral. Common types include conventional loans, FHA loans (lower down payment requirements), VA loans (for veterans), and USDA loans (for rural areas).

Fixed-rate mortgages maintain the same interest rate for the loan term, providing payment stability. Adjustable-rate mortgages (ARMs) have rates that can change after an initial fixed period, potentially resulting in lower initial rates but more uncertainty.

When applying for a mortgage, lenders evaluate your credit score, debt-to-income ratio, employment history, and down payment amount to determine loan eligibility and interest rate.`,
      },
      {
        title: "Student Loans",
        content: `Student loans help finance education expenses. Federal student loans offer benefits like fixed interest rates, income-driven repayment plans, loan forgiveness programs, and deferment/forbearance options.

Private student loans come from banks or financial institutions and generally offer fewer protections than federal loans. Interest rates for private loans are based on credit score and may be fixed or variable.

Repayment strategies include standard repayment (fixed monthly payments), income-driven plans (payments based on income), and refinancing (potentially lowering interest rates or monthly payments).`,
      },
      {
        title: "Debt Consolidation",
        content: `Debt consolidation combines multiple debts into a single loan, potentially with a lower interest rate, making payments more manageable and potentially saving money on interest.

Common consolidation methods include personal loans, balance transfer credit cards (often with promotional 0% interest periods), home equity loans, and debt management plans through credit counseling agencies.

Consider the total cost of consolidation, including interest paid over the loan term and any fees. Be cautious of consolidating unsecured debt (like credit cards) into secured debt (like a home equity loan) as you risk losing the collateral if you can't make payments.`,
      },
    ],
    resources: [
      {
        title: "myFICO - Understanding Credit Scores",
        url: "https://www.myfico.com/credit-education/credit-scores",
      },
      {
        title: "Consumer Financial Protection Bureau - Mortgages",
        url: "https://www.consumerfinance.gov/consumer-tools/mortgages/",
      },
    ],
  },
  "banking": {
    title: "Banking",
    description: "Navigate banking services and account options.",
    sections: [
      {
        title: "Account Types",
        content: `Common bank account types include checking accounts (for daily transactions), savings accounts (for setting aside money), money market accounts (higher interest with some check-writing privileges), and certificates of deposit (CDs - higher interest for fixed terms).

Checking accounts typically offer debit cards, checks, and online bill pay features but earn little to no interest. Consider checking accounts with no monthly fees, extensive ATM networks, and mobile banking capabilities.

Savings accounts are designed for storing money you don't need immediate access to, offering higher interest rates than checking accounts. High-yield savings accounts from online banks typically offer better rates than traditional brick-and-mortar banks.`,
      },
      {
        title: "Interest Rates",
        content: `Interest is the cost of borrowing money (when you take out a loan) or the return for lending money (when you deposit in a bank). Banks pay interest on deposit accounts and charge interest on loans.

Annual Percentage Yield (APY) represents the effective annual rate of return, accounting for compounding. Annual Percentage Rate (APR) represents the annual cost of a loan, including interest and fees.

The Federal Reserve's monetary policy influences interest rates throughout the economy. When the Fed raises rates, savings accounts tend to pay more interest, but loans become more expensive.`,
      },
      {
        title: "Online Banking",
        content: `Online banking allows you to manage accounts, transfer funds, pay bills, and deposit checks electronically. Benefits include 24/7 access, convenient transfers, automated bill payments, and real-time transaction monitoring.

Mobile banking apps enhance convenience further, offering features like mobile check deposit, person-to-person payments, card controls, and push notifications for transactions and account alerts.

To use online banking securely, create strong, unique passwords, enable two-factor authentication, avoid public Wi-Fi for banking, keep apps updated, and regularly monitor accounts for unauthorized transactions.`,
      },
      {
        title: "Banking Fees",
        content: `Common banking fees include monthly maintenance fees, overdraft fees, ATM fees, wire transfer fees, and foreign transaction fees. Understanding these fees helps you choose the right accounts and avoid unnecessary charges.

Strategies to avoid fees include maintaining minimum balance requirements, using in-network ATMs, setting up direct deposit, enabling overdraft protection, and choosing accounts with fee waiver options.

Look for banks that offer free checking accounts, reimburse ATM fees, don't charge for online bill pay, and have minimal or no overdraft fees. Online banks often have fewer fees than traditional banks due to lower operating costs.`,
      },
    ],
    resources: [
      {
        title: "FDIC - Learning Bank",
        url: "https://www.fdic.gov/resources/consumers/money-smart/learn-money-smart/index.html",
      },
      {
        title: "Bankrate - Compare Bank Accounts",
        url: "https://www.bankrate.com/banking/",
      },
    ],
  },
  "tax-planning": {
    title: "Tax Planning",
    description: "Optimize your tax strategy and understand tax implications.",
    sections: [
      {
        title: "Tax Deductions",
        content: `Tax deductions reduce your taxable income, lowering the amount of tax you owe. Common deductions include mortgage interest, state and local taxes (capped at $10,000), charitable contributions, medical expenses exceeding 7.5% of adjusted gross income, and certain business expenses.

Standard deduction is a flat amount ($12,950 for single filers, $25,900 for married filing jointly in 2022) that reduces taxable income without itemizing. Itemizing deductions is beneficial if their total exceeds the standard deduction amount.

Keep organized records and receipts for all potential tax deductions throughout the year. Consider consulting a tax professional to identify all applicable deductions for your situation.`,
      },
      {
        title: "Tax-Advantaged Accounts",
        content: `Tax-advantaged accounts offer tax benefits for specific purposes like retirement or healthcare. Retirement accounts include 401(k)s and IRAs, which provide either tax-deferred growth (traditional) or tax-free growth (Roth).

Health Savings Accounts (HSAs) offer triple tax advantages: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses. They're available to those with high-deductible health plans.

529 plans provide tax-free growth and withdrawals for qualified education expenses. Flexible Spending Accounts (FSAs) allow pre-tax contributions for healthcare or dependent care expenses but typically have "use it or lose it" provisions.`,
      },
      {
        title: "Capital Gains",
        content: `Capital gains tax applies to profits from selling assets like stocks, real estate, or businesses. Long-term capital gains (assets held over one year) are taxed at preferential rates (0%, 15%, or 20% depending on income), while short-term gains are taxed as ordinary income.

Tax-loss harvesting involves selling investments at a loss to offset capital gains, potentially reducing tax liability. Up to $3,000 of net capital losses can offset ordinary income annually, with additional losses carried forward to future years.

For real estate, the primary residence exclusion allows singles to exclude up to $250,000 in capital gains ($500,000 for married couples) if they've owned and lived in the home for at least two of the past five years.`,
      },
      {
        title: "Tax Filing",
        content: `Generally, most individuals must file federal tax returns by April 15th each year. Filing options include using tax software, hiring a professional preparer, or completing forms manually.

Common tax forms include W-2 (wage and salary income), 1099 forms (miscellaneous income), 1098 (mortgage interest), and Schedule forms for reporting specific types of income or deductions.

Consider filing electronically for faster processing and refunds. Direct deposit is the fastest way to receive tax refunds. If you need more time, file for an extension by the deadline, but remember that an extension to file is not an extension to pay taxes owed.`,
      },
    ],
    resources: [
      {
        title: "IRS - Tax Information for Individuals",
        url: "https://www.irs.gov/individuals",
      },
      {
        title: "TaxAct - Tax Planning Resources",
        url: "https://www.taxact.com/tax-information/tax-topics",
      },
    ],
  },
};

const LearnDetail = () => {
  const { topic } = useParams<{ topic: string }>();
  const content = topic ? learnContent[topic as keyof typeof learnContent] : null;

  if (!content) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Topic Not Found</h1>
        <p className="text-muted-foreground">The requested learning topic could not be found.</p>
        <Link to="/learn" className="mt-6 inline-block">
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Learning Resources
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12">
        <Link to="/learn" className="inline-flex items-center text-primary mb-6 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Learning Resources
        </Link>
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        <p className="text-muted-foreground">
          {content.description}
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto mb-12">
        {content.sections.map((section, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {section.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  External resource with valuable information about {content.title.toLowerCase()}.
                </p>
              </CardContent>
              <CardFooter>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    {resource.isDownloadable ? (
                      <>Download <Download className="ml-2 h-4 w-4" /></>
                    ) : (
                      <>Visit Resource <ExternalLink className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnDetail;
