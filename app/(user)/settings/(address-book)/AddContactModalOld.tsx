"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Info, CheckCircle2, UserSquare2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PhoneInput } from "@/components/common/PhoneInput"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createContact, getAllPalletShippingLocationTypes, getAllSignatures } from "@/api/services/address-book.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { ContactFormValues } from "./schemas/addContact.schema"
import { ContactType, LocationType, Signature } from "./types/addContact.types"
import { Loader } from "@/components/common/Loader"

const contactSchema = z.object({
  companyName: z.string().min(1, "Company/Name is required"),
  contactId: z.string().optional(),
  phone: z.string().min(1, "Phone Number is required"),
  email: z.email("Invalid email").optional(),
  defaultInstructions: z.string().optional(),
  address: z.object({
    address1: z.string().min(1, "Address 1 is required"),
    address2: z.string().optional(),
    unit: z.string().optional(),
    postalCode: z.string().min(1, "Postal/ZIP Code is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "Province/State is required"),
    country: z.string().min(1, "Country is required"),
  }),
  contactName: z.string().min(1, "Contact Name is required"),

  // Pallet Shipping preferences
  readyTimeHour: z.string().min(1),
  readyTimeMinute: z.string().min(1),
  readyTimeAmPm: z.enum(["AM", "PM"]),
  closeTimeHour: z.string().min(1),
  closeTimeMinute: z.string().min(1),
  closeTimeAmPm: z.enum(["AM", "PM"]),

  // Courier Shipping preferences
  locationTypeId: z.number(),
  signatureId: z.number(),
  isResidential: z.boolean().optional(),
})

function pad2(value: string) {
  return value.trim().padStart(2, "0")
}

function formatTime12h(hour: string, minute: string, ampm: "AM" | "PM") {
  // API expects strings like "08:00 AM"
  return `${pad2(hour)}:${pad2(minute)} ${ampm}`
}

export function AddContactModal() {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isValid, errors, }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    // defaultValues: {
    //   readyTimeHour: "10",
    //   readyTimeMinute: "00",
    //   readyTimeAmPm: "AM",
    //   closeTimeHour: "05",
    //   closeTimeMinute: "00",
    //   closeTimeAmPm: "PM",
    //   signatureId: 1,
    //   isResidential: false
    // }
  })
  const onSubmit = (data: ContactFormValues) => {
    const payload: ContactType = {
      companyName: data.companyName,
      contactId: data.contactId || null,
      contactName: data.contactName,
      phoneNumber: data.phone,
      email: data.email || null,
      defaultInstructions: data.defaultInstructions || null,

      palletShippingReadyTime: formatTime12h(
        data.readyTimeHour,
        data.readyTimeMinute,
        data.readyTimeAmPm
      ),

      palletShippingCloseTime: formatTime12h(
        data.closeTimeHour,
        data.closeTimeMinute,
        data.closeTimeAmPm
      ),

      address: {
        address1: data.address.address1,
        address2: data.address.address2 || null,
        unit: data.address.unit || null,
        postalCode: data.address.postalCode,
        country: data.address.country,
        city: data.address.city,
        state: data.address.state,
      },

      locationTypeId: data.locationTypeId,
      signatureId: data.signatureId,
      isResidential: data.isResidential,
    };

    addContactMutation.mutate(payload)
  }

  const addContactMutation = useMutation({
    mutationFn: (data: ContactType) => createContact(data),
    onSuccess: () => {
      toast.success("Contact added successfully")
      reset()
      setOpen(false)
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data.message)
    }
  })
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) reset()
    setOpen(newOpen)
  }

  const { data: palletShippingLocationTypesRes, isLoading: isLoadingPallet } = useQuery({
    queryKey: ["palletShippingLocationTypes"],
    queryFn: getAllPalletShippingLocationTypes
  })

  const { data: signatures, isLoading: isLoadingSignatures } = useQuery({
    queryKey: ["signatures"],
    queryFn: getAllSignatures
  })

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-[#0070c0] text-[#0070c0] bg-transparent hover:bg-[#0070c0]/10 w-full sm:w-auto">
          <span className="text-xl leading-none font-medium mb-0.5">+</span> Add New Contact
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <UserSquare2 className="h-6 w-6" />
              Add New Contact
            </DialogTitle>
          </div>
        </DialogHeader>


        <ScrollArea className="flex-1 overflow-y-auto px-6 py-6">
          <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-1">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company/Name*</Label>
                <Input {...register("companyName")} className={errors.companyName ? "border-red-500" : "border-[#4aa0e3] outline-none ring-1 ring-[#4aa0e3]/30"} />
              </div>
              <div className="space-y-2">
                <Label>Contact ID (optional)</Label>
                <Input {...register("contactId")} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address 1*</Label>
              <Input {...register("address.address1")} placeholder="123 Address" className={errors.address?.address1 ? "border-red-500" : ""} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Address 2 (optional)</Label>
                <Input {...register("address.address2")} />
                <p className="text-xs text-muted-foreground mt-1 font-medium">
                  P.O Box Addresses are not accepted
                </p>
              </div>
              <div className="space-y-2">
                <Label>Unit/Floor #</Label>
                <Input {...register("address.unit")} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Postal/ZIP Code*</Label>
                <Input {...register("address.postalCode")} className={errors.address?.postalCode ? "border-red-500" : ""} />
              </div>
              <div className="space-y-2">
                <Label>City*</Label>
                <Input {...register("address.city")} placeholder="City Name" className={errors.address?.city ? "border-red-500" : ""} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Province/State*</Label>
                <Input
                  {...register("address.state")}
                  placeholder="e.g., IL, ON, CA"
                  className={errors.address?.state ? "border-red-500" : ""}
                />

                {/* <div className="flex items-center gap-1 mt-2 text-[#004e98] text-sm font-semibold cursor-pointer w-max">
                  <CheckCircle2 className="h-4 w-4" />
                  Validate Address
                </div> */}
              </div>
              <div className="space-y-2">
                <Label>Country*</Label>
                <Controller
                  name="address.country"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={`w-full ${errors.address?.country ? "border-red-500" : ""} cursor-pointer`}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label>Contact Name*</Label>
                <Input {...register("contactName")} placeholder="Full name of receiver" className={errors.contactName ? "border-red-500" : ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>Phone Number*</Label>
                <Controller
                  name="phone"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Email Address (optional) <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </Label>
                <Input {...register("email")} placeholder="email@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Default Instructions</Label>
              <Input {...register("defaultInstructions")} />
            </div>

            <hr className="my-6 border-border" />

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Pallet Shipping Preferences</h3>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Receiving Hours</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ready Time */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">Ready Time*</Label>
                    <div className="flex items-center gap-2">
                      <Input {...register("readyTimeHour")} type="number" min={0} max={11} className="w-14 px-2 text-center " />
                      <span>:</span>
                      <Input {...register("readyTimeMinute")} type="number" min={0} max={59} className="w-14 px-2 text-center" />

                      <Controller
                        name="readyTimeAmPm"
                        control={control}
                        render={({ field }) => (
                          <div className="flex border border-border rounded-md bg-background w-max">
                            <button
                              type="button"
                              onClick={() => field.onChange("AM")}
                              className={`cursor-pointer px-3 py-2 text-xs font-semibold ${field.value === "AM" ? "bg-muted text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
                            >
                              AM
                            </button>
                            <button
                              type="button"
                              onClick={() => field.onChange("PM")}
                              className={`cursor-pointer px-3 py-2 text-xs font-semibold ${field.value === "PM" ? "bg-muted text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
                            >
                              PM
                            </button>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* Close Time */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">Close Time*</Label>
                    <div className="flex items-center gap-2">
                      <Input {...register("closeTimeHour")} type="number" min={0} max={11} className="w-14 px-2 text-center" />
                      <span>:</span>
                      <Input {...register("closeTimeMinute")} type="number" min={0} max={59} className="w-14 px-2 text-center" />

                      <Controller
                        name="closeTimeAmPm"
                        control={control}
                        render={({ field }) => (
                          <div className="flex border border-border rounded-md bg-background w-max">
                            <button
                              type="button"
                              onClick={() => field.onChange("AM")}
                              className={`cursor-pointer px-3 py-2 text-xs font-semibold ${field.value === "AM" ? "bg-muted  text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
                            >
                              AM
                            </button>
                            <button
                              type="button"
                              onClick={() => field.onChange("PM")}
                              className={`cursor-pointer px-3 py-2 text-xs font-semibold border-l border-border ${field.value === "PM" ? "bg-muted text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
                            >
                              PM
                            </button>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* Location Type */}
                  {isLoadingPallet ?
                    <Loader />
                    : <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-medium">Location Type*</Label>
                      <Controller
                        name="locationTypeId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value?.toString()}
                            onValueChange={(value) => field.onChange(Number(value))}>
                            <SelectTrigger className={`${errors.locationTypeId ? "border-red-500" : ""} w-full overflow-hidden cursor-pointer`}>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {
                                palletShippingLocationTypesRes.palletShippingLocationTypes
                                  .map((palletShipping: LocationType) => (
                                    <SelectItem className="cursor-pointer" key={palletShipping.id} value={palletShipping.id.toString()}>
                                      {palletShipping.name}
                                    </SelectItem>
                                  ))
                              }
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">Courier Shipping Preferences</h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Controller
                      name="isResidential"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="isResidential"
                          checked={field.value === true}
                          className="cursor-pointer"
                          // value={field.value}
                          onCheckedChange={(checked) => field.onChange(checked === true)}
                        />
                      )}
                    />
                    <Label htmlFor="isResidential" className="flex items-center gap-1 font-normal">
                      Residential Address <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </Label>
                  </div>

                  {isLoadingSignatures ?
                    <Loader /> :
                    <Controller
                      name="signatureId"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value?.toString()}
                          onValueChange={(value) => field.onChange(Number(value))}
                          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                        >
                          {signatures.map((signature: Signature) => (
                            <div key={signature.type} className="flex items-center space-x-2">
                              <RadioGroupItem value={signature.id.toString()} id={signature.type} className="cursor-pointer text-orange-500 border-orange-500 fill-orange-500" />
                              <Label htmlFor={signature.type} className="font-semibold text-foreground">{signature.name}</Label>
                            </div>
                          ))}

                        </RadioGroup>
                      )}
                    />}
                </div>
              </div>
            </div>

            {/* Hidden submit button since footer uses a separate button referencing the form */}
            <button type="submit" className="hidden" />
          </form>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t border-border bg-muted/20 sm:justify-start gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-[120px]">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={!isValid} type="submit" form="contact-form" className="bg-[#0070c0] hover:bg-[#005999] text-white w-[140px]">
            Save Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}
