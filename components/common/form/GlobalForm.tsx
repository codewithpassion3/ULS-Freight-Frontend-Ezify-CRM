"use client"
import { useForm, Controller, FieldValues, Path, DefaultValues, UseFormReturn, useFormContext, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodType } from "zod"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { PhoneInput } from "@/components/common/PhoneInput"
import { useEffect } from "react"
import { Loader } from "@/components/common/Loader"
import { FormSelect } from "../forms/FormSelect"
import { DatePicker } from "../date-picker/DatePicker"

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

export interface SelectOptions {
  optionKey: string
  optionValue: string
}
export interface FormField<T extends FieldValues> {
  name: Path<T>
  label?: string
  type: FieldType
  placeholder?: string
  disabled?: boolean
  options?: { label: string; value: string | number }[] // for select/radio
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any
  required?: boolean
  className?: string
  wrapperClassName?: string
  labelAction?: React.ReactNode // Extra component to render next to the label (e.g. "Address book" button)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra?: any // extra props like min/max for numbers
  show?: boolean // Condition to show/hide the field
  selectOptions?: SelectOptions
}

export interface GlobalFormProps<T extends FieldValues> {
  fields: FormField<T>[]
  defaultValues?: DefaultValues<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: ZodType<any, any, any>
  // onSubmit?: (data: T) => void
  onSubmit?: SubmitHandler<FieldValues>;
  isLoading?: boolean
  setIsValid?: (valid: boolean) => void
  className?: string
  formWrapperClassName?: string
  // form?: UseFormReturn<T>
}

export function GlobalForm<T extends FieldValues>({
  fields,
  defaultValues,
  schema,
  onSubmit,
  isLoading,
  setIsValid,
  className = "space-y-4",
  formWrapperClassName,
  // form,
}: GlobalFormProps<T>) {

  const internalForm = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
    mode: "onChange",
  })

  // Use the provided form if available, otherwise use internal
  // const methods = form || internalForm
  const form = useFormContext()
  const { register, handleSubmit, control, reset, formState: { errors, isValid } } = form

  useEffect(() => {
    if (defaultValues && !form) {
      reset(defaultValues)
    }
  }, [defaultValues, reset, form])

  useEffect(() => {
    setIsValid?.(isValid)
  }, [isValid, setIsValid])

  if (isLoading) return <Loader />

  const renderFields = () => {
    return fields.map((field) => {
      if (field.show === false) return null

      // Find nested error message using path
      const errorKeys = (field.name as string).split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errorMsgObj: any = errors
      for (const key of errorKeys) {
        if (errorMsgObj) {
          errorMsgObj = errorMsgObj[key]
        }
      }
      const errorMessage = errorMsgObj?.message as string | undefined
      const hasError = !!errorMessage

      const renderLabel = () => {
        if (!field.label && !field.labelAction) return null
        return (
          <div className="flex justify-between items-center mb-2">
            {field.label && <Label className={hasError ? "text-red-500" : ""}>{field.label}</Label>}
            {field.labelAction && <div>{field.labelAction}</div>}
          </div>
        )
      }

      switch (field.type) {
        case "text":
        case "number":
        case "email":
        case "password":
          return (
            <div key={field.name} className={`space-y-1 ${field.wrapperClassName || ""}`}>
              {renderLabel()}
              <Input
                disabled={field.disabled}
                type={field.type}
                placeholder={field.placeholder}
                className={`${hasError ? "border-red-500 focus-visible:ring-red-500" : ""} ${field.className || ""}`}
                {...register(field.name)}
                {...field.extra}
              />
              {hasError && <p className="text-xs text-red-500 font-medium">{errorMessage}</p>}
            </div>
          )
        case "date":
          <div key={field.name} className={`space-y-1 ${field.wrapperClassName || ""}`}>
            {renderLabel()}
            <Input
              type={field.type}
              placeholder={field.placeholder}
              className={`${hasError ? "border-red-500 focus-visible:ring-red-500" : ""} ${field.className || ""}`}
              {...register(field.name)}
              {...field.extra}
            />
            {/* <DatePicker
              name={field.name}
            /> */}

            {hasError && <p className="text-xs text-red-500 font-medium">{errorMessage}</p>}
          </div>

        case "textarea":
          return (
            <div key={field.name} className={`space-y-1 ${field.wrapperClassName || ""}`}>
              {renderLabel()}
              <Textarea
                placeholder={field.placeholder}
                className={`${hasError ? "border-red-500 focus-visible:ring-red-500" : ""} ${field.className || ""}`}
                {...register(field.name)}
                {...field.extra}
              />
              {hasError && <p className="text-xs text-red-500 font-medium">{errorMessage}</p>}
            </div>
          )

        case "select":
          return (
            <div key={field.name} className={`space-y-1 ${field.wrapperClassName || ""}`}>
              {renderLabel()}
              <FormSelect
                name={field.name}
                control={control}
                defaultValue={field.defaultValue}
                options={field.options}
                placeholder={field.placeholder}
                className={field.className}
                hasError={hasError}
                optionKey={field.selectOptions?.optionKey}
                optionValue={field.selectOptions?.optionValue}
              />
              {hasError && <p className="text-xs text-red-500 font-medium">{errorMessage}</p>}
            </div>
          )

        case "radio":
          return (
            <div key={field.name} className={`space-y-1 ${field.wrapperClassName || ""}`}>
              {renderLabel()}
              <Controller
                name={field.name}
                control={control}
                defaultValue={field.defaultValue}
                render={({ field: controllerField }) => (
                  <RadioGroup className={field.className} onValueChange={controllerField.onChange} value={controllerField.value?.toString() || ""}>
                    <div className="flex flex-wrap gap-6">
                      {field.options?.map((opt) => (
                        <div key={opt.value} className="flex items-center gap-2">
                          <RadioGroupItem value={opt.value.toString()} id={`${field.name}-${opt.value}`} className={controllerField.value?.toString() === opt.value.toString() ? "border-amber-500 text-amber-500" : ""} />
                          <Label htmlFor={`${field.name}-${opt.value}`} className="cursor-pointer font-normal text-sm">{opt.label}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              />
              {hasError && <p className="text-xs text-red-500 font-medium">{errorMessage}</p>}
            </div>
          )

        case "switch":
          return (
            <div key={field.name} className={`flex items-center gap-3 pt-2 ${field.wrapperClassName || ""}`}>
              {field.labelAction && <div className="mr-2">{field.labelAction}</div>}
              <Controller
                name={field.name}
                control={control}
                defaultValue={field.defaultValue ?? false}
                render={({ field: controllerField }) => (
                  <Switch
                    checked={!!controllerField.value}
                    onCheckedChange={(checked) => controllerField.onChange(checked)}
                  />
                )}
              />
              {field.label && <Label className={hasError ? "text-red-500 leading-none cursor-pointer" : "leading-none cursor-pointer"}>{field.label}</Label>}
              {hasError && <p className="text-xs text-red-500 font-medium mt-1">{errorMessage}</p>}
            </div>
          )

        case "checkbox":
          return (
            <div key={field.name} className={`flex flex-col gap-1 ${field.wrapperClassName || ""}`}>
              <div className="flex items-center gap-2 pt-2">
                <Controller
                  name={field.name}
                  control={control}
                  defaultValue={field.defaultValue ?? false}
                  render={({ field: controllerField }) => (
                    <Checkbox
                      id={`${field.name}`}
                      checked={!!controllerField.value}
                      onCheckedChange={(checked) => controllerField.onChange(checked)}
                    />
                  )}
                />
                {field.label && <Label htmlFor={`${field.name}`} className={hasError ? "text-red-500 leading-none cursor-pointer font-normal text-sm" : "leading-none cursor-pointer font-normal text-sm"}>{field.label}</Label>}
                {field.labelAction && <div className="ml-1">{field.labelAction}</div>}
              </div>
              {hasError && <p className="text-xs text-red-500 font-medium pl-6">{errorMessage}</p>}
            </div>
          )

        case "phone":
          return (
            <div key={field.name} className={`space-y-1 ${field.wrapperClassName || ""}`}>
              {renderLabel()}
              <Controller
                name={field.name}
                control={control}
                defaultValue={field.defaultValue}
                render={({ field: controllerField }) => (
                  <div className={hasError ? "text-red-500 [&_input]:border-red-500 [&_input]:focus-visible:ring-red-500" : ""}>
                    <PhoneInput {...controllerField} placeholder={field.placeholder} {...field.extra} />
                  </div>
                )}
              />
              {hasError && <p className="text-xs text-red-500 font-medium">{errorMessage}</p>}
            </div>
          )

        default:
          return null
      }
    })
  }

  // Render without wrapping in <form> if no onSubmit handler provided, allowing integration into larger forms
  const FieldWrapper = ({ children, formWrapperClassName }: { children: React.ReactNode, formWrapperClassName?: string }) => {
    return <div className={formWrapperClassName}>{children}</div>
  }
  if (!onSubmit) {
    return (
      <FieldWrapper formWrapperClassName={formWrapperClassName}>
        {renderFields()}
      </FieldWrapper>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <FieldWrapper formWrapperClassName={formWrapperClassName}>
        {renderFields()}
      </FieldWrapper>
      <button id="global-form-submit" type="submit" className="hidden" />
    </form>
  )
}