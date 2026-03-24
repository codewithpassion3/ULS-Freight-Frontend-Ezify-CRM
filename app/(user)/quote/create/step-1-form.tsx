"use client"

import { useFormContext, Controller } from "react-hook-form"
import { QuoteSchemaTypes } from "@/lib/validations/quote/quote-schema"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, Truck, Clock } from "lucide-react"
import FormField from "@/components/common/FormField"
import { Input } from "@/components/ui/input"
import { SelectAddressBookModal } from "./SelectAddressBookModal"
import { ContactType } from "../../settings/(address-book)/types/addContact.types"
import { GlobalForm } from "@/components/common/form/GlobalForm"

export function Step1Form({ onNext }: { onNext: () => void }) {
  const form = useFormContext<QuoteSchemaTypes>()
  const {
    register,
    control,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = form

  const handleNext = async () => {
    const valid = await trigger()
    if (valid) onNext()
    else console.log("Validation Errors:", errors)
  }

  const shipmentType = watch("shipmentType")

  const setShipmentType = (type: "LTL-Partial Truckload" | "Full Truck Load" | "Time Critical") => {
    setValue("shipmentType", type, { shouldValidate: true })
    // Re-trigger defaults if needed when switching tab
  }

  // Helper component for the Shipping address sections
  const ShippingAddressSection = ({ type, title }: { type: "shippingFrom" | "shippingTo", title: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typeErrors = errors[type] as any

    const handleAddressSelect = (contact: ContactType) => {
      setValue(`${type}.address1`, contact.address?.address1 || "", { shouldValidate: true });
      setValue(`${type}.postalCode`, contact.address?.postalCode || "", { shouldValidate: true });
      setValue(`${type}.city`, contact.address?.city || "", { shouldValidate: true });
      setValue(`${type}.province`, contact.address?.state || "", { shouldValidate: true });
      setValue(`${type}.country`, contact.address?.country || "", { shouldValidate: true });
    }

    const clearAddress = () => {
      setValue(`${type}.address1`, "");
      setValue(`${type}.postalCode`, "");
      setValue(`${type}.city`, "");
      setValue(`${type}.province`, "");
      setValue(`${type}.country`, "");
      setValue(`${type}.locationType`, "");
      setValue(`${type}.additionalNotes`, "");
    }

    return (
      <div className="border border-border rounded-md p-4 space-y-4 flex-1 bg-white">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-semibold flex items-center gap-2">
            <span className="text-xl">➔</span> {title}
          </h3>
          <div className="flex gap-4 text-sm text-primary">
            <button type="button" onClick={clearAddress} className="flex items-center gap-1 hover:underline text-muted-foreground mr-2">
              <span>✕</span> Clear
            </button>
            <button type="button" className="flex items-center gap-1 hover:underline">
              <span>🔄</span> Swap
            </button>
          </div>
        </div>

        {shipmentType === "Full Truck Load" && (
          <div className="flex items-center space-x-2 pt-2">
            <Controller
              control={control}
              name={type === "shippingFrom" ? "shippingFrom.multiplePickupLocations" : "shippingTo.multipleDeliveryLocations"}
              render={({ field }) => (
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                  id={`${type}-multiple`}
                />
              )}
            />
            <Label htmlFor={`${type}-multiple`} className="font-normal cursor-pointer text-sm text-muted-foreground">
              {type === "shippingFrom" ? "Multiple Pickup Locations" : "Multiple delivery locations"}
            </Label>
          </div>
        )}

        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <Label htmlFor={`${type}.address1`}>Address 1 (optional)</Label>
            <SelectAddressBookModal onSelect={handleAddressSelect} />
          </div>
          <Input
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...register(`${type}.address1` as any)}
            placeholder="123 Address"
          />
          <p className="text-xs text-muted-foreground">P.O Box Addresses are not accepted</p>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name={`${type}.postalCode` as any}
              label="Postal/ZIP Code*"
              placeholder="A1A 1A1"
              register={register}
              error={typeErrors?.postalCode}
            />
            <FormField
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name={`${type}.city` as any}
              label="City*"
              placeholder="City Name"
              register={register}
              error={typeErrors?.city}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name={`${type}.province` as any}
              label="Province/State*"
              placeholder="State/Province"
              register={register}
              error={typeErrors?.province}
            />
            <FormField
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name={`${type}.country` as any}
              label="Country*"
              placeholder="Country"
              register={register}
              error={typeErrors?.country}
            />
          </div>

          <div className="space-y-2">
            <Label className={typeErrors?.locationType ? "text-red-500" : ""}>Location Type*</Label>
            <Controller
              control={control}
              name={`${type}.locationType` as "shippingFrom.locationType" | "shippingTo.locationType"}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={typeErrors?.locationType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      [
                        { title: "Business - Tailgate Not Required", value: "business-tailgate-not-required" },
                        { title: "Business - Tailgate Required", value: "business-tailgate-required" },
                        { title: "Residence - Tailgate Not Required", value: "residence-tailgate-not-required" },
                        { title: "Residence - Tailgate Required", value: "residence-tailgate-required" },
                      ].map((locationType) => (
                        <SelectItem key={locationType.value} value={locationType.value}>
                          {locationType.title}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              )}
            />
            {typeErrors?.locationType && <p className="text-xs text-red-500">{typeErrors.locationType.message}</p>}
          </div>

          <FormField
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            name={`${type}.additionalNotes` as any}
            label="Additional Notes (optional)"
            placeholder=""
            register={register}
            error={typeErrors?.additionalNotes}
          />
        </div>
      </div>
    )
  }

  const clearContact = () => {
    setValue("contactInformation.contactName", "");
    setValue("contactInformation.phoneNumber", "");
    setValue("contactInformation.ext", "");
    setValue("contactInformation.shipDate", "");
    setValue("contactInformation.emailAddress", "");
    setValue("contactInformation.spotQuoteName", "");
  }

  return (
    <div className="space-y-6">
      <div className="border border-border rounded-md p-4 bg-white">
        <div className="flex items-center justify-between pb-4">
          <h3 className="font-semibold flex items-center gap-2 text-lg">
            <span className="bg-slate-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">➔</span> Select Shipment Type
          </h3>
          <button type="button" className="text-sm text-[#0070c0] flex items-center gap-1 hover:underline font-medium"><Info size={14} /> Shipment Types</button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            type="button"
            variant={shipmentType === "LTL-Partial Truckload" ? "default" : "outline"}
            className={`flex items-center gap-2 ${shipmentType === "LTL-Partial Truckload" ? "bg-blue-50 text-[#0070c0] border-[#0070c0] border-2 hover:bg-blue-100" : "border-slate-300"}`}
            onClick={() => setShipmentType("LTL-Partial Truckload")}
          >
            <Truck size={16} /> LTL-Partial Truckload
          </Button>
          <Button
            type="button"
            variant={shipmentType === "Full Truck Load" ? "default" : "outline"}
            className={`flex items-center gap-2 ${shipmentType === "Full Truck Load" ? "bg-blue-50 text-[#0070c0] border-[#0070c0] border-2 hover:bg-blue-100" : "border-slate-300"}`}
            onClick={() => setShipmentType("Full Truck Load")}
          >
            <Truck size={16} /> Full Truck Load
          </Button>
          <Button
            type="button"
            variant={shipmentType === "Time Critical" ? "default" : "outline"}
            className={`flex items-center gap-2 ${shipmentType === "Time Critical" ? "bg-blue-50 text-[#0070c0] border-[#0070c0] border-2 hover:bg-blue-100" : "border-slate-300"}`}
            onClick={() => setShipmentType("Time Critical")}
          >
            <Clock size={16} /> Time Critical
          </Button>
        </div>
        {errors.shipmentType && <p className="text-sm text-red-500 mt-2">{errors.shipmentType.message}</p>}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <ShippingAddressSection type="shippingFrom" title="Shipping From" />
        <ShippingAddressSection type="shippingTo" title="Shipping To" />
      </div>

      <div className="border border-border rounded-md p-4 bg-white">
        <h3 className="font-semibold flex items-center gap-2 pb-4 text-lg border-b mb-4">
          <Truck size={20} /> Equipment Type & Additional Services
        </h3>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className={errors.equipment?.type ? "text-red-500 text-base" : "text-base font-normal text-muted-foreground"}>Please describe the equipment required for this shipment</Label>
            <Controller
              control={control}
              name="equipment.type"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Dry Van" id="dry-van" className={field.value === "Dry Van" ? "text-amber-500 border-amber-500" : ""} />
                    <Label htmlFor="dry-van" className="font-normal cursor-pointer text-sm">Dry Van</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Refrigerated Services" id="refrigerated" className={field.value === "Refrigerated Services" ? "text-amber-500 border-amber-500" : ""} />
                    <Label htmlFor="refrigerated" className="font-normal cursor-pointer text-sm">Refrigerated Services</Label>
                  </div>
                  {shipmentType === "Full Truck Load" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Flatbed" id="flatbed" className={field.value === "Flatbed" ? "text-amber-500 border-amber-500" : ""} />
                        <Label htmlFor="flatbed" className="font-normal cursor-pointer text-sm">Flatbed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Ventilated Trailer" id="ventilated-trailer" className={field.value === "Ventilated Trailer" ? "text-amber-500 border-amber-500" : ""} />
                        <Label htmlFor="ventilated-trailer" className="font-normal cursor-pointer text-sm">Ventilated Trailer</Label>
                      </div>
                    </>
                  )}
                </RadioGroup>
              )}
            />
            {errors.equipment?.type && <p className="text-sm text-red-500">{errors.equipment.type.message}</p>}
          </div>

          {watch("equipment.type") === "Refrigerated Services" && (
            <div className="bg-blue-50/20 p-4 border border-blue-50 rounded-md space-y-3 shadow-sm">
              <Label className="block text-sm text-slate-700 font-normal">Please specify what kind of Refrigerated Service is required:</Label>
              <Controller
                control={control}
                name="equipment.refrigeratedType"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex flex-wrap gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Fresh" id="fresh" className={field.value === "Fresh" ? "text-amber-500 border-amber-500" : "bg-white"} />
                      <Label htmlFor="fresh" className="font-normal cursor-pointer text-sm">Fresh (32°F / 0°C)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Frozen" id="frozen" className={field.value === "Frozen" ? "text-amber-500 border-amber-500" : "bg-white"} />
                      <Label htmlFor="frozen" className="font-normal cursor-pointer text-sm">Frozen (0°F / -17°C)</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          )}

          <div className="space-y-3 pt-2">
            <Label className="text-base font-normal text-muted-foreground block border-t pt-4">Please specify any details regarding this shipment</Label>
            <div className="flex flex-wrap gap-6">
              {shipmentType !== "Full Truck Load" ? (
                <>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="equipment.inBond"
                      render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="in-bond" />}
                    />
                    <Label htmlFor="in-bond" className="font-normal cursor-pointer flex items-center gap-1 text-sm">In-Bond <Info size={14} className="text-[#0070c0]" /></Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="equipment.protectFromFreeze"
                      render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="protect-freeze" />}
                    />
                    <Label htmlFor="protect-freeze" className="font-normal cursor-pointer flex items-center gap-1 text-sm">Protect from Freeze <Info size={14} className="text-[#0070c0]" /></Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="equipment.limitedAccess"
                      render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="limited-access" />}
                    />
                    <Label htmlFor="limited-access" className="font-normal cursor-pointer flex items-center gap-1 text-sm">Limited Access <Info size={14} className="text-[#0070c0]" /></Label>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="equipment.dangerousGoods"
                      render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="dangerous-goods" />}
                    />
                    <Label htmlFor="dangerous-goods" className="font-normal cursor-pointer flex items-center gap-1 text-sm">Dangerous Goods <Info size={14} className="text-[#0070c0]" /></Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="equipment.allPalletsStackable"
                      render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="all-stackable" />}
                    />
                    <Label htmlFor="all-stackable" className="font-normal cursor-pointer text-sm">All Pallets are Stackable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="equipment.somePalletsStackable"
                      render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} id="some-stackable" />}
                    />
                    <Label htmlFor="some-stackable" className="font-normal cursor-pointer text-sm">Some Pallets are Stackable</Label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-border rounded-md p-6 bg-white space-y-6">
        <div className="flex items-center justify-between pb-3 border-b">
          <h3 className="font-bold flex items-center gap-2 text-lg text-slate-800">
            <span className="flex items-center justify-center border border-slate-300 w-6 h-6 rounded-sm text-sm">📞</span> Contact Information
          </h3>
          <button type="button" onClick={clearContact} className="text-sm font-medium text-slate-500 flex items-center gap-1 hover:text-slate-800 transition-colors">
            <span>✕</span> Clear
          </button>
        </div>

        <p className="text-sm text-slate-700 font-medium">Who may Freightcom contact in regards to this quote?</p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-4">
          {/* <div className="md:col-span-4">
            <FormField name="contactInformation.contactName" label="Contact Name*" register={register} error={errors.contactInformation?.contactName} />
          </div>
          <div className="md:col-span-3">
            <FormField name="contactInformation.phoneNumber" label="Phone Number*" register={register} error={errors.contactInformation?.phoneNumber} />
          </div>
          <div className="md:col-span-1">
            <FormField name="contactInformation.ext" label="Ext." register={register} error={errors.contactInformation?.ext} />
          </div>
          <div className="md:col-span-4">
            <Label className={errors.contactInformation?.shipDate ? "text-red-500 block mb-2" : "block mb-2 text-sm font-medium leading-none"}>Ship Date*</Label>
            <div className="relative">
              <Input type="date" {...register("contactInformation.shipDate")} className={errors.contactInformation?.shipDate ? "border-red-500 pr-10" : "pr-10"} />
            </div>
            {errors.contactInformation?.shipDate && <p className="text-xs text-red-500 mt-1">{errors.contactInformation.shipDate.message}</p>}
          </div> */}

          <GlobalForm
            fields={[
              {
                name: "contactInformation.contactName",
                label: "Contact Name*",
                type: "text",
                placeholder: "Contact Name",
                wrapperClassName: "md:col-span-4",
              },
              {
                name: "contactInformation.phoneNumber",
                label: "Phone Number*",
                type: "text",
                placeholder: "Phone Number",
                wrapperClassName: "md:col-span-3",
              },
              {
                name: "contactInformation.ext",
                label: "Ext.",
                type: "text",
                placeholder: "Ext.",
                wrapperClassName: "md:col-span-1",
              },
              {
                name: "contactInformation.shipDate",
                label: "Ship Date*",
                type: "date",
                placeholder: "Ship Date",
                wrapperClassName: "md:col-span-4",
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <FormField name="contactInformation.emailAddress" label="Email Address*" register={register} error={errors.contactInformation?.emailAddress} />
          <FormField name="contactInformation.spotQuoteName" label="Spot Quote Name (optional)" register={register} error={errors.contactInformation?.spotQuoteName} />
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} type="button" className="bg-[#0070c0] hover:bg-[#005999] px-8 text-base font-semibold">Next Step</Button>
        </div>
      </div>
    </div>
  )
}
