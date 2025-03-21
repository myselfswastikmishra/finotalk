
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { InfoIcon } from 'lucide-react';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(1000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(10);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12); // monthly
  const [result, setResult] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, monthlyContribution, compoundFrequency]);

  const calculateCompoundInterest = () => {
    const P = principal;
    const r = rate / 100;
    const t = time;
    const n = compoundFrequency;
    const PMT = monthlyContribution;

    // Calculate compound interest with regular contributions
    let totalAmount = P;
    const newChartData = [];

    for (let year = 1; year <= t; year++) {
      let yearlyAmount = totalAmount;
      
      for (let i = 0; i < n; i++) {
        // Add monthly contribution
        yearlyAmount += PMT;
        // Apply compound interest for this period
        yearlyAmount *= (1 + r/n);
      }
      
      totalAmount = yearlyAmount;
      
      const principalToDate = P + (PMT * n * year);
      const interestEarned = totalAmount - principalToDate;
      
      newChartData.push({
        year: `Year ${year}`,
        'Principal': principalToDate,
        'Interest': interestEarned,
        'Total': totalAmount
      });
    }

    setResult(totalAmount);
    setChartData(newChartData);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const chartConfig = {
    Principal: { label: "Principal", color: "#16a34a" },
    Interest: { label: "Interest", color: "#2563eb" },
    Total: { label: "Total Value", color: "#7c3aed" }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Compound Interest Calculator</CardTitle>
        <CardDescription>
          Calculate how your investments can grow over time with compound interest
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="principal" className="text-sm font-medium">
                  Initial Investment
                </label>
                <span className="text-sm text-muted-foreground">{formatCurrency(principal)}</span>
              </div>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                min={0}
              />
              <Slider
                value={[principal]}
                min={0}
                max={50000}
                step={100}
                onValueChange={(value) => setPrincipal(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="monthlyContribution" className="text-sm font-medium">
                  Monthly Contribution
                </label>
                <span className="text-sm text-muted-foreground">{formatCurrency(monthlyContribution)}</span>
              </div>
              <Input
                id="monthlyContribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                min={0}
              />
              <Slider
                value={[monthlyContribution]}
                min={0}
                max={2000}
                step={10}
                onValueChange={(value) => setMonthlyContribution(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="rate" className="text-sm font-medium">
                  Annual Interest Rate (%)
                </label>
                <span className="text-sm text-muted-foreground">{rate}%</span>
              </div>
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                min={0}
                max={30}
                step={0.1}
              />
              <Slider
                value={[rate]}
                min={0}
                max={20}
                step={0.1}
                onValueChange={(value) => setRate(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="time" className="text-sm font-medium">
                  Time Period (Years)
                </label>
                <span className="text-sm text-muted-foreground">{time} years</span>
              </div>
              <Input
                id="time"
                type="number"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                min={1}
                max={50}
              />
              <Slider
                value={[time]}
                min={1}
                max={40}
                step={1}
                onValueChange={(value) => setTime(value[0])}
              />
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start mb-2">
                <InfoIcon className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Compound interest is the addition of interest to the principal sum of a loan or deposit,
                  or in other words, interest on interest.
                </p>
              </div>
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Future Value:</h3>
                  <span className="text-2xl font-bold text-finance-green">{formatCurrency(result)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip formatter={(value) => [`${formatCurrency(value as number)}`, ""]} />
                  <Legend />
                  <Bar dataKey="Principal" stackId="a" fill="#16a34a" />
                  <Bar dataKey="Interest" stackId="a" fill="#2563eb" />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="mb-2">
                This chart shows how your investment grows over time. The green portion represents your 
                principal (initial investment plus all contributions), while the blue portion shows the 
                interest earned.
              </p>
              <p>
                Results are estimates and for illustrative purposes only. They do not reflect actual investment
                results or taxes, inflation, or other factors that can affect investment performance.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
