import { memo } from "react"
import FormField from "./fields/FormField"
import FormSelect from "./fields/FormSelect"
import FormCheckbox from "./fields/FormCheckbox"
import FormRadio from "./fields/FormRadio"
import FormPhone from "./fields/FormPhone"
import FormDate from "./fields/FormDate"
import FormTime from "./fields/FormTime"

export const FieldRenderer = memo(({ field, type }: any) => {
  if (field.show === false) return null
  switch (field.type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "textarea":
      return <FormField field={field} />
    case "select":
      return <FormSelect field={field} />
    case "checkbox":
      return <FormCheckbox field={field} />
    case "radio":
      return <FormRadio field={field} />
    case "phone":
      return <FormPhone field={field} />
    case "date":
      return <FormDate field={field} />
    case "time":
      return <FormTime field={field} />
    default:
      return null
  }
})

export function GlobalForm({ fields, formWrapperClassName, extra }: { fields: any[], formWrapperClassName?: string, extra?: React.ReactNode }) {
  return (
    <div className={formWrapperClassName || ""}>
      {fields.map((field) => (
        <FieldRenderer key={field.name} field={field} />
      ))}
      {extra}
    </div>
  )
}