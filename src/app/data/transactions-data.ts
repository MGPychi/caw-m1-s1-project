"use server";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { getUserId } from "@/lib/auth";
import { desc, eq, sql } from "drizzle-orm";

export async function getTransactions() {
  try {
    const userId = await getUserId();
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.date));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getSummary() {
  try {
    const userId = await getUserId();
    const result = await db
      .select({
        totalIncome: sql<number>`COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0)`,
        totalExpenses: sql<number>`COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0)`,
      })
      .from(transactions)
      .where(eq(transactions.userId, userId));

    return {
      totalIncome: result[0].totalIncome,
      totalExpenses: result[0].totalExpenses,
      balance: result[0].totalIncome - result[0].totalExpenses,
    };
  } catch (error) {
    console.error(error);
    return { totalIncome: 0, totalExpenses: 0, balance: 0 };
  }
}

export async function getChartData() {
  const userId = await getUserId()

  // Get expenses by category
  const expensesByCategory = await db
    .select({
      category: transactions.category,
      total: sql<number>`sum(${transactions.amount})`,
    })
    .from(transactions)
    .where(sql`${transactions.userId} = ${userId} AND ${transactions.type} = 'expense'`)
    .groupBy(transactions.category)

  // Get monthly income and expenses
  const monthlyData = await db
    .select({
      month: sql<string>`to_char(${transactions.date}, 'YYYY-MM')`,
      income: sql<number>`sum(CASE WHEN ${transactions.type} = 'income' THEN ${transactions.amount} ELSE 0 END)`,
      expenses: sql<number>`sum(CASE WHEN ${transactions.type} = 'expense' THEN ${transactions.amount} ELSE 0 END)`,
    })
    .from(transactions)
    .where(sql`${transactions.userId} = ${userId}`)
    .groupBy(sql`to_char(${transactions.date}, 'YYYY-MM')`)
    .orderBy(sql`to_char(${transactions.date}, 'YYYY-MM')`)

  return {
    expenses: {
      byCategory: expensesByCategory,
      byMonth: monthlyData,
    },
  }
}

