
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

const expenseCategories = [
  "Housing", "Transportation", "Food", "Utilities", 
  "Insurance", "Healthcare", "Savings", "Personal", 
  "Entertainment", "Debt", "Education", "Other"
];

const incomeCategories = [
  "Salary", "Investments", "Freelance", "Business", "Other"
];

const COLORS = [
  "#10b981", "#047857", "#059669", "#34d399", "#6ee7b7",  // Green shades
  "#f59e0b", "#d97706", "#b45309", "#fbbf24", "#fcd34d",  // Gold/Yellow shades
  "#3b82f6", "#2563eb", "#1d4ed8", "#60a5fa", "#93c5fd",  // Blue shades
  "#8b5cf6", "#7c3aed", "#6d28d9", "#a78bfa", "#c4b5fd",  // Purple shades
];

export function BudgetPlanner() {
  const [income, setIncome] = useState<BudgetItem[]>([
    { id: "1", name: "Primary Income", amount: 3000, type: "income", category: "Salary" }
  ]);
  const [expenses, setExpenses] = useState<BudgetItem[]>([
    { id: "1", name: "Rent", amount: 1200, type: "expense", category: "Housing" },
    { id: "2", name: "Groceries", amount: 400, type: "expense", category: "Food" },
    { id: "3", name: "Utilities", amount: 150, type: "expense", category: "Utilities" }
  ]);

  const addItem = (type: "income" | "expense") => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      name: "",
      amount: 0,
      type,
      category: type === "income" ? "Salary" : "Other"
    };
    
    if (type === "income") {
      setIncome([...income, newItem]);
    } else {
      setExpenses([...expenses, newItem]);
    }
  };

  const removeItem = (id: string, type: "income" | "expense") => {
    if (type === "income") {
      setIncome(income.filter(item => item.id !== id));
    } else {
      setExpenses(expenses.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof BudgetItem, value: string | number, type: "income" | "expense") => {
    if (type === "income") {
      setIncome(income.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    } else {
      setExpenses(expenses.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    }
  };

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Aggregate expenses by category for chart
  const expensesByCategory = expenses.reduce((acc, item) => {
    const existingCategory = acc.find(cat => cat.name === item.category);
    if (existingCategory) {
      existingCategory.value += item.amount;
    } else {
      acc.push({
        name: item.category,
        value: item.amount
      });
    }
    return acc;
  }, [] as { name: string, value: number }[]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Budget Planner</CardTitle>
        <CardDescription>Plan and visualize your monthly budget.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-finance-green/50">
            <CardHeader className="py-3">
              <CardTitle className="text-finance-green text-lg">Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className="border-finance-gold/50">
            <CardHeader className="py-3">
              <CardTitle className="text-finance-gold text-lg">Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card className={`${balance >= 0 ? 'border-finance-green/50' : 'border-destructive/50'}`}>
            <CardHeader className="py-3">
              <CardTitle className={`text-lg ${balance >= 0 ? 'text-finance-green' : 'text-destructive'}`}>Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-finance-green' : 'text-destructive'}`}>
                ${balance.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualization */}
        {expenses.length > 0 && (
          <div className="h-[300px] mt-6">
            <h3 className="font-semibold mb-4">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Income Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Income Sources</h3>
            <Button 
              onClick={() => addItem("income")} 
              variant="outline" 
              size="sm" 
              className="text-finance-green border-finance-green"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Income
            </Button>
          </div>
          
          <div className="space-y-3">
            {income.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <Input 
                    placeholder="Income Name" 
                    value={item.name} 
                    onChange={(e) => updateItem(item.id, "name", e.target.value, "income")}
                  />
                </div>
                <div className="w-full md:w-[150px]">
                  <Input 
                    type="number" 
                    min="0"
                    placeholder="Amount" 
                    value={item.amount} 
                    onChange={(e) => updateItem(item.id, "amount", Number(e.target.value), "income")}
                  />
                </div>
                <div className="w-full md:w-[200px]">
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={item.category}
                    onChange={(e) => updateItem(item.id, "category", e.target.value, "income")}
                  >
                    {incomeCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id, "income")}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Expenses Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Expenses</h3>
            <Button 
              onClick={() => addItem("expense")} 
              variant="outline" 
              size="sm"
              className="text-finance-gold border-finance-gold"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Expense
            </Button>
          </div>
          
          <div className="space-y-3">
            {expenses.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <Input 
                    placeholder="Expense Name" 
                    value={item.name} 
                    onChange={(e) => updateItem(item.id, "name", e.target.value, "expense")}
                  />
                </div>
                <div className="w-full md:w-[150px]">
                  <Input 
                    type="number" 
                    min="0"
                    placeholder="Amount" 
                    value={item.amount} 
                    onChange={(e) => updateItem(item.id, "amount", Number(e.target.value), "expense")}
                  />
                </div>
                <div className="w-full md:w-[200px]">
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={item.category}
                    onChange={(e) => updateItem(item.id, "category", e.target.value, "expense")}
                  >
                    {expenseCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id, "expense")}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {balance >= 0 
            ? "You have a positive balance. Consider investing the extra money." 
            : "Your expenses exceed your income. Consider reducing some expenses."}
        </div>
      </CardFooter>
    </Card>
  );
}
