'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { deleteTransaction } from "@/app/actions/transactions-actions"

export function DeleteTransaction({ id }: { id: string }) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this transaction?")) return
    
    setIsPending(true)
    await deleteTransaction(id)
    setIsPending(false)
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

