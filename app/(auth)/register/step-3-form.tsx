"use client"

import * as React from "react"
import { Eye } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Controller, useFormContext } from "react-hook-form"
import { RegisterSchemaTypes } from "@/lib/validations/register-schema"
import FormField from "@/components/common/FormField"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
interface Step3FormProps {
  onBack: () => void
}

export function Step3Form({ onBack }: Step3FormProps) {
  const router = useRouter()
  const form = useFormContext<RegisterSchemaTypes>()
  const {
    register,
    control,
    watch,
    formState: { errors, isValid }
  } = form

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <FormField
            name="user.username"
            label="Create a Username*"
            placeholder="Enter your username"
            register={register}
            error={errors.user?.username}
          />
        </div>
        <div className="space-y-2 relative">
          <FormField
            name="user.password"
            label="Create Password*"
            type="password"
            placeholder="Enter your password"
            register={register}
            error={errors.user?.password}
          />
          <p className="text-xs text-muted-foreground mt-1">Must be at least 8 characters</p>
        </div>

        <div className="space-y-2 relative">
          <div className="relative">
            <FormField
              name="user.confirmPassword"
              label="Confirm Password*"
              type="password"
              placeholder="Confirm your password"
              register={register}
              error={errors.user?.confirmPassword}
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col space-y-4">
          <div>
            <Controller
              name="user.termsAndConditionAccepted"
              control={control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    value={field.value ? "checked" : "unchecked"}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />

                  <FieldContent>
                    <FieldLabel>
                      Accept terms and conditions
                    </FieldLabel>

                    <FieldDescription>
                      By clicking this checkbox, you agree to the terms.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              )}
            />
            <FieldError>
              {errors.user?.termsAndConditionAccepted?.message}
            </FieldError>
          </div>
          <div>
            <Controller
              name="user.companyPolicyAccepted"
              control={control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    value={field.value ? "checked" : "unchecked"}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />

                  <FieldContent>
                    <FieldLabel>
                      Accept the company policies
                    </FieldLabel>

                    <FieldDescription>
                      By clicking this checkbox, you agree to the company policies.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              )}
            />

            <FieldError>
              {errors.user?.termsAndConditionAccepted?.message}
            </FieldError>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row justify-between items-center pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-max text-[#0070c0] border border-[#0070c0] hover:bg-[#0070c0]/10 bg-transparent px-8"
        >
          Previous Step
        </Button>
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full sm:w-max bg-[#0070c0] hover:bg-[#005999] text-white px-8"
        >
          Finish Registration
        </Button>

      </div>
    </div>
  )
}
