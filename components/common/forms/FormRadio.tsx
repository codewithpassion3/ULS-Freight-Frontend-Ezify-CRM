"use client"

import { Controller, useFormContext } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FormFieldWrapper } from "./FormFieldWrapper"

interface Option {
    label: string
    value: string | number
}

interface Props {
    name: string
    label?: string
    options: Option[]
    selectedClassName?: string
}

export function FormRadio({ name, label, options, selectedClassName }: Props) {
    const { control } = useFormContext()
    console.log(selectedClassName, "selectedClassName")
    return (
        <FormFieldWrapper name={name} label={label}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(value)}
                        className="flex gap-6"
                    >
                        {options.map((opt) => {
                            const isSelected = field.value?.toString() === opt.value.toString()
                            return (
                                <div key={opt.value} className="flex items-center gap-2">
                                    <RadioGroupItem
                                        value={opt.value.toString()}
                                        id={`${name}-${opt.value}`}
                                        className={isSelected ? selectedClassName : ""}
                                    />
                                    <Label htmlFor={`${name}-${opt.value}`} className="cursor-pointer">
                                        {opt.label}
                                    </Label>
                                </div>
                            )
                        })}
                    </RadioGroup>
                )}
            />
        </FormFieldWrapper>
    )
}