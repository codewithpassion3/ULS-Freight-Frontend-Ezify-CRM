import { PhoneInput } from "@/components/common/PhoneInput"
import { Label } from "@/components/ui/label"
import { memo } from "react"
import { FormRadioTypes } from "./fields.types"
import { useFieldController } from "../useFieldController"

const FormPhone = memo(({ field: config }: { field: FormRadioTypes }) => {
    const { field, error } = useFieldController(config.name)
    return (
        <div className={`${config.wrapperClassName} space-y-2`}>
            <Label htmlFor={config.name} className={error ? "text-red-500" : ""}>{config.label}</Label>
            <PhoneInput
                className={error ? "border-red-500 placeholder:text-red-500 bg-red-50 rounded-xl" : ""}
                {...field}
                placeholder="Phone number"
                defaultCountry="CA"
                disabled={config.disabled}
                // @ts-ignore
                // flagClassName={error ? "border-red-500 placeholder:text-red-500 bg-red-50" : ""}
                inputClassName={error ? "border-red-500 placeholder:text-red-500 bg-red-50" : ""}


            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    )
})
export default FormPhone