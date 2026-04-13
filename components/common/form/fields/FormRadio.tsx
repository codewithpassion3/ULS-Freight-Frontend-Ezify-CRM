"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { memo } from "react"
import { FormRadioTypes } from "./fields.types"
import { useFieldController } from "../useFieldController"

const FormRadio = memo(({ field: config }: { field: FormRadioTypes }) => {
    const { field } = useFieldController(config.name)
    return (
        <div className={config.wrapperClassName}>
            <RadioGroup
                onValueChange={(value) => {
                    field.onChange(config.valueType === "number" ? Number(value) : value)

                }}
                defaultValue={config.defaultValue?.toString()}
                onChange={() => field.onChange}
                className={`flex gap-6 ${config.className} cursor-pointer`}
            >
                {config.options.map((opt) => {
                    const isSelected = field.value?.toString() === opt.value.toString()
                    return (
                        <div key={opt.value} className="flex items-center gap-2 ">
                            <RadioGroupItem
                                disabled={config.disabled}
                                value={opt.value.toString()}
                                id={`${config.name}-${opt.value}`}
                                className={`${isSelected ? config.selectedClassName : ""} cursor-pointer`}
                            />
                            <Label htmlFor={`${config.name}-${opt.value}`} className="cursor-pointer">
                                {opt.label}
                            </Label>
                        </div>
                    )
                })}
            </RadioGroup>
        </div>
    )
})
export default FormRadio