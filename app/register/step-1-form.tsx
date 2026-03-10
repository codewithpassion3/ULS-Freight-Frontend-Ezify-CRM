"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Package, Truck, ShoppingCart, Info, Check } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerStep1Schema, type RegisterStep1Values } from "@/lib/validations/register-schema"

interface Step1FormProps {
  onNext: () => void
}


export function Step1Form({ onNext }: Step1FormProps) {
  const form = useForm<RegisterStep1Values>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      businessName: "",
      email: "",
      phone: "",
      ext: "",
      industry: "",
      broker: "no",
    }
  })

  const shippingTypes = form.watch("shippingTypes") || []
  const packageShipments = form.watch("packageShipments")
  const palletShipments = form.watch("palletShipments")
  // const ecommercePlatforms = form.watch("ecommercePlatforms")

  const toggleType = React.useCallback((type: RegisterStep1Values["shippingTypes"][number]) => {
    const current = shippingTypes
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type]

    form.setValue("shippingTypes", updated, { shouldValidate: true })
  }, [form])

  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = form
  const onSubmit = (data: RegisterStep1Values) => {
    console.log("Step 1 Form submitted:", data)
    onNext()
  }




  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className={errors.firstName ? "text-red-500" : ""}>First Name*</Label>
          <Input
            {...form.register("firstName")}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className={errors.lastName ? "text-red-500" : ""}>Last Name*</Label>
          <Input
            {...form.register("lastName")}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="businessName" className={errors.businessName ? "text-red-500" : ""}>Business or Corporation Name*</Label>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            {...form.register("businessName")}
            className={errors.businessName ? "border-red-500" : ""}
          />
          {errors.businessName && <p className="text-xs text-red-500">{errors.businessName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry" className={errors.industry ? "text-red-500" : ""}>Industry Type</Label>
          <Input
            {...form.register("industry")}
            placeholder="ex: Furniture"
            className={errors.industry ? "border-red-500" : ""}
          />
          {errors.industry && <p className="text-xs text-red-500">{errors.industry.message}</p>}
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="space-y-2 sm:col-span-5">
          <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>Email*</Label>
          <Input
            {...form.register("email")}
            type="email"
            placeholder="example@email.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2 sm:col-span-4">
          <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>Phone Number*</Label>
          <Input
            {...form.register("phone")}
            type="tel"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2 sm:col-span-3">
          <Label htmlFor="ext" className={errors.ext ? "text-red-500" : ""}>Ext.</Label>
          <Input
            {...form.register("ext")}
            className={errors.ext ? "border-red-500" : ""}
          />
          {errors.ext && <p className="text-xs text-red-500">{errors.ext.message}</p>}
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="signupCode" className={errors.signUpCode ? "text-red-500" : ""}>Sign up Code</Label>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            {...form.register("signUpCode")}
            className={errors.signUpCode ? "border-red-500" : ""}
          />
          {errors.signUpCode && <p className="text-xs text-red-500">{errors.signUpCode.message}</p>}
        </div>
        <div className="space-y-2">
          <Label className={errors.broker ? "text-red-500" : ""}>Are you a Freight Broker?</Label>
          <Controller
            control={form.control}
            name="broker"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="broker-no" />
                  <Label htmlFor="broker-no" className="font-normal cursor-pointer">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="broker-yes" />
                  <Label htmlFor="broker-yes" className="font-normal cursor-pointer">Yes</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.broker && <p className="text-xs text-red-500">{errors.broker.message}</p>}
        </div>
      </div>

      {/* Shipping Types Custom Cards */}
      <div className="space-y-3 pt-4">
        <Label className={errors.shippingTypes ? "text-red-500" : ""}>Select all the <span className="text-primary underline cursor-pointer">shipping types</span> that apply*</Label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Custom Type Card 1 */}
          {[
            { label: "Pallet", icon: <Truck size={16} /> },
            { label: "Package", icon: <Package size={16} /> },
            // { label: "eCommerce", icon: <ShoppingCart size={16} /> },
            { label: "PTL/FTL", icon: <Truck size={16} /> },
          ].map((type: any) => (
            <div
              className={`flex items-center justify-center gap-2 p-3 border rounded-md cursor-pointer transition-all ${shippingTypes.includes(type.label) ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20' : 'border-border'} ${errors.shippingTypes && !shippingTypes.includes(type.label) ? 'border-red-500/50' : ''}`}
              onClick={() => toggleType(type.label)}
            >
              {shippingTypes.includes(type.label) && <div className="w-4 h-4 rounded-sm bg-green-500 text-white flex items-center justify-center p-0.5"><Check /></div>}
              {!shippingTypes.includes(type.label) && <div className="w-4 h-4 rounded-sm border border-muted-foreground"></div>}
              <span className="text-sm font-medium">{type.label}</span>
              {type.i}
            </div>))}


        </div>
        {errors.shippingTypes && <p className="text-xs text-red-500">{errors.shippingTypes.message}</p>}

        {/* Conditional sub-question for Package */}
        {shippingTypes.includes("Package") && (
          <div className="mt-3 p-4 border border-primary rounded-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              type="button"
              onClick={() => toggleType("Package")}
            >
              <span className="text-xs">✕</span>
            </Button>

            <Label className="block mb-3 font-medium text-sm">
              How many <span className="font-bold">package shipments</span> do you do monthly?
            </Label>

            <RadioGroup
              value={packageShipments}
              onValueChange={(value) =>
                form.setValue("packageShipments", value as RegisterStep1Values["packageShipments"])
              }
              className="flex flex-wrap gap-4 mt-2"
            >
              {["< 25", "26-50", "50-100", "101-300", "> 300"].map((val) => (
                <div key={val} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={val}
                    id={`ship-${val.replace(/\s+/g, "")}`}
                  />
                  <Label
                    htmlFor={`ship-${val.replace(/\s+/g, "")}`}
                    className="text-sm text-muted-foreground"
                  >
                    {val}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {shippingTypes.includes("Pallet") && (
          <div className="mt-3 p-4 border border-primary rounded-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              type="button"
              onClick={() => toggleType("Pallet")}
            >
              <span className="text-xs">✕</span>
            </Button>

            <Label className="block mb-3 font-medium text-sm">
              How many <span className="font-bold">pallet shipments</span> do you do monthly?
            </Label>

            <RadioGroup
              value={palletShipments}
              onValueChange={(value) =>
                form.setValue("palletShipments", value as any)
              }
              className="flex flex-wrap gap-4 mt-2"
            >
              {["1-5", "6-10", "11-20", "21-50", "> 50"].map((val) => (
                <div key={val} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={val}
                    id={`ship-pallet-${val}`}
                  />
                  <Label
                    htmlFor={`ship-pallet-${val}`}
                    className="text-sm text-muted-foreground"
                  >
                    {val}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* {shippingTypes.includes("eCommerce") && (
          <div className="mt-3 p-4 border border-primary rounded-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              type="button"
              onClick={() => toggleType("eCommerce")}
            >
              <span className="text-xs">✕</span>
            </Button>

            <Label className="block mb-3 font-medium text-sm">
              Select all <span className="font-bold">additional eCommerce marketplaces</span> that you use
            </Label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-2">
              {[
                "Amazon",
                "BigCommerce",
                "Best Buy",
                "eBay",
                "Squarespace",
                "WooCommerce",
                "Lightspeed",
                "Magento 2",
                "Shopify",
                "Etsy",
                "Walmart",
                "Wix",
                "Other"
              ].map((val) => (
                <div key={val} className="flex items-center space-x-2">
                  <Checkbox
                    checked={ecommercePlatforms?.includes(val)}
                    onCheckedChange={(checked) => {
                      const current = form.getValues("ecommercePlatforms") || []

                      if (checked) {
                        form.setValue("ecommercePlatforms", [...current, val])
                      } else {
                        form.setValue(
                          "ecommercePlatforms",
                          current.filter((p) => p !== val)
                        )
                      }
                    }}
                  />
                  <Label className="text-sm text-muted-foreground">{val}</Label>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {shippingTypes.includes("PTL/FTL") && (
          <div className="mt-3 p-4 border border-primary rounded-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              type="button"
              onClick={() => toggleType("PTL/FTL")}
            >
              <span className="text-xs">✕</span>
            </Button>

            <p className="text-sm text-muted-foreground leading-relaxed pr-6 mt-1">
              A Partial Truck Load typically involves
              <span className="font-bold text-foreground"> 6 or more pallets </span>
              without the need to utilize the full truck. Full Truck Load is the
              utilization of
              <span className="font-bold text-foreground"> the full truck</span>.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6">
        <Button
          disabled={form.formState.isSubmitting}
          type="submit" className="bg-[#0070c0] hover:bg-[#005999] text-white px-8 py-2">
          Next Step
        </Button>
      </div>
    </form >
  )
}
