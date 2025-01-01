import { getSummary } from "@/app/data/transactions-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function Overview() {
  const { totalIncome, totalExpenses, balance } = await getSummary()
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">
            ${(totalIncome / 100).toFixed(2)}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">
            ${(totalExpenses / 100).toFixed(2)}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${(balance / 100).toFixed(2)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

