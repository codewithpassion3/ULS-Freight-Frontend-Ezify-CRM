export type FieldTypes = {

}
export type FormFieldTypes = {
    name: string
    label?: string
    type?: string
    placeholder?: string
    className?: string
    labelClassName?: string
    disabled?: boolean
    inputClassName?: string
    wrapperClassName?: string;
    show?: boolean;
    min?: number;
    max?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export type FormSelectTypes = {
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
export type FormCheckboxTypes = {
    name: string
    label?: string
    description?: string
    selectedClassName?: string
    icon?: React.ReactNode
    defaultValue?: boolean
    wrapperClassName?: string
    iconPosition?: "left" | "right"
}
// Radio
type RadioOption = {
    label: string
    value: string | number
}

export type FormRadioTypes = {
    name: string
    label?: string
    options: RadioOption[],
    className?: string
    selectedClassName?: string
    onChange?: (value: string) => void
    valueType?: "string" | "number"
    defaultValue?: string
    wrapperClassName?: string;
    disabled?: boolean;
}

export type FormDateTypes = {
    name: string
    label?: string
    mode?: "single" | "multiple" | "range"
    // className?: string
    // selectedClassName?: string
    onChange?: (value: Date | undefined) => void
    // valueType?: "string" | "number"
    // defaultValue?: string
    onSelect?: (value: Date | undefined) => void
    wrapperClassName?: string;
    futureDatesOnly?: boolean;
}

export type FormTimeProps = {
    label: string
    hourName: string
    minuteName: string
    ampmName: string
}

export type FormFieldUnion = FormFieldTypes | FormSelectTypes | FormCheckboxTypes | FormRadioTypes | FormDateTypes | FormTimeProps
