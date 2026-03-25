"use client"

import { useMemo, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  placeholder?: string
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
}

export function MultiSelect({
  options,
  placeholder = "Select",
  value,
  defaultValue = [],
  onChange,
}: MultiSelectProps) {
  const [internalSelected, setInternalSelected] = useState<string[]>(defaultValue)

  const selected = value ?? internalSelected
  const isAllSelected = useMemo(() => selected.length === options.length && options.length > 0, [selected.length, options.length])

  const handleSelectAll = (checked: boolean) => {
    const next = checked ? options.map((o) => o.value) : []
    if (value === undefined) setInternalSelected(next)
    onChange?.(next)
  }

  const handleSelect = (value: string, checked: boolean) => {
    const next = checked ? [...selected, value] : selected.filter((v) => v !== value)
    if (value === undefined) setInternalSelected(next)
    onChange?.(next)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-between font-normal text-muted-foreground bg-background border-border"
        >
          {selected.length > 0 ? `${selected.length} Selected` : placeholder}
          <div className="flex flex-col items-center justify-center -mr-1">
             <span className="text-[10px] text-muted-foreground leading-none">▲</span>
             <span className="text-[10px] text-muted-foreground leading-none">▼</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <div className="flex flex-col max-h-[300px] overflow-y-auto w-full p-1 border-t">
          <div className="flex items-center space-x-2 p-2 hover:bg-muted cursor-pointer">
            <Checkbox 
              id="select-all" 
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-normal cursor-pointer w-full">
              Select All ({options.length} Items)
            </label>
          </div>
          
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2 p-2 hover:bg-muted cursor-pointer">
              <Checkbox 
                id={`item-${option.value}`} 
                checked={selected.includes(option.value)}
                onCheckedChange={(checked) => handleSelect(option.value, !!checked)}
              />
              <label htmlFor={`item-${option.value}`} className="text-sm font-normal cursor-pointer w-full text-foreground">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
