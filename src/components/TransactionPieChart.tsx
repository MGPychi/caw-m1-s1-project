"use client"

import * as React from "react"
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface TransactionData {
    category: string;
    totalAmount: number;
}

interface TransactionPieChartProps {
    data: TransactionData[];
}

const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
]

export function TransactionPieChart({ data }: TransactionPieChartProps) {
    const chartData = data.map((item, index) => ({
        category: item.category,
        amount: Number(item.totalAmount), // Convert to number
        fill: colors[index % colors.length],
    }));

    console.log("chartData",chartData)

    const chartConfig: ChartConfig = chartData.reduce((acc, curr, index) => {
        acc[curr.category.toLowerCase()] = {
            label: curr.category,
            color: colors[index % colors.length],
        }
        return acc
    }, {} as ChartConfig)

    const totalAmount = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.amount, 0)
    }, [chartData])

    const percentageChange = 3.7 // This would typically be calculated based on historical data

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Transaction Distribution</CardTitle>
                <CardDescription>Current Month Overview</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    ${totalAmount.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Spent
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {chartData.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.fill }}
                            />
                            <span className="text-sm">{item.category}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {percentageChange > 0 ? (
                        <>
                            Trending up by {percentageChange.toFixed(1)}% this month{" "}
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </>
                    ) : (
                        <>
                            Trending down by {Math.abs(percentageChange).toFixed(1)}% this month{" "}
                            <TrendingDown className="h-4 w-4 text-red-500" />
                        </>
                    )}
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total spending by category for the current month
                </div>
            </CardFooter>
        </Card>
    )
}

