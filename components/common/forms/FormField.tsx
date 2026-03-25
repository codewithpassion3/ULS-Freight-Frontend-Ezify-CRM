"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

type FormFieldProps = {
    name: string
    label: string
    type?: string
    placeholder?: string
    register: any
    error?: { message?: string }
}

export default function FormField({
    name,
    label,
    type,
    placeholder,
    register,
    error,
}: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === "password"

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={name} className={error ? "text-red-500" : ""}>
                {label}
            </Label>

            <div className="relative">
                <Input
                    id={name}
                    type={isPassword ? (showPassword ? "text" : "password") : type || "text"}
                    placeholder={placeholder}
                    {...register(name)}
                    className={`${error ? "border-red-500" : ""} ${isPassword ? "pr-10" : ""}`}
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
            </div>

            {error && (
                <p className="text-xs text-red-500">{error.message}</p>
            )}
        </div>
    )
}