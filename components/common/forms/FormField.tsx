"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useFormContext, FieldError, get } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"

type FormFieldProps = {
    name: string
    label: string
    type?: string
    placeholder?: string
    className?: string
    labelClassName?: string
    disabled?: boolean
    inputClassName?: string
}

export default function FormField({
    name,
    label,
    type,
    placeholder,
    className,
    labelClassName,
    disabled,
    inputClassName,
}: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false)
    const formContext = useFormContext()
    const register = formContext?.register
    const error = get(formContext?.formState?.errors, name) as FieldError | undefined
    const isPassword = type === "password"
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <Label htmlFor={name} className={`${error ? "text-red-500" : ""} ${labelClassName}`}>
                {label}
            </Label>

            {type !== "textarea" ? <div className="relative">
                <Input
                    id={name}
                    type={isPassword ? (showPassword ? "text" : "password") : type || "text"}
                    placeholder={placeholder}
                    {...(register ? register(name, { valueAsNumber: type === "number" }) : {})}
                    className={`${inputClassName} ${error ? "border-red-500" : ""} ${isPassword ? "pr-10" : ""}`}
                    disabled={disabled}
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
                    id={name}
                    placeholder={placeholder}
                    {...register(name)}
                    className={`${className} ${error ? "border-red-500" : ""}`}
                />}

            {error && <p className="text-xs text-red-500">{error.message}</p>}
        </div>
    )
}