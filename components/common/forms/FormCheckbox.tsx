"use client"

import { Controller, useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Props {
    name: string
    label?: string
    description?: string
    selectedClassName?: string
    icon?: React.ReactNode
    defaultValue?: boolean
}

export function FormCheckbox({
    name,
    label,
    description,
    selectedClassName,
    icon,
    defaultValue
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
                            checked={isChecked || defaultValue}
                            onCheckedChange={(checked) => field.onChange(checked)}
                            className={`${isChecked ? selectedClassName : ""} border-border cursor-pointer`}
                        />
                        {label && (
                            <Label htmlFor={name} className="cursor-pointer">
                                {label}
                            </Label>
                        )}
                        {icon}
                    </div>
                )
            }}
        />
    )
}