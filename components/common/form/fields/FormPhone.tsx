import { PhoneInput } from "@/components/common/PhoneInput"
import { Label } from "@/components/ui/label"
import { memo } from "react"
import { FormRadioTypes } from "./fields.types"
import { useFieldController } from "../useFieldController"

const FormPhone = memo(({ field: config }: { field: FormRadioTypes }) => {
    const { field, error } = useFieldController(config.name)
    return (
        <div className={`${config.wrapperClassName} space-y-2`}>
            <Label htmlFor="user.phoneNumber" className={error ? "text-red-500" : ""}>Phone Number*</Label>
            <PhoneInput
                {...field}
                placeholder="Phone number"
                defaultCountry="CA"
            />
        </div>
    )
})
export default FormPhone