import { Controller, useFormContext } from "react-hook-form"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "@/components/ui/select"

import { FormFieldWrapper } from "./FormFieldWrapper"

export function FormSelect({
    name,
    label,
    options,
    optionKey,
    optionValue,
    placeholder,
    defaultValue
}: any) {

    const { control } = useFormContext()

    return (
        <FormFieldWrapper name={name} label={label}>

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (

                    <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(value)}
                    >

                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>

                        <SelectContent>

                            {options.map((opt: any) => (
                                <SelectItem
                                    key={opt[optionKey]}
                                    value={opt[optionKey].toString()}
                                >
                                    {opt[optionValue]}
                                </SelectItem>
                            ))}

                        </SelectContent>

                    </Select>

                )}
            />

        </FormFieldWrapper>
    )
}