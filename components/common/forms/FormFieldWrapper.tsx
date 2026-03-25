import { Label } from "@/components/ui/label"
export function FormFieldWrapper({
    name,
    label,
    description,
    children,
    error
}: any) {

    return (
        <div className="space-y-2">

            {label && (
                <Label className={`${error ? "text-red-500" : ""}`}>
                    {label}
                </Label>
            )}

            {children}

            {description && (
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            )}

            {error && (
                <p className="text-xs text-red-500 font-medium">
                    {error}
                </p>
            )}

        </div>
    )
}