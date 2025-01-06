import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { CustomTooltip } from "./CustomToolTip"

interface MonthlyData {
  month: string
  income: number
  expenses: number
}

interface MonthlyOverviewBarChartProps {
  data: MonthlyData[]
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
]

export function MonthlyOverviewBarChart({ data }: MonthlyOverviewBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString("default", {
              month: "short",
              year: "2-digit",
            })
          }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="income"
          fill={COLORS[0]}
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
        <Bar
          dataKey="expenses"
          fill={COLORS[1]}
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

