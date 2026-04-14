// "use client"
// import { useForm, Controller } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Info } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { PhoneInput } from "@/components/common/PhoneInput"
// import { useQuery } from "@tanstack/react-query"
// import { getAllPalletShippingLocationTypes, getAllSignatures } from "@/api/services/address-book.api"
// // import { ContactFormProps, ContactFormValues } from "../schemas/addContact.schema"
// // import { LocationType, Signature } from "../types/addContact.types"
// import { Loader } from "@/components/common/Loader"
// // import { contactSchema } from "../schemas/addContact.schema"
// import { useEffect, useState } from "react"
// import { GlobalForm } from "@/components/common/form/GlobalForm"
// import { ShipmentAddressFormProps, shippingAddressSchema, ShippingAddressSchemaType } from "./shipmentAddress.schema"
// import { LocationType, Signature } from "../../settings/(address-book)/types/addContact.types"
// import { forwardRef, useImperativeHandle } from "react"

// export function ContactForm({
//     defaultValues,
//     onSubmit,
//     isLoading,
//     open,
//     setOpen,
//     setIsValid
// }: ShipmentAddressFormProps) {

//     const {
//         register,
//         handleSubmit,
//         control,
//         reset,
//         watch,
//         getValues,
//         formState: { isValid, errors }
//     } = useForm<ShippingAddressSchemaType>({
//         resolver: zodResolver(shippingAddressSchema),
//         mode: "onChange",

//     })
//     useEffect(() => {
//         if (defaultValues) {
//             reset(
//                 defaultValues,
//             )
//         }
//     }, [defaultValues, reset, isLoading])
//     console.log("current values", getValues())
//     const handleOpenChange = (newOpen: boolean) => {
//         if (!newOpen) reset()
//         setOpen?.(newOpen)
//     }

//     const { data: palletShippingLocationTypesRes, isLoading: isLoadingPallet, isPending: isPendingPallet } = useQuery({
//         queryKey: ["palletShippingLocationTypes"],
//         queryFn: getAllPalletShippingLocationTypes
//     })

//     const { data: signatures, isLoading: isLoadingSignatures, isPending: isPendingSignatures } = useQuery({
//         queryKey: ["signatures"],
//         queryFn: getAllSignatures
//     })
//   const [addressLocked, setAddressLocked] = useState(false)

//     useEffect(() => {
//         setIsValid?.(isValid)
//     }, [isValid])

//       useImperativeHandle(ref, () => ({
//         getValues: methods.getValues,
//         setValues: (vals: any) => methods.reset({ ...vals }),
//         trigger: methods.trigger
//       }), [methods]);
    
//       const index = type === "FROM" ? 0 : 1
    
//       useEffect(() => {
//         if (!cachedSingleQuote) return;
    
//         const quoteAddress = cachedSingleQuote.quote.addresses[index]?.address
//           ?? cachedSingleQuote.quote.addresses[index]?.addressBookEntry?.address;
//         const isAddressBookEntry = cachedSingleQuote.quote.addresses[index]?.addressBookEntry?.address;
    
//         if (quoteAddress) {
//           setAddressLocked(true);
//           methods.reset({
//             type,
//             ...(isAddressBookEntry && { addressBookId: quoteAddress.id ?? null }),
//             address1: quoteAddress.address1,
//             postalCode: quoteAddress.postalCode,
//             city: quoteAddress.city,
//             state: quoteAddress.state,
//             country: quoteAddress.country,
//             ...(showLocationType && { locationType: quoteAddress.locationType }),
//           });
//         }
    
//       }, [cachedSingleQuote, index, type, shipmentType, methods]);
    
//       const handleAddressSelect = (contact: ContactType) => {
//         markContactAsRecent.mutate(contact.id || "")
//         setAddressLocked(true)
//         const currentValues = methods.getValues();
//         methods.reset({
//           ...currentValues,
//           type: type,
//           addressBookId: Number(contact.id),
//           address1: contact.address?.address1 || "",
//           postalCode: contact.address?.postalCode || "",
//           city: contact.address?.city || "",
//           state: contact.address?.state || "",
//           country: contact.address?.country || "",
//           ...(showLocationType && { locationType: contact?.locationTypeId || "" }),
//         });
//       }
    
    
//       const { data: locationTypeData, isLoading: locationTypeLoading, isPending: locationTypeIsPending } = useQuery({
//         queryKey: ["palletShippingLocationTypes"],
//         queryFn: getAllPalletShippingLocationTypes
//       })
    
//       const handleClearAddress = () => {
//         setAddressLocked(false)
//         methods.reset({
//           type,
//           address1: "",
//           city: "",
//           state: "",
//           postalCode: "",
//           country: "",
//         });
//       };
    
//       const handleSwap = () => {
//         // Parent handles the actual swapping by fetching from refs
//         if (onSwap) {
//           onSwap();
//         }
//       }
//       if (quoteId) {
//         if (isLoading || isPending) {
//           return <></>
//         }
//       }
    
//       const handleNext = (data: any) => {
//         if (onNextStep) {
//           onNextStep(data);
//         }
//       };


//     return (
//         isLoading ?
//             <Loader /> :
            
//             <form id="contact-form" onSubmit={onSubmit ? handleSubmit(onSubmit) : () => {}} className="space-y-6 p-1">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                         <Label>Company/Name*</Label>
//                         <Input {...register("companyName")} className={errors.companyName ? "border-red-500" : "border-[#4aa0e3] outline-none ring-1 ring-[#4aa0e3]/30"} />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Contact ID (optional)</Label>
//                         <Input {...register("contactId")} />
//                     </div>
//                 </div>

//                 <div className="space-y-2">
//                     <Label>Address 1*</Label>
//                     <Input {...register("address.address1")} placeholder="123 Address" className={errors.address?.address1 ? "border-red-500" : ""} />


//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                         <Label>Address 2 (optional)</Label>
//                         <Input {...register("address.address2")} />
//                         <p className="text-xs text-muted-foreground mt-1 font-medium">
//                             P.O Box Addresses are not accepted
//                         </p>
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Unit/Floor #</Label>
//                         <Input {...register("address.unit")} />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                         <Label>Postal/ZIP Code*</Label>
//                         <Input {...register("address.postalCode")} className={errors.address?.postalCode ? "border-red-500" : ""} />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>City*</Label>
//                         <Input {...register("address.city")} placeholder="City Name" className={errors.address?.city ? "border-red-500" : ""} />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                         <Label>Province/State*</Label>
//                         <Input
//                             {...register("address.state")}
//                             placeholder="e.g., IL, ON, CA"
//                             className={errors.address?.state ? "border-red-500" : ""}
//                         />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Country*</Label>
//                         <Controller
//                             name="address.country"
//                             control={control}
//                             defaultValue={defaultValues?.address?.country}
//                             render={({ field }) => (
//                                 <Select
//                                     value={field.value}
//                                     onValueChange={field.onChange}
//                                 >
//                                     <SelectTrigger className={`w-full ${errors.address?.country ? "border-red-500" : ""} cursor-pointer`}>
//                                         <SelectValue placeholder="Select Country" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="CA">Canada</SelectItem>
//                                         <SelectItem value="US">United States</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             )}
//                         />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
//                     <div className="space-y-2">
//                         <Label>Contact Name*</Label>
//                         <Input {...register("contactName")} placeholder="Full name of receiver" className={errors.contactName ? "border-red-500" : ""} />
//                     </div>
//                     <div className="space-y-2">
//                         <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>Phone Number*</Label>
//                         <Controller
//                             name="phone"
//                             control={control}
//                             render={({ field }) => (
//                                 <PhoneInput
//                                     {...field}
//                                     placeholder="Phone number"
//                                     defaultCountry="CA"
//                                 />

//                             )}
//                         />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                         <Label className="flex items-center gap-1">
//                             Email Address (optional) <Info className="h-3.5 w-3.5 text-muted-foreground" />
//                         </Label>
//                         <Input {...register("email")} placeholder="email@example.com" />
//                     </div>
//                 </div>

//                 <div className="space-y-2">
//                     <Label>Default Instructions</Label>
//                     <Input {...register("defaultInstructions")} />
//                 </div>

//                 <hr className="my-6 border-border" />

//                 <div className="space-y-6">
//                     <div>
//                         <h3 className="text-sm font-semibold mb-3">Pallet Shipping Preferences</h3>
//                         <h4 className="text-sm font-medium text-muted-foreground mb-4">Receiving Hours</h4>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Ready Time */}
//                             <div className="space-y-2">
//                                 <Label className="text-xs text-muted-foreground font-medium">Ready Time*</Label>
//                                 <div className="flex items-center gap-2">
//                                     <Input {...register("readyTimeHour")} type="number" min={0} max={11} className="w-14 px-2 text-center " />
//                                     <span>:</span>
//                                     <Input {...register("readyTimeMinute")} type="number" min={0} max={59} className="w-14 px-2 text-center" />

//                                     <Controller
//                                         name="readyTimeAmPm"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <div className="flex border border-border rounded-md bg-background w-max">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => field.onChange("AM")}
//                                                     className={`cursor-pointer px-3 py-2 text-xs font-semibold ${field.value === "AM" ? "bg-muted text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
//                                                 >
//                                                     AM
//                                                 </button>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => field.onChange("PM")}
//                                                     className={`cursor-pointer px-3 py-2 text-xs font-semibold ${field.value === "PM" ? "bg-muted text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
//                                                 >
//                                                     PM
//                                                 </button>
//                                             </div>
//                                         )}
//                                     />
//                                 </div>
//                             </div>

//                             {/* Close Time */}
//                             <div className="space-y-2">
//                                 <Label className="text-xs text-muted-foreground font-medium">Close Time*</Label>
//                                 <div className="flex items-center gap-2">
//                                     <Input {...register("closeTimeHour")} type="number" min={0} max={11} className="w-14 px-2 text-center" />
//                                     <span>:</span>
//                                     <Input {...register("closeTimeMinute")} type="number" min={0} max={59} className="w-14 px-2 text-center" />

//                                     <Controller
//                                         name="closeTimeAmPm"
//                                         control={control}
//                                         render={({ field }) => (
//                                             <div className="flex border border-border rounded-md bg-background w-max">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => field.onChange("AM")}
//                                                     className={`cursor-pointer px-3 py-2 text-xs font-semibold ${field.value === "AM" ? "bg-muted  text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
//                                                 >
//                                                     AM
//                                                 </button>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => field.onChange("PM")}
//                                                     className={`cursor-pointer px-3 py-2 text-xs font-semibold border-l border-border ${field.value === "PM" ? "bg-muted text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
//                                                 >
//                                                     PM
//                                                 </button>
//                                             </div>
//                                         )}
//                                     />
//                                 </div>
//                             </div>

//                             {/* Location Type */}
//                             {isLoadingPallet || isPendingPallet ?
//                                 <Loader />
//                                 : <div className="space-y-2">
//                                     <Label className="text-xs text-muted-foreground font-medium">Location Type*</Label>
//                                     <Controller
//                                         name="locationTypeId"
//                                         control={control}
//                                         defaultValue={defaultValues?.locationTypeId}
//                                         render={({ field }) => (
//                                             <Select
//                                                 value={field.value?.toString()}

//                                                 onValueChange={(value) => field.onChange(Number(value))}>
//                                                 <SelectTrigger className={`${errors.locationTypeId ? "border-red-500" : ""} w-full overflow-hidden cursor-pointer`}>
//                                                     <SelectValue placeholder="Select" />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     {
//                                                         palletShippingLocationTypesRes.palletShippingLocationTypes
//                                                             .map((palletShipping: LocationType) => (
//                                                                 <SelectItem className="cursor-pointer" key={palletShipping.id} value={palletShipping.id.toString()}>
//                                                                     {palletShipping.name}
//                                                                 </SelectItem>
//                                                             ))
//                                                     }
//                                                 </SelectContent>
//                                             </Select>
//                                         )}
//                                     />
//                                 </div>}
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className="text-sm font-semibold mb-4">Courier Shipping Preferences</h3>

//                         <div className="space-y-6">
//                             <div className="flex items-center gap-2">
//                                 <Controller
//                                     name="isResidential"
//                                     control={control}
//                                     render={({ field }) => (
//                                         <Checkbox

//                                             id="isResidential"
//                                             checked={field.value === true}
//                                             className="cursor-pointer"

//                                             onCheckedChange={(checked) => field.onChange(checked === true)}
//                                         />
//                                     )}
//                                 />
//                                 <Label htmlFor="isResidential" className="flex items-center gap-1 font-normal">
//                                     Residential Address <Info className="h-3.5 w-3.5 text-muted-foreground" />
//                                 </Label>
//                             </div>

//                             {isLoadingSignatures ?
//                                 <Loader /> :
//                                 <Controller
//                                     name="signatureId"
//                                     control={control}
//                                     defaultValue={defaultValues?.signatureId}
//                                     render={({ field }) => (
//                                         <RadioGroup
//                                             onValueChange={(value) => field.onChange(Number(value))}
//                                             className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
//                                         >
//                                             {signatures.map((signature: Signature) => (
//                                                 <div key={signature.type} className="flex items-center space-x-2">
//                                                     <RadioGroupItem checked={field.value === signature.id} value={signature.id.toString()} id={signature.type} className="cursor-pointer text-orange-500 border-orange-500 fill-orange-500" />
//                                                     <Label htmlFor={signature.type} className="font-semibold text-foreground">{signature.name}</Label>
//                                                 </div>
//                                             ))}

//                                         </RadioGroup>
//                                     )}
//                                 />}
//                         </div>
//                     </div>
//                 </div>

//                 <button type="submit" className="hidden" />
//             </form>

       

//     )
// }
