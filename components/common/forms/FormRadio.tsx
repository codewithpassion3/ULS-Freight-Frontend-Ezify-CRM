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
    options: Option[],
    className?: string
    selectedClassName?: string
    onChange?: (value: string) => void
}

export function FormRadio({ name, label, options, selectedClassName, className, onChange }: Props) {
    const { control, formState: { defaultValues } } = useFormContext()
    return (
        <FormFieldWrapper name={name} label={label}>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValues?.[name]}
                render={({ field }) => (
                    <RadioGroup
                        onValueChange={(value) => {
                            field.onChange(value)

                        }}
                        onChange={() => onChange}
                        className="flex gap-6"
                    >
                        {options.map((opt) => {
                            const isSelected = field.value?.toString() === opt.value.toString()
                            return (
                                <div key={opt.value} className="flex items-center gap-2 ">
                                    <RadioGroupItem
                                        value={opt.value.toString()}
                                        id={`${name}-${opt.value}`}
                                        className={`${isSelected ? selectedClassName : ""} cursor-pointer`}
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