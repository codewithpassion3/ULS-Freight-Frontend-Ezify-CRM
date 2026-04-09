import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { memo } from "react";
import { useFieldController } from "../useFieldController";
import { FormSelectTypes } from "./fields.types";

const FormSelect = memo(({ field: config }: { field: FormSelectTypes }) => {
    if (!config) return null  // safely skip undefined
    const { field, error } = useFieldController(config.name);

    return (
        <div>
            <Label className={`${config.labelClassName} ${error ? "text-red-500" : ""}`} htmlFor={config.name}>{config.label ? config.label : config.name}</Label>
            <Select
                value={field.value?.toString()}
                onValueChange={(value) => config.valueType === "number" ? field.onChange(Number(value)) : field.onChange(value)}
                disabled={config.disabled}

            >
                <SelectTrigger className={`mt-2 w-full cursor-pointer ${error ? "border border-red-500" : ""} ${config.className}`}>
                    <SelectValue placeholder={config.placeholder} />
                </SelectTrigger>

                <SelectContent>

                    {config.options.map((opt: any) => (
                        <SelectItem
                            key={config.optionKey ? opt[config.optionKey] : opt.value}
                            value={config.optionKey ? opt[config.optionKey].toString() : opt.value.toString()}
                            className="cursor-pointer"
                        >
                            {config.optionValue ? opt[config.optionValue] : opt.label}
                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>
            {error && <p className="text-xs text-red-500 font-medium mt-2">{error.message}</p>}
        </div>
    )
})
export default FormSelect