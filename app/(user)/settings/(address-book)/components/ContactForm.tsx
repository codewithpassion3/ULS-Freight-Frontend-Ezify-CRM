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

    console.log("errors", errors)

    return (
        isLoading ?
            <Loader /> :

            <form id="contact-form" onSubmit={onSubmit ? handleSubmit(onSubmit) : () => { }} className="space-y-6 p-1">
                <GlobalForm
                    formWrapperClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
                    fields={[
                        {
                            name: "companyName",
                            label: "Company Name*",
                            type: "text",
                            placeholder: "Company Name",
                        },
                        {
                            name: "contactId",
                            label: "Contact ID (optional)",
                            type: "text",
                            placeholder: "Contact ID",
                        },
                        {
                            name: "address.address1",
                            label: "Address 1*",
                            type: "text",
                            placeholder: "Address 1",
                        },
                        {
                            name: "address.address2",
                            label: "Address 2",
                            type: "text",
                            placeholder: "Address 2",
                        },

                        {
                            name: "address.unit",
                            label: "Unit/Floor #",
                            type: "text",
                            placeholder: "Unit/Floor",
                        },
                        {
                            name: "address.postalCode",
                            label: "Postal/ZIP Code*",
                            type: "text",
                            placeholder: "Postal/ZIP Code",
                        },
                        {
                            name: "address.city",
                            label: "City*",
                            type: "text",
                            placeholder: "City",
                        },
                        {
                            name: "address.state",
                            label: "State/Province*",
                            type: "text",
                            placeholder: "State/Province",
                        },
                        {
                            name: "address.country",
                            label: "Country*",
                            type: "text",
                            placeholder: "Country",
                        },

                        {
                            name: "contactName",
                            label: "Contact Name*",
                            type: "text",
                            placeholder: "Contact Name",
                        },
                        {
                            name: "email",
                            label: "Email*",
                            type: "text",
                            placeholder: "Email",
                        },
                        // defaultInstructions
                        {
                            name: "defaultInstructions",
                            label: "Default Instructions",
                            type: "text",
                            placeholder: "Default Instructions",
                        },
                        {
                            name: "readyTime",
                            label: "Ready Time",
                            type: "time",
                            placeholder: "Ready Time",
                            hourName: "readyTimeHour",
                            minuteName: "readyTimeMinute",
                            ampmName: "readyTimeAmPm",
                        },
                        // close time
                        {
                            name: "closeTime",
                            label: "Close Time",
                            type: "time",
                            placeholder: "Close Time",
                            hourName: "closeTimeHour",
                            minuteName: "closeTimeMinute",
                            ampmName: "closeTimeAmPm",
                        },
                        {
                            name: "phone",
                            label: "Phone*",
                            type: "phone",
                            placeholder: "Phone",
                        },
                        {
                            name: "address.locationTypeId",
                            label: "Location Type*",
                            type: "select",
                            placeholder: "Location Type",
                            options: palletShippingLocationTypesRes.palletShippingLocationTypes.map((palletShipping: LocationType) => ({
                                value: palletShipping.id.toString(),
                                label: palletShipping.name
                            }))
                        },
                        {
                            name: "isResidential",
                            label: "Residential Address",
                            type: "checkbox",
                            placeholder: "Residential Address",
                            className: "col-span-2"
                        },
                        {
                            name: "signatureId",
                            label: "Signature*",
                            type: "radio",
                            placeholder: "Signature",
                            options: signatures?.map((signature: Signature) => ({
                                value: signature.id.toString(),
                                label: signature.name
                            })),
                            show: !isLoadingSignatures
                        }
                    ]}
                />
            </form>

    )
}
