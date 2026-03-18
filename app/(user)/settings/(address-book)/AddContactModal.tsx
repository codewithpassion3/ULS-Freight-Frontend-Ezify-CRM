"use client"

import { useState } from "react"
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

const contactSchema = z.object({
  companyName: z.string().min(1, "Company/Name is required"),
  contactId: z.string().optional(),
  address1: z.string().min(1, "Address 1 is required"),
  address2: z.string().optional(),
  unit: z.string().optional(),
  postalCode: z.string().min(1, "Postal/ZIP Code is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province/State is required"),
  country: z.string().min(1, "Country is required"),
  contactName: z.string().min(1, "Contact Name is required"),
  phone: z.string().min(1, "Phone Number is required"),
  ext: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  defaultInstructions: z.string().optional(),
  
  // Pallet Shipping preferences
  readyTimeHour: z.string().min(1),
  readyTimeMinute: z.string().min(1),
  readyTimeAmPm: z.enum(["AM", "PM"]),
  closeTimeHour: z.string().min(1),
  closeTimeMinute: z.string().min(1),
  closeTimeAmPm: z.enum(["AM", "PM"]),
  locationType: z.string().min(1, "Location Type is required"),
  
  // Courier Shipping preferences
  residential: z.boolean(),
  signatureRequired: z.enum(["none", "required", "adult"]),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function AddContactModal() {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      readyTimeHour: "10",
      readyTimeMinute: "00",
      readyTimeAmPm: "AM",
      closeTimeHour: "05",
      closeTimeMinute: "00",
      closeTimeAmPm: "PM",
      signatureRequired: "none",
      residential: false
    }
  })

  const onSubmit = (data: ContactFormValues) => {
    console.log("Saving Contact:", data)
    setOpen(false)
    reset()
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) reset()
    setOpen(newOpen)
  }

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
          <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
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
              <Input {...register("address1")} placeholder="123 Address" className={errors.address1 ? "border-red-500" : ""} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Address 2 (optional)</Label>
                <Input {...register("address2")} />
                <p className="text-xs text-muted-foreground mt-1 font-medium">
                  P.O Box Addresses are not accepted
                </p>
              </div>
              <div className="space-y-2">
                <Label>Unit/Floor #</Label>
                <Input {...register("unit")} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Postal/ZIP Code*</Label>
                <Input {...register("postalCode")} className={errors.postalCode ? "border-red-500" : ""} />
              </div>
              <div className="space-y-2">
                <Label>City*</Label>
                <Input {...register("city")} placeholder="City Name" className={errors.city ? "border-red-500" : ""} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Province/State*</Label>
                <Controller
                  name="province"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.province ? "border-red-500" : ""}>
                         <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ON">Ontario (ON)</SelectItem>
                        <SelectItem value="BC">British Columbia (BC)</SelectItem>
                        <SelectItem value="NY">New York (NY)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                
                <div className="flex items-center gap-1 mt-2 text-[#004e98] text-sm font-semibold cursor-pointer w-max">
                  <CheckCircle2 className="h-4 w-4" />
                  Validate Address
                </div>
              </div>
              <div className="space-y-2">
                <Label>Country*</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors.country ? "border-red-500" : ""}>
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
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-3 space-y-2">
                  <Label className="flex items-center gap-1">
                    Phone Number* <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </Label>
                  <Input {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
                </div>
                <div className="col-span-1 space-y-2">
                  <Label>Ext.</Label>
                  <Input {...register("ext")} />
                </div>
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Ready Time */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">Ready Time*</Label>
                    <div className="flex items-center gap-2">
                      <Input {...register("readyTimeHour")} className="w-14 px-2 text-center" />
                      <span>:</span>
                      <Input {...register("readyTimeMinute")} className="w-14 px-2 text-center" />
                      
                      <Controller
                        name="readyTimeAmPm"
                        control={control}
                        render={({ field }) => (
                          <div className="flex border border-border rounded-md overflow-hidden bg-background">
                            <button
                              type="button"
                              onClick={() => field.onChange("AM")}
                              className={`px-3 py-2 text-xs font-semibold ${field.value === "AM" ? "bg-muted text-foreground" : "text-[#4aa0e3] hover:bg-muted/50"}`}
                            >
                              AM
                            </button>
                            <button
                              type="button"
                              onClick={() => field.onChange("PM")}
                              className={`px-3 py-2 text-xs font-semibold ${field.value === "PM" ? "bg-muted text-foreground" : "text-[#4aa0e3] hover:bg-muted/50"}`}
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
                      <Input {...register("closeTimeHour")} className="w-14 px-2 text-center" />
                      <span>:</span>
                      <Input {...register("closeTimeMinute")} className="w-14 px-2 text-center" />
                      
                      <Controller
                        name="closeTimeAmPm"
                        control={control}
                        render={({ field }) => (
                          <div className="flex border border-border rounded-md overflow-hidden bg-background">
                            <button
                              type="button"
                              onClick={() => field.onChange("AM")}
                              className={`px-3 py-2 text-xs font-semibold ${field.value === "AM" ? "bg-muted text-foreground" : "text-[#4aa0e3] hover:bg-muted/50"}`}
                            >
                              AM
                            </button>
                            <button
                              type="button"
                              onClick={() => field.onChange("PM")}
                              className={`px-3 py-2 text-xs font-semibold border-l border-border ${field.value === "PM" ? "bg-muted text-foreground" : "text-[#4aa0e3] hover:bg-muted/50"}`}
                            >
                              PM
                            </button>
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* Location Type */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">Location Type*</Label>
                    <Controller
                      name="locationType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={errors.locationType ? "border-red-500" : ""}>
                             <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="residential">Residential</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4">Courier Shipping Preferences</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Controller
                      name="residential"
                      control={control}
                      render={({ field }) => (
                        <Checkbox 
                          id="residential" 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      )}
                    />
                    <Label htmlFor="residential" className="flex items-center gap-1 font-normal">
                      Residential Address <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </Label>
                  </div>
                  
                  <Controller
                    name="signatureRequired"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="none" className="text-orange-500 border-orange-500 fill-orange-500" />
                          <Label htmlFor="none" className="font-semibold text-foreground">No Signature Required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="required" id="required" />
                          <Label htmlFor="required" className="font-normal text-muted-foreground">Signature Required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="adult" id="adult" />
                          <Label htmlFor="adult" className="flex items-center gap-1 font-normal text-muted-foreground">
                            Adult Signature Required <Info className="h-3.5 w-3.5" />
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
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
          <Button type="submit" form="contact-form" className="bg-[#0070c0] hover:bg-[#005999] text-white w-[140px]">
            Save Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
