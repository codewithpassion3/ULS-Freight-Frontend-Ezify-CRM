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
                    onChange={(e) => {
                        const raw = e.target.value

                        // allow empty input
                        if (raw === "") {
                            hourField.onChange("")
                            return
                        }

                        const value = Number(raw)

                        // clamp safely
                        if (value < 0) {
                            hourField.onChange(0)
                        } else if (value > 11) {
                            hourField.onChange(11)
                        } else {
                            hourField.onChange(value)
                        }
                    }}
                    // hide control buttons
                    className={`w-14 px-2 text-center ${hourError ? "border-red-500" : ""} [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                    value={hourField.value ?? ""}
                />
                <span>:</span>

                <Input
                    {...minuteField}
                    type="number"
                    min={0}
                    max={59}
                    onChange={(e) => {
                        const raw = e.target.value

                        // allow empty input
                        if (raw === "") {
                            minuteField.onChange("")
                            return
                        }

                        const value = Number(raw)

                        // clamp safely
                        if (value < 0) {
                            minuteField.onChange(0)
                        } else if (value > 59) {
                            minuteField.onChange(59)
                        } else {
                            minuteField.onChange(value)
                        }
                    }}
                    className={`w-14 px-2 text-center ${minuteError ? "border-red-500" : ""} [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
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