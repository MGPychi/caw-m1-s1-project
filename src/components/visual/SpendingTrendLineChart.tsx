import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { CustomTooltip } from "./CustomToolTip"

interface MonthlyData {
  month: string
  income: number
  expenses: number
}

interface SpendingTrendLineChartProps {
  data: MonthlyData[]
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
]

export function SpendingTrendLineChart({ data }: SpendingTrendLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <Line
          type="monotone"
          dataKey="income"
          stroke={COLORS[0]}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke={COLORS[1]}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

