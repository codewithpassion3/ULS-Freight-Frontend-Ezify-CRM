import { Controller, useFormContext } from "react-hook-form"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "@/components/ui/select"

import { FormFieldWrapper } from "./FormFieldWrapper"
type SelectOptions = {
    name: string;
    options: { label: string; value: string | number }[];
    optionKey?: string;
    optionValue?: string;
    placeholder?: string;
    defaultValue?: string;
    className?: string;
}
export function FormSelect({
    name,
    options,
    optionKey,
    optionValue,
    placeholder,
    defaultValue,
    className
}: SelectOptions) {

    const { control } = useFormContext()

    return (
        <FormFieldWrapper name={name}>

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (

                    <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(value)}
                    >
                        <SelectTrigger className={`w-full cursor-pointer ${className}`}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>

                        <SelectContent>

                            {options.map((opt: any) => (
                                <SelectItem
                                    key={optionKey ? opt[optionKey] : opt.value}
                                    value={optionKey ? opt[optionKey].toString() : opt.value.toString()}
                                    className="cursor-pointer"
                                >
                                    {optionValue ? opt[optionValue] : opt.label}
                                </SelectItem>
                            ))}

                        </SelectContent>

                    </Select>

                )}
            />

        </FormFieldWrapper>
    )
}