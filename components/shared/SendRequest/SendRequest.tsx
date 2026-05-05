"use client"

import React, { forwardRef, useImperativeHandle, useState } from "react"
import { Clipboard, User, MapPin, Truck, Package, Info, Check, ArrowLeft, Send, ChevronUp, PackageCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useForm, FormProvider, Controller } from "react-hook-form"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface AddressData {
    address?: {
        address1: string
        city: string
        state: string
        postalCode: string
        country: string
    }
    companyName?: string
    contactName?: string
    phoneNumber?: string
    email?: string
    locationTypeId?: number | string
    additionalNotes?: string
    isResidential?: boolean
}

interface SendRequestProps {
    contactInfo?: {
        contactName: string
        phoneNumber: string
        emailAddress: string
        shipDate: string
        spotQuoteName?: string
    }
    equipmentDetails?: {
        spotEquipment?: {
            type: string
        }
    }
    fromAddress?: AddressData
    toAddress?: AddressData
    dimensions?: any
    services?: any
    onPrevious?: () => void
    onSubmit: () => void
}

const SendRequest = forwardRef(({
    contactInfo,
    equipmentDetails,
    fromAddress,
    toAddress,
    dimensions,
    services,
    onPrevious,
    onSubmit
}: SendRequestProps, ref) => {

    const [isOpen, setIsOpen] = useState(false)
    const methods = useForm({
        defaultValues: {
            preferredBudget: {
                amount: "",
                currency: "CAD"
            },
            confirmation: false
        }
    })

    useImperativeHandle(ref, () => ({
        getValues: methods.getValues,
        trigger: methods.trigger,
        open: () => setIsOpen(true)
    }))

    const formatAddress = (addr?: AddressData) => {
        if (!addr || !addr.address) return "-"
        const { address1, city, state, postalCode, country } = addr.address
        return `${address1}, ${city}, ${state}, ${postalCode}, ${country}`
    }

    // Helper to extract total values from dimensions
    const totalWeight = dimensions?.lineItem?.units?.reduce((acc: number, unit: any) => acc + (Number(unit.weight) || 0), 0) || 0
    const totalPallets = dimensions?.lineItem?.units?.length || 0
    const totalUnits = dimensions?.lineItem?.units?.reduce((acc: number, unit: any) => acc + (Number(unit.count) || 0), 0) || 0
    const totalCubicFeet = dimensions?.lineItem?.totalCubicFeet || "00.000"

    return (
        <FormProvider {...methods}>
            <Accordion type="single" collapsible value={isOpen ? "send-request" : ""} onValueChange={(val) => setIsOpen(!!val)} className="shadow-lg border border-border rounded-md bg-white dark:bg-card">
                <AccordionItem value="send-request" className="border-none">
                    <AccordionTrigger className="group px-6 py-4 hover:no-underline items-center cursor-pointer [&>svg]:hidden!">
                        <h2 className="flex gap-2 items-center text-lg font-semibold text-slate-800 dark:text-slate-100">
                            <Clipboard />
                            Send Request
                            <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </h2>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 space-y-8 h-full">
                        {/* Contact Information Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-[#0070c0] border-b pb-2">
                                <Clipboard className="size-5" />
                                <h2 className="font-semibold text-lg">Contact Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">Contact Name:</p>
                                    <p className="font-medium">{contactInfo?.contactName || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone Number:</p>
                                    <p className="font-medium">{contactInfo?.phoneNumber || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email Address:</p>
                                    <p className="font-medium">{contactInfo?.emailAddress || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Equipment Details:</p>
                                    <p className="font-medium capitalize">{equipmentDetails?.spotEquipment?.type || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Ship Date:</p>
                                    <p className="font-medium">{contactInfo?.shipDate || "-"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Shipment Details Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-[#0070c0] border-b pb-2">
                                <Send className="size-5 rotate-[-45deg]" />
                                <h2 className="font-semibold text-lg">Shipment Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Pickup Location */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <MapPin size={18} className="text-[#0070c0]" />
                                        <h3>Pickup Location</h3>
                                    </div>
                                    <div className="pl-7 space-y-2">
                                        <p className="text-sm leading-relaxed">{formatAddress(fromAddress)}</p>
                                        <div className="flex items-center gap-2 text-sm text-[#0070c0] font-medium">
                                            <Check size={16} />
                                            <span>Business - Tailgate Not Required</span>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">Additional Notes:</p>
                                            <p className="text-sm">{fromAddress?.additionalNotes || "-"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Location */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <MapPin size={18} className="text-[#0070c0]" />
                                        <h3>Delivery Location</h3>
                                    </div>
                                    <div className="pl-7 space-y-2">
                                        <p className="text-sm leading-relaxed">{formatAddress(toAddress)}</p>
                                        <div className="flex items-center gap-2 text-sm text-[#0070c0] font-medium">
                                            <Check size={16} />
                                            <span>Business - Tailgate Not Required</span>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-xs text-muted-foreground">Additional Notes:</p>
                                            <p className="text-sm">{toAddress?.additionalNotes || "-"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y">
                                <div>
                                    <p className="text-xs text-muted-foreground">Total Shipment Weight:</p>
                                    <p className="font-semibold">{totalWeight} lbs</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Total # of Pallets:</p>
                                    <p className="font-semibold">{totalPallets}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Total # of units on pallets:</p>
                                    <p className="font-semibold">{totalUnits}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Total Cubic Feet:</p>
                                    <p className="font-semibold">{totalCubicFeet} ft³</p>
                                </div>
                            </div>
                        </section>

                        {/* Preferred Budget Section */}
                        <section className="space-y-4 border-t pt-6">
                            <h2 className="font-semibold text-lg">What is your preferred budget?</h2>
                            <div className="space-y-3">
                                <GlobalForm
                                    formWrapperClassName="flex flex-col gap-4"
                                    fields={[
                                        {
                                            name: "preferredBudget.amount",
                                            label: "Estimated Amount (optional)",
                                            type: "input",
                                            placeholder: "$ 0",
                                            className: "max-w-[200px]"
                                        },
                                        {
                                            name: "preferredBudget.currency",
                                            label: "Currency",
                                            type: "radio",
                                            options: [
                                                { value: "CAD", label: "CAD" },
                                                { value: "USD", label: "USD" }
                                            ],
                                            wrapperClassName: "flex flex-col gap-4"
                                        },
                                        {
                                            name: "confirmation",
                                            type: "checkbox",
                                            label: "I am confirming that all the above information is correct. I understand and accept that any rates received are based on the information that has been provided.",
                                            labelClassName: "leading-normal",
                                            wrapperClassName: "flex items-start"
                                        }
                                    ]}
                                />
                            </div>
                        </section>

                        {/* Footer Buttons */}
                        <div className="pt-6 border-t flex justify-end items-center">
                            <Button onClick={onSubmit} className="bg-[#0070c0] hover:bg-[#005a9c] text-white px-8">
                                Request Quote
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </FormProvider>
    )
})

export default SendRequest
