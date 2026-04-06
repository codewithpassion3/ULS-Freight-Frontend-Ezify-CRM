import { FieldValues, Path } from "react-hook-form"

export type FieldType =
    | "text"
    | "number"
    | "email"
    | "password"
    | "date"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "switch"
    | "phone"

export interface BaseField<T extends FieldValues> {
    name: Path<T>
    label?: string
    placeholder?: string
    description?: string
    className?: string
    wrapperClassName?: string
    disabled?: boolean
    colSpan?: number
    show?: boolean | ((values: T) => boolean)
}

export interface SelectOption {
    label: string
    value: string | number
}

export interface FormField<T extends FieldValues> extends BaseField<T> {
    type: FieldType
    options?: SelectOption[]
}