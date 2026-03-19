"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export type DateRangeValue = {
  from?: string
  to?: string
}

type CustomDateRangePickerProps = {
  value?: DateRangeValue
  onChange?: (value: DateRangeValue) => void
}

function formatDisplayDate(isoDate?: string) {
  if (!isoDate) return ""
  const d = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(d.getTime())) return isoDate
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(d)
}

export function CustomDateRangePicker({ value, onChange }: CustomDateRangePickerProps) {
  const [draft, setDraft] = useState<DateRangeValue>(() => ({
    from: value?.from,
    to: value?.to,
  }))

  useEffect(() => {
    setDraft({ from: value?.from, to: value?.to })
  }, [value?.from, value?.to])

  const summary = useMemo(() => {
    if (draft.from && draft.to) return `${formatDisplayDate(draft.from)} - ${formatDisplayDate(draft.to)}`
    if (draft.from) return `From ${formatDisplayDate(draft.from)}`
    if (draft.to) return `Until ${formatDisplayDate(draft.to)}`
    return "Select date range"
  }, [draft.from, draft.to])

  const apply = () => {
    onChange?.({
      from: draft.from || undefined,
      to: draft.to || undefined,
    })
  }

  const setToday = () => {
    const today = new Date()
    const iso = today.toISOString().slice(0, 10)
    setDraft({ from: iso, to: iso })
  }

  const setLastDays = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)
    const fromIso = start.toISOString().slice(0, 10)
    const toIso = end.toISOString().slice(0, 10)
    setDraft({ from: fromIso, to: toIso })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex w-[240px]">
          <Button
            variant="outline"
            type="button"
            className="flex-1 rounded-r-none font-normal justify-start px-3 text-muted-foreground border-border bg-background"
          >
            {summary}
          </Button>
          <Button
            type="button"
            className="rounded-l-none bg-[#0070c0] hover:bg-[#005999] px-3"
            aria-label="Open date range picker"
          >
            <CalendarIcon size={16} />
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[600px] p-4" align="start">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              className="text-[#0070c0] border-[#0070c0]"
              onClick={() => setToday()}
            >
              Today
            </Button>
            <Button type="button" className="bg-[#0070c0] hover:bg-[#005999]" onClick={() => setLastDays(7)}>
              Last 7 days
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-[#0070c0] border-[#0070c0]"
              onClick={() => setLastDays(14)}
            >
              Last 14 days
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 items-end">
          <div className="space-y-1 w-[220px]">
            <label className="text-sm text-muted-foreground block">From</label>
            <Input type="date" value={draft.from || ""} onChange={(e) => setDraft((s) => ({ ...s, from: e.target.value }))} />
          </div>
          <div className="space-y-1 w-[220px]">
            <label className="text-sm text-muted-foreground block">To</label>
            <Input type="date" value={draft.to || ""} onChange={(e) => setDraft((s) => ({ ...s, to: e.target.value }))} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDraft({})
              onChange?.({})
            }}
          >
            Clear
          </Button>
          <Button type="button" className="bg-[#0070c0] hover:bg-[#005999] px-6" onClick={apply}>
            Apply
          </Button>
        </div>

      </PopoverContent>
    </Popover>
  )
}
