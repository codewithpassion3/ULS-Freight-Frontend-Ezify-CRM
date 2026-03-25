import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormFieldWrapper } from "./FormFieldWrapper"

export function FormInput({
    name,
    label,
    placeholder,
    type = "text"
}: any) {

    const { register } = useFormContext()

    return (
        <FormFieldWrapper name={name} label={label}>
            <Input
                {...register(name)}
                type={type}
                placeholder={placeholder}
            />
        </FormFieldWrapper>
    )
}