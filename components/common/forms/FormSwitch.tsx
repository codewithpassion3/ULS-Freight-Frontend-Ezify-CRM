"use client"

import { Controller, useFormContext } from "react-hook-form"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { FormFieldWrapper } from "./FormFieldWrapper"

interface Props {
    name: string
    label?: string
}

export function FormSwitch({ name, label }: Props) {
    const { control } = useFormContext()

    return (
        <FormFieldWrapper name={name} label={label}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="flex items-center gap-3">
                        <Switch
                            checked={!!field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                        />
                        {label && (
                            <Label className="cursor-pointer leading-none">
                                {label}
                            </Label>
                        )}
                    </div>
                )}
            />
        </FormFieldWrapper>
    )
}