
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { InfoCircle } from "lucide-react";

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(1000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(10);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12);
  const [results, setResults] = useState<any[]>([]);

  const calculateCompoundInterest = () => {
    const yearlyResults = [];
    let totalAmount = principal;
    let interestEarned = 0;
    let contributionsTotal = 0;

    for (let year = 1; year <= time; year++) {
      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution
        totalAmount += monthlyContribution;
        contributionsTotal += monthlyContribution;

        // Apply compound interest based on frequency
        if (month % (12 / compoundFrequency) === 0) {
          const interestForPeriod = totalAmount * (rate / 100) / compoundFrequency;
          totalAmount += interestForPeriod;
          interestEarned += interestForPeriod;
        }
      }

      yearlyResults.push({
        year,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        interestEarned: parseFloat(interestEarned.toFixed(2)),
        contributionsTotal: parseFloat(contributionsTotal.toFixed(2)),
        principal: parseFloat(principal.toFixed(2))
      });
    }

    setResults(yearlyResults);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Compound Interest Calculator</CardTitle>
        <CardDescription>Calculate how your investments grow over time with compound interest.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <Label htmlFor="principal">Initial Investment ($)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="rate">Annual Interest Rate (%): {rate}%</Label>
            <Slider
              id="rate"
              value={[rate]}
              min={0}
              max={20}
              step={0.1}
              onValueChange={(value) => setRate(value[0])}
              className="my-2"
            />
          </div>
          <div>
            <Label htmlFor="time">Time Period (Years): {time} years</Label>
            <Slider
              id="time"
              value={[time]}
              min={1}
              max={50}
              onValueChange={(value) => setTime(value[0])}
              className="my-2"
            />
          </div>
          <div>
            <Label htmlFor="compoundFrequency">Compound Frequency</Label>
            <select
              id="compoundFrequency"
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="1">Annually</option>
              <option value="2">Semi-Annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-primary/10 rounded-md">
              <h3 className="font-semibold text-lg">Results Summary</h3>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Initial Investment</p>
                  <p className="text-lg font-medium">${principal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Contributions</p>
                  <p className="text-lg font-medium">${(results[results.length - 1].contributionsTotal).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interest Earned</p>
                  <p className="text-lg font-medium text-finance-green">${(results[results.length - 1].interestEarned).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Final Balance</p>
                  <p className="text-lg font-medium text-finance-gold">${(results[results.length - 1].totalAmount).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                  <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => ['$' + value.toLocaleString(), undefined]} />
                  <Legend />
                  <Line type="monotone" dataKey="totalAmount" name="Total Balance" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="interestEarned" name="Interest Earned" stroke="#0ea5e9" strokeWidth={2} />
                  <Line type="monotone" dataKey="contributionsTotal" name="Total Contributions" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calculateCompoundInterest} className="w-full bg-finance-green hover:bg-finance-green/90">Calculate Results</Button>
      </CardFooter>
    </Card>
  );
}
