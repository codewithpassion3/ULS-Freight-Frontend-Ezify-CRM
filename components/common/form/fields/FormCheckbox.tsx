"use client"

import { Controller, useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FormCheckboxTypes } from "./fields.types"
import { memo } from "react"
import { useFieldController } from "../useFieldController"

const FormCheckbox = memo(({ field: config }: { field: FormCheckboxTypes }) => {

    const { field } = useFieldController(config.name)

    return (
        <div className={`flex items-center gap-2 ${config.wrapperClassName || ""}`}>
            <Checkbox
                id={field.name}
                checked={field.value || false}
                onCheckedChange={(checked) => field.onChange(checked)}
                className={`${field.value ? config.selectedClassName : ""} border-border cursor-pointer`}
            />
            {config.label && (
                <Label htmlFor={field.name} className="cursor-pointer">
                    {config.label}
                </Label>
            )}
            {config.icon}
        </div>
    )
})
export default FormCheckbox