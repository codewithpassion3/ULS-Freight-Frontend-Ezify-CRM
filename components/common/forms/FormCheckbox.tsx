"use client"

import { Controller, useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FormFieldWrapper } from "./FormFieldWrapper"

interface Props {
    name: string
    label?: string
    description?: string
    selectedClassName?: string
    extra?: React.ReactNode
}

export function FormCheckbox({
    name,
    label,
    description,
    selectedClassName,
    extra
}: Props) {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const isChecked = !!field.value

                return (
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id={name}
                            checked={isChecked}
                            onCheckedChange={(checked) => field.onChange(checked)}
                            className={`${isChecked ? selectedClassName : ""} border-border cursor-pointer`}
                        />
                        {label && (
                            <Label htmlFor={name} className="cursor-pointer">
                                {label}
                            </Label>
                        )}
                        {extra}
                    </div>
                )
            }}
        />
    )
}