import { getTransactions } from "@/app/data/transactions-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { DeleteTransaction } from "./delete-transaction"

export async function TransactionList() {
  const transactions = await getTransactions()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <p className="font-medium">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category} • {format(transaction.date, "PPP")}
                </p>
                {transaction.notes && (
                  <p className="text-sm text-muted-foreground">{transaction.notes}</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p
                  className={`font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {(transaction.amount).toFixed(2)}
                </p>
                <DeleteTransaction id={transaction.id} />
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <p className="text-center text-muted-foreground">
              No transactions yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

