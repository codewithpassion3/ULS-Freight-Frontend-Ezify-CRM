import { Button } from "@/components/ui/button";
import FormField from "@/components/common/forms/FormField";
import { useForm } from "react-hook-form";

export default function UserSettings() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Company Profile Settings */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-base">User Profile Settings</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* <FormField
                        name="companyName"
                        label="Company Name"
                        register={register}
                    />

                    <FormField
                        name="contactName"
                        label="Name*"
                        register={register}
                    /> */}

                    {/* <FormField
                        name="industryType"
                        label="Industry Type"
                        register={register}
                    /> */}

                    {/* <FormField
                        name="email"
                        label="Email"
                        register={register}
                    /> */}

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

                <Button className="mt-4">
                    Save Details
                </Button>
            </div>
        </form>
    )
}