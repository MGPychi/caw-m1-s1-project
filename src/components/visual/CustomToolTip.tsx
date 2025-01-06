import { TooltipProps } from "recharts"
import { Payload } from "recharts/types/component/DefaultTooltipContent"

export function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <p className="text-sm font-medium">{label}</p>
        {payload?.map((entry: Payload<number, string>, index: number) => (
          <p key={`item-${index}`} className="text-sm">
            {entry.name}: ${entry!.value!.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

