"use client"
import { Label } from "@/components/ui/label"
import { memo } from "react"
import { FormRadioTypes } from "./fields.types"
import { useFieldController } from "../useFieldController"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { FormDateTypes } from "./fields.types"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

const FormDate = memo(({ field: config }: { field: any }) => {
    const [open, setOpen] = useState(false)

    const { field, error } = useFieldController(config?.name)
    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()

    const today = new Date()
    return (
        <div className={`${config.wrapperClassName} space-y-2`}>
            <Label>{config.label ? config.label : "Date"}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} data-empty={!field.value} className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground">{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}<CalendarIcon data-icon="inline-end" /></Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode={config.mode ? config.mode : "single"}
                        selected={field.value}
                        onSelect={(date: Date | undefined) => { field.onChange(date), setOpen(false), config.setShipDate?.(date) }}
                        // include today
                        disabled={(date) => {
                            if (!config.futureDatesOnly) return false

                            // allow today + future
                            return date < new Date(today.setHours(0, 0, 0, 0))
                        }}
                    // defaultMonth={value || undefined}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
})
export default FormDate