import { memo } from "react"
import FormField from "./fields/FormField"
import FormSelect from "./fields/FormSelect"
import FormCheckbox from "./fields/FormCheckbox"
import FormRadio from "./fields/FormRadio"
import FormPhone from "./fields/FormPhone"
import FormDate from "./fields/FormDate"

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
    // case "textarea":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="textarea" />
    // case "datetime":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="datetime" />
    // case "time":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="time" />
    // case "file":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="file" />
    // case "image":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="image" />
    // case "video":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="video" />
    // case "audio":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="audio" />
    // case "file":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="file" />
    // case "image":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="image" />
    // case "video":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="video" />
    // case "audio":
    //   return <FormField name={field.name} label={field.label} placeholder={field.placeholder} type="audio" />
    default:
      return null
  }
})

export function GlobalForm({ fields, formWrapperClassName }: { fields: any[], formWrapperClassName?: string }) {
  return (
    <div className={formWrapperClassName || ""}>
      {fields.map((field) => (
        <FieldRenderer key={field.name} field={field} />
      ))}
    </div>
  )
}