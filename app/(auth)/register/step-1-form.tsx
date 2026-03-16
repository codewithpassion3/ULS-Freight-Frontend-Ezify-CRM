"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Package, Truck, ShoppingCart, Info, Check, CloudCog } from "lucide-react"
import { useForm, Controller, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterSchemaTypes } from "@/lib/validations/auth/register-schema"
import FormField from "@/components/common/FormField"
import { PhoneInput } from "@/components/common/PhoneInput"

interface Step1FormProps {
  onNext: () => void
}


export function Step1Form({ onNext }: Step1FormProps) {
  const form = useFormContext<RegisterSchemaTypes>()
  const {
    register,
    control,
    formState: { errors },
    trigger,
    watch,
    getValues,
    setValue,
    handleSubmit
  } = form

  const handleNext = async () => {
    const valid = await trigger([
      "user.firstName",
      "user.lastName",
      "user.email",
      "user.phoneNumber",
      "shippingPreference",
    ])

    if (valid) onNext()
    console.log(form.getValues())
  }
  const shippingPreference = watch("shippingPreference") || []
  const hasType = (type: string) => shippingPreference.some(p => p.shippingType === type);
  // const isShippingTypeLast = (type: string) => shippingPreference[shippingPreference.length - 1].shippingType === type
  const isShippingTypeLast = (type: string) =>
    shippingPreference?.[shippingPreference.length - 1]?.shippingType === type
  // const shippingTypes = form.watch("shippingTypes") || []
  // const packageShipments = form.watch("packageShipments")
  // const palletShipments = form.watch("palletShipments")
  // const ecommercePlatforms = form.watch("ecommercePlatforms")

  const toggleType = (type: "pallet" | "package" | "PTL/FTL") => {
    const current = shippingPreference || []
    const exists = current.find(p => p.shippingType === type)

    if (exists) {
      form.setValue(
        "shippingPreference",
        current.filter(p => p.shippingType !== type),
        { shouldValidate: true }
      )
    } else {
      form.setValue(
        "shippingPreference",
        [...current, { shippingType: type }],
        { shouldValidate: true }
      )
    }
  }
  type PackageVolumeType =
    | "< 25"
    | "26-50"
    | "50-100"
    | "101-300"
    | "> 300"

  const setPackageVolume = (value: PackageVolumeType) => {
    const current = shippingPreference

    const updated = current.map(p =>
      p.shippingType === "package"
        ? { ...p, shippingVolume: value }
        : p
    )

    form.setValue("shippingPreference", updated, { shouldValidate: true })
  }


  type PalletVolumeType =
    "1-5" | "6-10" | "11-20" | "21-50" | "> 50"
  const setPalletVolume = (value: PalletVolumeType) => {
    const current = shippingPreference

    const updated = current.map(p =>
      p.shippingType === "pallet"
        ? { ...p, shippingVolume: value }
        : p
    )

    form.setValue("shippingPreference", updated, { shouldValidate: true })
  }

  const onSubmit = (data: RegisterSchemaTypes) => {
    console.log("Step 1 Form submitted:", data)
    onNext()
  }




  return (
    <div className="space-y-6">
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormField
            name="user.firstName"
            label="First Name*"
            placeholder="Enter your first name"
            register={register}
            error={errors.user?.firstName}
          />
        </div>
        <div className="space-y-2">
          <FormField
            name="user.lastName"
            label="Last Name*"
            placeholder="Enter your last name"
            register={form.register}
            error={errors.user?.lastName}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="businessName" className={errors.company?.name ? "text-red-500" : ""}>Business or Corporation Name*</Label>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            {...form.register("company.name")}
            className={errors.company?.name ? "border-red-500" : ""}
          />
          {errors.company?.name && <p className="text-xs text-red-500">{errors.company?.name.message}</p>}
        </div>
        <div className="space-y-2">
          <FormField
            name="company.industryType"
            label="Industry Type"
            placeholder="ex: Furniture"
            register={form.register}
            error={errors.company?.industryType}
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormField
            name="user.email"
            label="Email*"
            type="email"
            placeholder="example@email.com"
            register={form.register}
            error={errors.user?.email}
          />
          {errors.user?.email && <p className="text-xs text-red-500">{errors.user?.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="user.phoneNumber" className={errors.user?.phoneNumber ? "text-red-500" : ""}>Phone Number*</Label>
          <Controller
            name="user.phoneNumber"

            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                placeholder="Phone number"
                defaultCountry="CA"
              // className="w-full"
              />

            )}
          />
        </div>

      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="signupCode" className={errors.user?.signUpCode ? "text-red-500" : ""}>Sign up Code</Label>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            {...form.register("user.signUpCode")}
            className={errors.user?.signUpCode ? "border-red-500" : ""}
          />
          {errors.user?.signUpCode && <p className="text-xs text-red-500">{errors.user?.signUpCode.message}</p>}
        </div>
        <div className="space-y-2">
          <Label className={errors.user?.freightBroker ? "text-red-500" : ""}>Are you a Freight Broker?</Label>
          <Controller
            control={form.control}
            name="user.freightBroker"
            render={({ field }) => (
              <RadioGroup
                value={field.value === true ? "yes" : "no"}
                onValueChange={(value) => field.onChange(value === "yes")}
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
          {errors.user?.freightBroker && <p className="text-xs text-red-500">{errors.user?.freightBroker.message}</p>}
        </div>
      </div>

      {/* Shipping Types Custom Cards */}
      <div className="space-y-3 pt-4">
        <Label>Select all the <span className="text-primary underline cursor-pointer">shipping types</span> that apply*</Label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-max">
          {/* Custom Type Card 1 */}
          {[
            { label: "pallet", icon: <Truck size={16} /> },
            { label: "package", icon: <Package size={16} /> },
            // { label: "eCommerce", icon: <ShoppingCart size={16} /> },
            { label: "PTL/FTL", icon: <Truck size={16} /> },
          ].map((type: any) => (
            <div
              key={type.label}
              className={`flex items-center justify-center gap-2 p-3 border rounded-md cursor-pointer transition-all ${hasType(type.label) ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20' : 'border-border'} ${errors.shippingPreference && hasType(type.label) ? 'border-green-500/50' : ''}`}
              onClick={() => toggleType(type.label)}
            >
              {hasType(type.label) && <div className="w-4 h-4 rounded-sm bg-green-500 text-white flex items-center justify-center p-0.5"><Check /></div>}
              {!hasType(type.label) && <div className="w-4 h-4 rounded-sm border border-muted-foreground"></div>}
              <span className="text-sm font-medium capitalize">{type.label}</span>
              {type.icon}
            </div>))}


        </div>
        {errors.shippingPreference && <p className="text-xs text-red-500">{errors.shippingPreference.message}</p>}

        {/* Conditional sub-question for Package */}
        {hasType("package") && isShippingTypeLast("package") && (
          <div className="mt-3 p-4 border border-primary rounded-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              type="button"
              onClick={() => toggleType("package")}
            >
              <span className="text-xs">✕</span>
            </Button>

            <Label className="block mb-3 font-medium text-sm">
              How many <span className="font-bold">package shipments</span> do you do monthly?
            </Label>

            <RadioGroup
              value={shippingPreference.find((sp) => sp.shippingType === "package")?.shippingVolume || ""}
              onValueChange={(value: PackageVolumeType) => setPackageVolume(value)}
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

        {hasType("pallet") && isShippingTypeLast("pallet") && (
          <div className="mt-3 p-4 border border-primary rounded-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              type="button"
              onClick={() => toggleType("pallet")}
            >
              <span className="text-xs">✕</span>
            </Button>

            <Label className="block mb-3 font-medium text-sm">
              How many <span className="font-bold">pallet shipments</span> do you do monthly?
            </Label>

            <RadioGroup
              value={shippingPreference.find((sp) => sp.shippingType === "pallet")?.shippingVolume || ""}
              onValueChange={(value: PalletVolumeType) => setPalletVolume(value)}
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

        {hasType("PTL/FTL") && isShippingTypeLast("PTL/FTL") && (
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
          // type="submit"
          onClick={handleNext}
          className="bg-[#0070c0] hover:bg-[#005999] text-white px-8 py-2">
          Next Step
        </Button>
      </div>
    </div >
  )
}
