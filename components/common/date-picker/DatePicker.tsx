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

export function DatePicker({ name, mode }: { name: string, mode?: any }) {
    const { control } = useFormContext();
    const [date, setDate] = useState<Date>()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} data-empty={!date} className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground">{date ? format(date, "PPP") : <span>Pick a date</span>}<CalendarIcon data-icon="inline-end" /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Controller
                    name={name}
                    control={control}
                    defaultValue={null}
                    render={({ field: { value, onChange } }) => (
                        <Calendar
                            mode={mode ? mode : "single"}
                            selected={value}
                            onSelect={onChange}
                        // defaultMonth={value || undefined}
                        />
                    )}
                />
            </PopoverContent>
        </Popover>
    )
}
