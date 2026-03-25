"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import FormField from "@/components/common/forms/FormField"
import { useUser } from "@/hooks/useUser"
import { Loader } from "@/components/common/Loader"
// import { Loader } from "lucide-react"

type SettingsFormValues = {
    companyName: string
    contactName: string
    industryType: string
    email: string
    phone: string
    ext?: string

    address: string
    address2: string
    unit: string
    postalCode: string
    city: string
    province: string
    country: string

    promotions: boolean
    systemUpdates: boolean
    newsletters: boolean
}

export default function GeneralSettings() {
    const { data: user, isLoading } = useUser()
    const { register, handleSubmit } = useForm<SettingsFormValues>({
        defaultValues: {
            companyName: user?.user?.company?.name ?? "",
            contactName: user?.user?.firstName ? user?.user?.firstName + " " + user?.user?.lastName : "",
            industryType: user?.user?.company?.industryType ?? "",
            email: user?.user?.email ?? "",
            phone: user?.user?.phoneNumber ?? "",
            ext: "",
            address: user?.user?.company?.address.address1 ?? "",
            address2: user?.user?.company?.address.address2 ?? "",
            unit: user?.user?.company?.address.unit ?? "",
            postalCode: user?.user?.company?.address.postalCode ?? "",
            city: user?.user?.company?.address.city ?? "",
            province: user?.user?.company?.address.state ?? "",
            country: user?.user?.company?.address.country ?? "",
            promotions: true,
            systemUpdates: true,
            newsletters: true
        }
    })

    const onSubmit = (data: SettingsFormValues) => {
        console.log(data)
    }
    return (
        <div className="max-w-6xl">
            <h2 className="text-xl font-semibold mb-6">General Settings</h2>

            {isLoading ?
                <Loader /> :
                <div className="flex flex-col gap-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                        {/* Company Profile Settings */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-base">Company Profile Settings</h2>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled
                                // className="text-sm text-primary hover:underline"
                                >
                                    Request Company Name Change
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <FormField
                                    name="companyName"
                                    label="Company Name"
                                    register={register}
                                />

                                <FormField
                                    name="contactName"
                                    label="Contact Name*"
                                    register={register}
                                />

                                <FormField
                                    name="industryType"
                                    label="Industry Type"
                                    register={register}
                                />

                                <FormField
                                    name="email"
                                    label="Email"
                                    register={register}
                                />

                                <FormField
                                    name="phone"
                                    label="Phone Number"
                                    register={register}
                                />

                                {/* <FormField
                                name="ext"
                                label="Ext."
                                register={register}
                            /> */}
                            </div>

                            <Button
                                disabled
                                className="mt-4">
                                Save Details
                            </Button>
                        </div>
                    </form>

                    {/* Company Address */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-base">Company Address</h2>
                            <Button
                                type="button"
                                variant="outline"
                                disabled
                            >
                                Request Company Address Change
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                            <FormField
                                name="address"
                                label="Address*"
                                register={register}
                            />

                            <FormField
                                name="address2"
                                label="Address 2 (optional)"
                                register={register}
                            />

                            <FormField
                                name="unit"
                                label="Unit/Floor #"
                                register={register}
                            />

                            <FormField
                                name="postalCode"
                                label="Postal Code"
                                register={register}
                            />

                            <FormField
                                name="city"
                                label="City"
                                register={register}
                            />

                            <FormField
                                name="province"
                                label="Province"
                                register={register}
                            />

                            <FormField
                                name="country"
                                label="Country"
                                register={register}
                            />

                        </div>
                    </div>

                    {/* Account Overview */}
                    <div>
                        <h2 className="font-semibold text-base mb-4">Account Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 text-sm text-muted-foreground">
                            <p><span className="font-medium text-foreground">Account Status:</span> Active</p>
                            <p><span className="font-medium text-foreground">ULS Freight Member Since:</span> Sep 20, 2022</p>
                            <p><span className="font-medium text-foreground">Payment Type:</span> Account Balance</p>
                            <p><span className="font-medium text-foreground">Last Ship Date:</span> Mar 4, 2026</p>
                            <p><span className="font-medium text-foreground">Last Payment Received:</span> Feb 25, 2026</p>
                            <p><span className="font-medium text-foreground">My Account Rep:</span> Roy Koshy 10</p>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div>
                        <h2 className="font-semibold text-base mb-4">General Notifications</h2>

                        <div className="space-y-3">

                            <div className="flex items-center gap-2">
                                <Checkbox {...register("promotions")} />
                                <span className="text-sm">ULS Freight Promotions</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox {...register("systemUpdates")} />
                                <span className="text-sm">ULS Freight System Updates</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox {...register("newsletters")} />
                                <span className="text-sm">ULS Freight Newsletters</span>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}