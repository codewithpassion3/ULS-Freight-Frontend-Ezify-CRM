"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PhoneInput } from "@/components/common/PhoneInput"
import { useQuery } from "@tanstack/react-query"
import { getAllPalletShippingLocationTypes, getAllSignatures } from "@/api/services/address-book.api"
import { ContactFormProps, ContactFormValues } from "../schemas/addContact.schema"
import { LocationType, Signature } from "../types/addContact.types"
import { Loader } from "@/components/common/Loader"
import { contactSchema } from "../schemas/addContact.schema"
import { useEffect } from "react"
import { GlobalForm } from "@/components/common/form/GlobalForm"

export function ContactForm({
    defaultValues,
    onSubmit,
    isLoading,
    open,
    setOpen,
    setIsValid
}: ContactFormProps) {

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        getValues,
        formState: { isValid, errors }
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        mode: "onChange",

    })
    useEffect(() => {
        if (defaultValues) {
            reset(
                defaultValues,
            )
        }
    }, [defaultValues, reset, isLoading])
    console.log("current values", getValues())
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) reset()
        setOpen?.(newOpen)
    }

    const { data: palletShippingLocationTypesRes, isLoading: isLoadingPallet, isPending: isPendingPallet } = useQuery({
        queryKey: ["palletShippingLocationTypes"],
        queryFn: getAllPalletShippingLocationTypes
    })

    const { data: signatures, isLoading: isLoadingSignatures, isPending: isPendingSignatures } = useQuery({
        queryKey: ["signatures"],
        queryFn: getAllSignatures
    })

    useEffect(() => {
        setIsValid?.(isValid)
    }, [isValid])



    return (
        isLoading ?
            <Loader /> :
            
            <form id="contact-form" onSubmit={onSubmit ? handleSubmit(onSubmit) : () => {}} className="space-y-6 p-1">
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
                    </div>
                    <div className="space-y-2">
                        <Label>Country*</Label>
                        <Controller
                            name="address.country"
                            control={control}
                            defaultValue={defaultValues?.address?.country}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className={`w-full ${errors.address?.country ? "border-red-500" : ""} cursor-pointer`}>
                                        <SelectValue placeholder="Select Country" />
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
                            {isLoadingPallet || isPendingPallet ?
                                <Loader />
                                : <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground font-medium">Location Type*</Label>
                                    <Controller
                                        name="locationTypeId"
                                        control={control}
                                        defaultValue={defaultValues?.locationTypeId}
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
                                    defaultValue={defaultValues?.signatureId}
                                    render={({ field }) => (
                                        <RadioGroup
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                                        >
                                            {signatures.map((signature: Signature) => (
                                                <div key={signature.type} className="flex items-center space-x-2">
                                                    <RadioGroupItem checked={field.value === signature.id} value={signature.id.toString()} id={signature.type} className="cursor-pointer text-orange-500 border-orange-500 fill-orange-500" />
                                                    <Label htmlFor={signature.type} className="font-semibold text-foreground">{signature.name}</Label>
                                                </div>
                                            ))}

                                        </RadioGroup>
                                    )}
                                />}
                        </div>
                    </div>
                </div>

                <button type="submit" className="hidden" />
            </form>

        // put these inputs and labels in global form
        // <GlobalForm
        //     schema={contactSchema}
        //     defaultValues={defaultValues}
        //     onSubmit={onSubmit}
        //     isLoading={isLoading}
        //     open={open}
        //     setOpen={setOpen}
        //     setIsValid={setIsValid}
        //     fields={[
        //         {
        //             name: "firstName",
        //             label: "First Name*",
        //             type: "text",
        //             placeholder: "First Name",
        //             register: register,
        //             error: errors.firstName
        //         },
        //         {
        //             name: "lastName",
        //             label: "Last Name*",
        //             type: "text",
        //             placeholder: "Last Name",
        //             register: register,
        //             error: errors.lastName
        //         },
        //         {
        //             name: "email",
        //             label: "Email*",
        //             type: "text",
        //             placeholder: "Email",
        //             register: register,
        //             error: errors.email
        //         },
        //         {
        //             name: "phone",
        //             label: "Phone*",
        //             type: "text",
        //             placeholder: "Phone",
        //             register: register,
        //             error: errors.phone
        //         },
        //         {
        //             name: "address.address1",
        //             label: "Address 1*",
        //             type: "text",
        //             placeholder: "Address 1",
        //             register: register,
        //             error: errors.address?.address1
        //         },
        //         {
        //             name: "address.address2",
        //             label: "Address 2",
        //             type: "text",
        //             placeholder: "Address 2",
        //             register: register,
        //             error: errors.address?.address2
        //         },
        //         {
        //             name: "address.city",
        //             label: "City*",
        //             type: "text",
        //             placeholder: "City",
        //             register: register,
        //             error: errors.address?.city
        //         },
        //         {
        //             name: "address.state",
        //             label: "State/Province*",
        //             type: "text",
        //             placeholder: "State/Province",
        //             register: register,
        //             error: errors.address?.state
        //         },
        //         {
        //             name: "address.postalCode",
        //             label: "Postal/ZIP Code*",
        //             type: "text",
        //             placeholder: "Postal/ZIP Code",
        //             register: register,
        //             error: errors.address?.postalCode
        //         },
        //         {
        //             name: "address.country",
        //             label: "Country*",
        //             type: "text",
        //             placeholder: "Country",
        //             register: register,
        //             error: errors.address?.country
        //         },
        //         {
        //             name: "address.locationTypeId",
        //             label: "Location Type*",
        //             type: "select",
        //             placeholder: "Location Type",
        //             register: register,
        //             error: errors.address?.locationTypeId,
        //             options: palletShippingLocationTypesRes.palletShippingLocationTypes.map((palletShipping: LocationType) => ({
        //                 value: palletShipping.id.toString(),
        //                 label: palletShipping.name
        //             }))
        //         },
        //         {
        //             name: "isResidential",
        //             label: "Residential Address",
        //             type: "checkbox",
        //             placeholder: "Residential Address",
        //             register: register,
        //             error: errors.isResidential
        //         },
        //         {
        //             name: "signatureId",
        //             label: "Signature*",
        //             type: "radio",
        //             placeholder: "Signature",
        //             register: register,
        //             error: errors.signatureId,
        //             options: signatures.map((signature: Signature) => ({
        //                 value: signature.id.toString(),
        //                 label: signature.name
        //             }))
        //         }
        //     ]}
        // >
        //     <div className="space-y-4">
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //             <FormField
        //                 name="firstName"
        //                 label="First Name*"
        //                 placeholder="First Name"
        //                 register={register}
        //                 error={errors.firstName}
        //             />
        //             <FormField
        //                 name="lastName"
        //                 label="Last Name*"
        //                 placeholder="Last Name"
        //                 register={register}
        //                 error={errors.lastName}
        //             />
        //         </div>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //             <FormField
        //                 name="email"
        //                 label="Email*"
        //                 placeholder="Email"
        //                 register={register}
        //                 error={errors.email}
        //             />
        //             <FormField
        //                 name="phone"
        //                 label="Phone*"
        //                 placeholder="Phone"
        //                 register={register}
        //                 error={errors.phone}
        //             />
        //         </div>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //             <FormField
        //                 name="address1"
        //                 label="Address 1*"
        //                 placeholder="Address 1"
        //                 register={register}
        //                 error={errors.address1}
        //             />
        //             <FormField
        //                 name="address2"
        //                 label="Address 2"
        //                 placeholder="Address 2"
        //                 register={register}
        //                 error={errors.address2}
        //             />
        //         </div>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //             <FormField
        //                 name="city"
        //                 label="City*"
        //                 placeholder="City"
        //                 register={register}
        //                 error={errors.city}
        //             />
        //             <FormField
        //                 name="postalCode"
        //                 label="Postal/ZIP Code*"
        //                 placeholder="Postal/ZIP Code"
        //                 register={register}
        //                 error={errors.postalCode}
        //             />
        //         </div>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //             <FormField
        //                 name="province"
        //                 label="Province/State*"
        //                 placeholder="Province/State"
        //                 register={register}
        //                 error={errors.province}
        //             />
        //             <FormField
        //                 name="country"
        //                 label="Country*"
        //                 placeholder="Country"
        //                 register={register}
        //                 error={errors.country}
        //             />
        //         </div>
        //     </div>
        // </GlobalForm>


    )
}
