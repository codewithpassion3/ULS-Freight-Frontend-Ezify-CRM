"use client"

import { Controller, useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FormCheckboxTypes } from "./fields.types"
import { memo } from "react"
import { useFieldController } from "../useFieldController"

const FormCheckbox = memo(({ field: config }: { field: FormCheckboxTypes }) => {

    const { field, error } = useFieldController(config.name)

    return (
        <div className={`flex items-center gap-2 ${config.wrapperClassName || ""}`}>
            {/* icon position left */}
            {config.iconPosition === "left" && config.icon}
            <Checkbox
                id={field.name}
                checked={field.value || false}
                onCheckedChange={(checked) => field.onChange(checked)}
                className={`${field.value ? config.selectedClassName : ""} ${error ? "border-red-500 bg-red-50 placeholder:text-red-500" : ""} border-border cursor-pointer`}
            />
            {config.label && (
                <Label htmlFor={field.name} className={`cursor-pointer ${error ? "text-red-500" : ""}`}>
                    {config.label}
                </Label>
            )}
            {config.iconPosition === "right" && config.icon}
        </div>
    )
})
export default FormCheckbox