"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpensesPieChart } from "./visual/ExpensesPieChart"
import { MonthlyOverviewBarChart } from "./visual/MonthlyOverviewBarChart"
import { SpendingTrendLineChart } from "./visual/SpendingTrendLineChart"

interface ChartData {
  expenses: {
    byCategory: { category: string; total: number }[]
    byMonth: { month: string; income: number; expenses: number }[]
  }
}

export function VisualReports({ data }: { data: ChartData }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Financial Reports</CardTitle>
        <CardDescription>
          Visualize your financial data through different chart types
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="category" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="category">Expenses by Category</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Overview</TabsTrigger>
            <TabsTrigger value="trend">Spending Trend</TabsTrigger>
          </TabsList>

          <TabsContent value="category">
            <div className="h-[400px] w-full">
              <ExpensesPieChart data={data.expenses.byCategory} />
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="h-[400px] w-full">
              <MonthlyOverviewBarChart data={data.expenses.byMonth} />
            </div>
          </TabsContent>

          <TabsContent value="trend">
            <div className="h-[400px] w-full">
              <SpendingTrendLineChart data={data.expenses.byMonth} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

