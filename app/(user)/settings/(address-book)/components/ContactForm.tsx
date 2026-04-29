"use client"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
    // methods

    const methods = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        mode: "onChange",
        defaultValues: defaultValues || {
            companyName: "",
            phoneNumber: "",
            email: "",
            contactName: "",
            address: {
                address1: "",
                postalCode: "",
                city: "",
                state: "",
                country: "",
            },
            readyTimeHour: "00",
            readyTimeMinute: "00",
            readyTimeAmPm: "AM",
            closeTimeHour: "00",
            closeTimeMinute: "00",
            closeTimeAmPm: "AM",
        }

    })
    useEffect(() => {
        if (defaultValues) {
            console.log("defaultValues", defaultValues)
            methods.reset(
                defaultValues,
            )
        }
        else {
            methods.reset({
                // readyTimeHour: 0,
                // readyTimeMinute: 0,
                // readyTimeAmPm: "AM",
                // closeTimeHour: 0,
                // closeTimeMinute: 0,
                // closeTimeAmPm: "AM",

                readyTimeHour: "00",
                readyTimeMinute: "00",
                readyTimeAmPm: "AM",
                closeTimeHour: "00",
                closeTimeMinute: "00",
                closeTimeAmPm: "AM",
            })
        }
    }, [defaultValues, methods.reset, isLoading])
    console.log("current values", methods.getValues())
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) methods.reset()
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
        setIsValid?.(methods.formState.isValid)
    }, [methods.formState.isValid])

    console.log("errors", methods.formState.errors)

    return (
        isLoading ?
            <Loader /> : <>
                <FormProvider {...methods}>
                    <form id="contact-form" onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : () => { }} className="space-y-6 p-1">
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
                                // {
                                //     name: "address.country",
                                //     label: "Country*",
                                //     type: "select",
                                //     options: [
                                //         { value: "canada", label: "Canada" },
                                //         { value: "united-states", label: "United States" },
                                //     ],
                                //     placeholder: "Country",
                                // },
                                // text based country
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
                                    name: "phoneNumber",
                                    label: "Phone*",
                                    type: "phone",
                                    placeholder: "Phone",
                                },
                                {
                                    name: "locationTypeId",
                                    label: "Location Type*",
                                    type: "select",
                                    placeholder: "Location Type",
                                    options: palletShippingLocationTypesRes?.palletShippingLocationTypes.map((palletShipping: LocationType) => ({
                                        value: palletShipping.id.toString(),
                                        label: palletShipping.name
                                    })),
                                    show: !isPendingPallet && !isLoadingPallet,
                                    valueType: "number"
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
                                    show: !isLoadingSignatures,
                                    valueType: "number"
                                }
                            ]}
                        />
                    </form>
                </FormProvider>
            </>
    )
}
