import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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
    error
}: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={name} className={error ? "text-red-500" : ""}>
                {label}
            </Label>
            <Input
                id={name}
                type={type ? type : "text"}
                placeholder={placeholder}
                {...register(name)}
                className={error ? "border-red-500" : ""}
            />

            {error && (
                <p className="text-xs text-red-500">{error.message}</p>
            )}
        </div>
    )
}