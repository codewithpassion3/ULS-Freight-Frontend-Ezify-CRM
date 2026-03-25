"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FormField from "@/components/common/forms/FormField"
import { Controller, useForm, useFormContext } from "react-hook-form"
import { registerSchema, RegisterSchemaTypes } from "@/lib/validations/auth/register-schema"
import { zodResolver } from "@hookform/resolvers/zod"

interface Step2FormProps {
  onNext: () => void
  onBack: () => void
}

export function Step2Form({ onNext, onBack }: Step2FormProps) {
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   onNext()
  // }
  const form = useFormContext<RegisterSchemaTypes>()
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors }
  } = form
  const handleNext = async () => {
    const valid = await trigger([
      "address.address1",
      "address.unit",
      "address.address2",
      "address.postalCode",
      "address.city",
      "address.state",
      "address.country",
    ])

    if (valid) onNext()
    console.log(form.getValues())
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">

          <FormField
            register={form.register}
            name="address.address1"
            label="Registered Business Address*"
            placeholder="Enter your business address"
            error={errors.address?.address1}
          />
        </div>
        <div className="space-y-2">

          <FormField
            register={form.register}
            name="address.unit"
            label="Unit/Floor # *"
            placeholder="Enter your unit/floor #"
            error={errors.address?.unit}
          />
        </div>
      </div>

      <div className="space-y-2">
        <FormField
          register={form.register}
          name="address.address2"
          label="Address 2 (optional)"
          placeholder="Enter your address 2"
          error={errors.address?.address2}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">

          <FormField
            register={form.register}
            name="address.postalCode"
            label="Postal/ZIP Code*"
            placeholder="Enter your postal/ZIP code"
            error={errors.address?.postalCode}
          />
        </div>
        <div className="space-y-2">

          <FormField
            register={form.register}
            name="address.city"
            label="City*"
            placeholder="Enter your city"
            error={errors.address?.city}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Controller
            control={control}
            name="address.state"
            render={({ field }) => (
              <div className="space-y-2">
                <Label>Province/State*</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ontario" className="cursor-pointer">Ontario</SelectItem>
                    <SelectItem value="british-columbia" className="cursor-pointer">British Columbia</SelectItem>
                    <SelectItem value="new-york" className="cursor-pointer">New York</SelectItem>
                    <SelectItem value="california" className="cursor-pointer">California</SelectItem>
                  </SelectContent>
                </Select>
                {errors.address?.state && (
                  <p className="text-xs text-red-500">
                    {errors.address.state.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="space-y-2">
          <Controller
            control={control}
            name="address.country"
            render={({ field }) => (
              <div className="space-y-2">
                <Label>Country*</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="canada" className="cursor-pointer">Canada</SelectItem>
                    <SelectItem value="united-states" className="cursor-pointer">United States</SelectItem>
                  </SelectContent>
                </Select>
                {errors.address?.country && (
                  <p className="text-xs text-red-500">
                    {errors.address.country.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="text-[#0070c0] border border-[#0070c0] hover:bg-[#0070c0]/10 bg-transparent px-8"
        >
          Previous Step
        </Button>
        <Button
          onClick={handleNext}
          // type="submit"
          className="bg-[#0070c0] hover:bg-[#005999] text-white px-8"
        >
          Next Step
        </Button>
      </div>
    </div>
  )
}
