import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { CustomTooltip } from "./CustomToolTip"

interface ExpenseCategory {
  category: string
  total: number
}

interface ExpensesPieChartProps {
  data: ExpenseCategory[]
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
  "hsl(var(--destructive))",
]

export function ExpensesPieChart({ data }: ExpensesPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  )
}

