
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

export function RetirementCalculator() {
  // Current financial information
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(90);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlySavings, setMonthlySavings] = useState<number>(500);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [expectedIncome, setExpectedIncome] = useState<number>(60000);
  const [incomeReplacementRate, setIncomeReplacementRate] = useState<number>(80);
  
  const [results, setResults] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculateRetirement = () => {
    const yearsUntilRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    // Calculate retirement savings
    let totalSavings = currentSavings;
    const yearlyData = [];
    
    // Growth phase (accumulation)
    for (let year = 1; year <= yearsUntilRetirement; year++) {
      // Add annual contributions (monthly savings * 12)
      totalSavings += monthlySavings * 12;
      
      // Apply investment return
      totalSavings *= (1 + expectedReturn / 100);
      
      yearlyData.push({
        age: currentAge + year,
        savings: Math.round(totalSavings),
        phase: "accumulation"
      });
    }
    
    // Calculate required annual income in retirement (adjusted for inflation)
    const inflationFactor = Math.pow(1 + inflationRate / 100, yearsUntilRetirement);
    const requiredAnnualIncome = (expectedIncome * (incomeReplacementRate / 100) * inflationFactor);
    
    // Withdrawal phase
    let remainingSavings = totalSavings;
    for (let year = 1; year <= yearsInRetirement; year++) {
      // Withdraw income (adjusted for ongoing inflation)
      const yearInflationFactor = Math.pow(1 + inflationRate / 100, year);
      const yearlyWithdrawal = requiredAnnualIncome * yearInflationFactor;
      
      // Remaining savings continue to grow
      remainingSavings = (remainingSavings - yearlyWithdrawal) * (1 + expectedReturn / 100);
      
      yearlyData.push({
        age: retirementAge + year,
        savings: Math.max(0, Math.round(remainingSavings)),
        phase: "withdrawal",
        yearlyWithdrawal: Math.round(yearlyWithdrawal)
      });
    }
    
    // Calculate if savings will last through retirement
    const savingsWillLast = remainingSavings > 0;
    
    // Calculate total contributions
    const totalContributions = currentSavings + (monthlySavings * 12 * yearsUntilRetirement);
    
    // Calculate investment growth
    const investmentGrowth = totalSavings - totalContributions;
    
    setResults({
      savingsAtRetirement: totalSavings,
      requiredAnnualIncome,
      savingsWillLast,
      yearsUntilRetirement,
      yearsInRetirement,
      totalContributions,
      investmentGrowth
    });
    
    setChartData(yearlyData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Retirement Calculator</CardTitle>
        <CardDescription>Plan your retirement and see if your savings will last.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <Label htmlFor="currentAge">Current Age: {currentAge}</Label>
            <Slider
              id="currentAge"
              value={[currentAge]}
              min={18}
              max={80}
              onValueChange={(value) => setCurrentAge(value[0])}
              className="my-2"
            />
          </div>
          <div>
            <Label htmlFor="retirementAge">Retirement Age: {retirementAge}</Label>
            <Slider
              id="retirementAge"
              value={[retirementAge]}
              min={currentAge + 1}
              max={85}
              onValueChange={(value) => setRetirementAge(value[0])}
              className="my-2"
            />
          </div>
          <div>
            <Label htmlFor="lifeExpectancy">Life Expectancy: {lifeExpectancy}</Label>
            <Slider
              id="lifeExpectancy"
              value={[lifeExpectancy]}
              min={retirementAge + 1}
              max={110}
              onValueChange={(value) => setLifeExpectancy(value[0])}
              className="my-2"
            />
          </div>
          <div>
            <Label htmlFor="currentSavings">Current Retirement Savings ($)</Label>
            <Input
              id="currentSavings"
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="monthlySavings">Monthly Contributions ($)</Label>
            <Input
              id="monthlySavings"
              type="number"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="expectedReturn">Expected Annual Return (%): {expectedReturn}%</Label>
            <Slider
              id="expectedReturn"
              value={[expectedReturn]}
              min={1}
              max={15}
              step={0.1}
              onValueChange={(value) => setExpectedReturn(value[0])}
              className="my-2"
            />
          </div>
          <div>
            <Label htmlFor="inflationRate">Expected Inflation Rate (%): {inflationRate}%</Label>
            <Slider
              id="inflationRate"
              value={[inflationRate]}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(value) => setInflationRate(value[0])}
              className="my-2"
            />
          </div>
          <div>
            <Label htmlFor="expectedIncome">Current Annual Income ($)</Label>
            <Input
              id="expectedIncome"
              type="number"
              value={expectedIncome}
              onChange={(e) => setExpectedIncome(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="incomeReplacementRate">Income Replacement Rate (%): {incomeReplacementRate}%</Label>
            <Slider
              id="incomeReplacementRate"
              value={[incomeReplacementRate]}
              min={30}
              max={100}
              onValueChange={(value) => setIncomeReplacementRate(value[0])}
              className="my-2"
            />
          </div>
        </div>

        {results && (
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-primary/10 rounded-md">
              <h3 className="font-semibold text-lg">Retirement Projection</h3>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Savings at Retirement</p>
                  <p className="text-lg font-medium text-finance-green">
                    {formatCurrency(results.savingsAtRetirement)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Income Needed</p>
                  <p className="text-lg font-medium text-finance-gold">
                    {formatCurrency(results.requiredAnnualIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Will Savings Last?</p>
                  <p className={`text-lg font-medium ${results.savingsWillLast ? 'text-finance-green' : 'text-destructive'}`}>
                    {results.savingsWillLast ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Years Until Retirement</p>
                  <p className="text-lg font-medium">{results.yearsUntilRetirement}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Years In Retirement</p>
                  <p className="text-lg font-medium">{results.yearsInRetirement}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Investment Growth</p>
                  <p className="text-lg font-medium text-finance-blue">
                    {formatCurrency(results.investmentGrowth)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="age" 
                    label={{ value: 'Age', position: 'insideBottomRight', offset: -5 }} 
                  />
                  <YAxis 
                    label={{ value: 'Savings ($)', angle: -90, position: 'insideLeft' }}
                    tickFormatter={(value) => `$${(value/1000)}k`}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => {
                      if (name === 'savings') return [formatCurrency(value), 'Savings'];
                      return [formatCurrency(value), 'Annual Withdrawal'];
                    }}
                    labelFormatter={(label) => `Age: ${label}`}
                  />
                  <Legend />
                  <ReferenceLine x={retirementAge} stroke="#ff0000" label="Retirement" />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    name="Savings" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="yearlyWithdrawal" 
                    name="Annual Withdrawal" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    dot={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calculateRetirement} className="w-full bg-finance-blue hover:bg-finance-blue/90">Calculate Retirement Plan</Button>
      </CardFooter>
    </Card>
  );
}
