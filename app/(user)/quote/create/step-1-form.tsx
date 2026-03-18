"use client"

import { useFormContext, Controller } from "react-hook-form"
import { QuoteSchemaTypes } from "@/lib/validations/quote/quote-schema"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, Truck, Package, Clock } from "lucide-react" // Using lucide-react for icons
import FormField from "@/components/common/FormField"
import { Input } from "@/components/ui/input"

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
    const valid = await trigger() // validate everything in step 1 since it's the whole form for now
    if (valid) onNext()
    else console.log(errors)
  }

  const shipmentType = watch("shipmentType")

  const setShipmentType = (type: "LTL-Partial Truckload" | "Full Truck Load" | "Time Critical") => {
    setValue("shipmentType", type, { shouldValidate: true })
  }

  // Helper component for the Shipping address sections
  const ShippingAddressSection = ({ type, title }: { type: "shippingFrom" | "shippingTo", title: string }) => {
    const typeErrors = errors[type]

    return (
      <div className="border border-border rounded-md p-4 space-y-4 flex-1">
        <div className="flex items-center justify-between pb-2 border-b">
          <h3 className="font-semibold flex items-center gap-2">
            <span className="text-xl">➔</span> {title}
          </h3>
          <div className="flex gap-4 text-sm text-primary">
            <button type="button" className="flex items-center gap-1 hover:underline">
              <span>✕</span> Clear
            </button>
            <button type="button" className="flex items-center gap-1 hover:underline">
              <span>🔄</span> Swap
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor={`${type}.address1`}>Address 1 (optional)</Label>
            <button type="button" className="text-sm text-primary flex items-center gap-1 hover:underline">
              <span className="bg-primary text-white p-0.5 rounded-sm text-[10px]">book</span> Address Book
            </button>
          </div>
          <Input
            {...register(`${type}.address1`)}
            placeholder="123 Address"
          />
          <p className="text-xs text-muted-foreground">P.O Box Addresses are not accepted</p>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name={`${type}.postalCode`}
              label="Postal/ZIP Code*"
              placeholder="A1A 1A1"
              register={register}
              error={typeErrors?.postalCode}
            />
            <FormField
              name={`${type}.city`}
              label="City*"
              placeholder="City Name"
              register={register}
              error={typeErrors?.city}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name={`${type}.province`}
              label="Province/State*"
              placeholder="State/Province"
              register={register}
              error={typeErrors?.province}
            />
            <FormField
              name={`${type}.country`}
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
              name={`${type}.locationType`}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            name={`${type}.additionalNotes`}
            label="Additional Notes (optional)"
            placeholder=""
            register={register}
            error={typeErrors?.additionalNotes}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="border border-border rounded-md p-4">
        <div className="flex items-center justify-between pb-4">
          <h3 className="font-semibold flex items-center gap-2 text-lg">
            <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">➔</span> Select Shipment Type
          </h3>
          <button type="button" className="text-sm text-primary flex items-center gap-1 hover:underline"><Info size={14} /> Shipment Types</button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            type="button"
            variant={shipmentType === "LTL-Partial Truckload" ? "default" : "outline"}
            className={`flex items-center gap-2 ${shipmentType === "LTL-Partial Truckload" ? "bg-blue-50 text-blue-600 border-blue-600 border-2 hover:bg-blue-100" : "border-gray-300"}`}
            onClick={() => setShipmentType("LTL-Partial Truckload")}
          >
            <Truck size={16} /> LTL-Partial Truckload
          </Button>
          <Button
            type="button"
            variant={shipmentType === "Full Truck Load" ? "default" : "outline"}
            className={`flex items-center gap-2 ${shipmentType === "Full Truck Load" ? "bg-blue-50 text-blue-600 border-blue-600 border-2 hover:bg-blue-100" : "border-gray-300"}`}
            onClick={() => setShipmentType("Full Truck Load")}
          >
            <Truck size={16} /> Full Truck Load
          </Button>
          <Button
            type="button"
            variant={shipmentType === "Time Critical" ? "default" : "outline"}
            className={`flex items-center gap-2 ${shipmentType === "Time Critical" ? "bg-blue-50 text-blue-600 border-blue-600 border-2 hover:bg-blue-100" : "border-gray-300"}`}
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

      <div className="border border-border rounded-md p-4">
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
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Dry Van" id="dry-van" className={field.value === "Dry Van" ? "text-amber-500 border-amber-500" : ""} />
                    <Label htmlFor="dry-van" className="font-normal cursor-pointer">Dry Van</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Refrigerated Services" id="refrigerated" />
                    <Label htmlFor="refrigerated" className="font-normal cursor-pointer">Refrigerated Services</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.equipment?.type && <p className="text-sm text-red-500">{errors.equipment.type.message}</p>}
          </div>

          <div className="space-y-3">
            <Label className="text-base font-normal text-muted-foreground block">Please specify any details regarding this shipment</Label>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="equipment.inBond"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="in-bond"
                    />
                  )}
                />
                <Label htmlFor="in-bond" className="font-normal cursor-pointer flex items-center gap-1">In-Bond <Info size={14} className="text-blue-500" /></Label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="equipment.protectFromFreeze"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="protect-freeze"
                    />
                  )}
                />
                <Label htmlFor="protect-freeze" className="font-normal cursor-pointer flex items-center gap-1">Protect from Freeze <Info size={14} className="text-blue-500" /></Label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="equipment.limitedAccess"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="limited-access"
                    />
                  )}
                />
                <Label htmlFor="limited-access" className="font-normal cursor-pointer flex items-center gap-1">Limited Access <Info size={14} className="text-blue-500" /></Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} className="bg-[#0070c0] hover:bg-[#005999] px-8">Next</Button>
      </div>
    </div>
  )
}
