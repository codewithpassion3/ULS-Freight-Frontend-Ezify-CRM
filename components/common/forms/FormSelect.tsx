import { Controller, FieldError, get, useFormContext } from "react-hook-form"
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
    wrapperClassName?: string;
    show?: boolean;
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
    valueType,
    wrapperClassName,
    show
}: SelectOptions) {

    const {control, formState:{errors}} = useFormContext()
    const error = get(errors, name) as FieldError | undefined
    return (
        <div className={`${show ? "flex" : "hidden"} flex-col gap-2 ${wrapperClassName} `}>
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
            {error && <p className="text-xs text-red-500 font-medium">{error.message}</p>}
        </div>

    )
}