"use client"

import { Controller, useFormContext } from "react-hook-form"
import { PhoneInput } from "@/components/common/PhoneInput"
import { FormFieldWrapper } from "./FormFieldWrapper"

interface Props {
    name: string
    label?: string
    placeholder?: string
}

export function FormPhone({ name, label, placeholder }: Props) {
    const { control } = useFormContext()

    return (
        <FormFieldWrapper name={name} label={label}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <PhoneInput
                        {...field}
                        placeholder={placeholder}
                    />
                )}
            />
        </FormFieldWrapper>
    )
}