import { Suspense } from "react"
import { AddTransaction } from "@/components/add-transaction"
import { Overview } from "@/components/overview"
import { TransactionList } from "@/components/transaction-list"
import { VisualReports } from "@/components/visual-reports"
import { getChartData } from "./data/transactions-data"
import { getUserId } from "@/lib/auth"

export default async function Dashboard() {
  const chartData = await getChartData()
  const userId = await getUserId()

  return (
    <main className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Masroofy Budget Tracker</h1>
      
      <Suspense fallback={<div>Loading overview...</div>}>
        <Overview />
      </Suspense>

      <div className="grid gap-8 md:grid-cols-2">
        <AddTransaction userId={userId} />
        <Suspense fallback={<div>Loading transactions...</div>}>
          <TransactionList />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading reports...</div>}>
        <VisualReports data={chartData} />
      </Suspense>
    </main>
  )
}

