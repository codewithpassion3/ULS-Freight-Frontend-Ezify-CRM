"use client"

import { format } from "date-fns"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"

export function DatePicker({ label, name, mode }: { label?: string, name: string, mode?: any }) {
    const { control, formState: { errors } } = useFormContext();
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col gap-2">
            <Label>{label ? label : "Date"}</Label>
            <Controller
                name={name}
                control={control}
                defaultValue={null}
                render={({ field: { value, onChange } }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} data-empty={!value} className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground">{value ? format(value, "PPP") : <span>Pick a date</span>}<CalendarIcon data-icon="inline-end" /></Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode={mode ? mode : "single"}
                                selected={value}
                                onSelect={(date: Date | undefined) => { onChange(date), setOpen(false) }}

                            // defaultMonth={value || undefined}
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
            {errors[name] && <p className="text-xs text-red-500 font-medium">{errors[name]?.message as string}</p>}
        </div>
    )
}
