"use server";

import { revalidatePath } from "next/cache";
import { and, eq  } from "drizzle-orm";
import { getUserId } from "@/lib/auth";
import { insertTransactionSchema, transactions } from "@/db/schema";
import { z } from "zod";
import { db } from "@/db";

export async function addTransaction(
  data: z.infer<typeof insertTransactionSchema>
) {
  try {
    const userId = await getUserId();
    await db.insert(transactions).values({ ...data, userId, id: data.id });
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to add transaction" };
  }
}

export async function deleteTransaction(id: string) {
  try {
    const userId = await getUserId();
    await db
      .delete(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to delete transaction" };
  }
}
