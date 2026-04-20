"use client"

import { Label } from "@/components/ui/label"
import { memo } from "react"
import { useFieldController } from "../useFieldController"
import { Input } from "@/components/ui/input"
import { FormTimeProps } from "./fields.types"

const FormTime = memo(({ field: config }: { field: FormTimeProps }) => {
    const { field: hourField, error: hourError } = useFieldController(config.hourName)
    const { field: minuteField, error: minuteError } = useFieldController(config.minuteName)
    const { field: ampmField, error: ampmError } = useFieldController(config.ampmName)
    return (
        <div className="space-y-2">
            <Label className="text-xs text-muted-foreground font-medium">
                {config.label}
            </Label>

            <div className="flex items-center gap-2">
                <Input
                    {...hourField}
                    type="number"
                    min={0}
                    max={11}
                    className={`w-14 px-2 text-center ${hourError ? "border-red-500" : ""}`}
                    value={hourField.value ?? ""}
                />
                <span>:</span>

                <Input
                    {...minuteField}
                    type="number"
                    min={0}
                    max={59}
                    className={`w-14 px-2 text-center ${minuteError ? "border-red-500" : ""}`}
                    value={minuteField.value ?? ""}
                />


                <div className="flex border border-border rounded-md bg-background w-max">
                    <button
                        type="button"
                        onClick={() => ampmField.onChange("AM")}
                        className={`px-3 py-2 text-xs font-semibold cursor-pointer ${ampmField.value === "AM"
                            ? "bg-muted text-[#4aa0e3]"
                            : "hover:bg-muted/50"
                            }`}
                    >
                        AM
                    </button>
                    <button
                        type="button"
                        onClick={() => ampmField.onChange("PM")}
                        className={`px-3 py-2 text-xs font-semibold cursor-pointer ${ampmField.value === "PM"
                            ? "bg-muted text-[#4aa0e3]"
                            : "hover:bg-muted/50"
                            } ${ampmError ? "border-red-500" : ""}`}
                    >
                        PM
                    </button>
                </div>

            </div>

            {/* {(hourError || minuteError || ampmError) && (
                <p className="text-xs text-red-500">
                    {hourError?.message || minuteError?.message || ampmError?.message}
                </p>
            )} */}
        </div>
    )
})

export default FormTime