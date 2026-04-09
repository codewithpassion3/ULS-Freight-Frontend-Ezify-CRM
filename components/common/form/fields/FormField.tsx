"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { memo, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { useFieldController } from "../useFieldController"
import { FormFieldTypes } from "./fields.types"

const FormField = memo(({ field: config }: { field: FormFieldTypes }) => {
    if (!config) return null  // safely skip undefined

    const { field, error } = useFieldController(config.name)
    const isPassword = config.type === "password"
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className={config.wrapperClassName}>
            <div className={`flex flex-col gap-2 ${config.className}`}>
                <Label htmlFor={config.name} className={`${error ? "text-red-500" : ""} ${config.labelClassName}`}>
                    {config.label}
                </Label>

                {config.type !== "textarea" ? <div className="relative">
                    <Input
                        id={config.name}
                        type={isPassword ? (showPassword ? "text" : "password") : config.type || "text"}
                        placeholder={config.placeholder}
                        {...field}
                        className={`${config.inputClassName} ${error ? "border-red-500" : ""} ${isPassword ? "pr-10" : ""}`}
                        disabled={config.disabled}
                        onChange={(e) => {
                            const value = config.type === "number"
                                ? (e.target.value === "" ? "" : Number(e.target.value))
                                : e.target.value

                            field.onChange(value)
                        }}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div> :
                    <Textarea
                        id={config.name}
                        placeholder={config.placeholder}
                        {...field}
                        className={`${config.className} ${error ? "border-red-500" : ""}`}
                    />}

                {error && <p className="text-xs text-red-500">{error.message}</p>}
            </div>
        </div>
    )
})
export default FormField
