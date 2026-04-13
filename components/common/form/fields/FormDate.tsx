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
    console.log(config)
    const { field, error } = useFieldController(config?.name)
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

                    // defaultMonth={value || undefined}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
})
export default FormDate