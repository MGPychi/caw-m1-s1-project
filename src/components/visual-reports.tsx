'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Cell } from "recharts"

interface ChartData {
  totalIncome: number
  totalExpenses: number
  categoryExpenses: Record<string, number>
}

export function VisualReports({ data }: { data: ChartData }) {
  const incomeVsExpenses = [
    { name: "Income", value: data.totalIncome / 100 },
    { name: "Expenses", value: data.totalExpenses / 100 },
  ]

  const categoryExpenses = Object.entries(data.categoryExpenses).map(([name, value]) => ({
    name,
    value: value / 100,
  }))

  const colors = [
    "#10B981",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#EC4899",
    "#F43F5E",
    "#F59E0B",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visual Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList>
            <TabsTrigger value="bar">Income vs Expenses</TabsTrigger>
            <TabsTrigger value="pie">Expense Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="bar">
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeVsExpenses}>
                  <Bar dataKey="value">
                    {incomeVsExpenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? colors[0] : colors[1]} />
                    ))}
                  </Bar>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            title={payload[0]!.payload.name}
                            // content={payload && payload[0] && typeof payload[0].value === 'number' ? `$${payload[0].value.toFixed(2)}` : undefined}
                          />
                        )
                      }
                      return null
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="pie">
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryExpenses}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => entry.name}
                  >
                    {categoryExpenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            title={String(payload[0]!.name)}
                            // content={`$${(payload[0].value as number).toFixed(2)}`}
                          />
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

