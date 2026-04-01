import { Controller, useFormContext } from "react-hook-form"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "@/components/ui/select"

import { FormFieldWrapper } from "./FormFieldWrapper"
import { Label } from "@/components/ui/label";
type SelectOptions = {
    name: string;
    options: { label: string; value: string | number }[];
    optionKey?: string;
    optionValue?: string;
    placeholder?: string;
    defaultValue?: string;
    className?: string;
    label?: string;
    labelClassName?: string;
    disabled?: boolean;
    valueType?: "string" | "number";
}
export function FormSelect({
    name,
    options,
    optionKey,
    optionValue,
    placeholder,
    defaultValue,
    className,
    label,
    labelClassName,
    disabled,
    valueType
}: SelectOptions) {

    const { control } = useFormContext()

    return (
        <div className="flex flex-col gap-2">
            <Label className={labelClassName} htmlFor={name}>{label ? label : name}</Label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => valueType === "number" ? field.onChange(Number(value)) : field.onChange(value)}
                        disabled={disabled}
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
        </div>

    )
}