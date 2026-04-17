import React, { useState } from "react"
import { useForm, Controller, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BellRing, CalendarDays } from "lucide-react"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth.context"

const RECIPIENTS = [
    "Myself",
    "Accounting ULS",
    "Alex John",
    "Allen Whales",
    "Anmol Verma",
    "Moazzam Muhammad",
    "William Nash"
]

const reminderSchema = z.object({
    recipients: z.array(z.string()).min(1, { message: "Select at least one recipient" }),
    date: z.string().min(1, { message: "Reminder Date is required" }),
    hour: z.string().regex(/^(0?[1-9]|1[0-2])$/, "Invalid hour"),
    minute: z.string().regex(/^([0-5]?[0-9])$/, "Invalid minute"),
    period: z.enum(["AM", "PM"]),
    title: z.string().min(1, { message: "Reminder Title is required" }),
    message: z.string().min(1, { message: "Reminder Message is required" })
})

type ReminderFormValues = z.infer<typeof reminderSchema>

interface Props {
    children: React.ReactNode
}

export function CreateReminderDialog({ children }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const methods = useForm<ReminderFormValues>({
        resolver: zodResolver(reminderSchema),
        defaultValues: {
            recipients: [],
            date: "",
            hour: "12",
            minute: "00",
            period: "PM",
            title: "",
            message: ""
        }
    })

    // get reciepients list from user
    const { user } = useAuth()
    console.log(user.team)
    const onSubmit = (data: ReminderFormValues) => {
        console.log("Reminder Created:", data)
        setIsOpen(false)
        methods.reset()
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            methods.reset()
        }
    }
    const recipients = methods.watch("recipients")
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden font-sans dark:bg-slate-950 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                <DialogHeader className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
                        <BellRing className="size-6 text-slate-800 dark:text-slate-100" />
                        Create Reminder
                    </DialogTitle>
                </DialogHeader>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
                        {/* map recipient as checkbox */}
                        <div className="flex flex-wrap gap-8">
                            {user?.user?.teamMembers?.map((member: any) => (
                                <div key={member.id} className="flex items-center gap-2">
                                    <Checkbox
                                        id={member.id}
                                        name="recipients"
                                        checked={recipients.includes(member.id)}
                                        onCheckedChange={(checked) => {
                                            const current = recipients
                                            if (checked) {
                                                methods.setValue("recipients", [...current, member.id])
                                            } else {
                                                methods.setValue("recipients", current.filter((item) => item !== member.id))
                                            }
                                        }}
                                        className="border-border cursor-pointer"
                                    />
                                    <Label htmlFor={member.id} className="cursor-pointer">
                                        {user?.user?.id === member.id ? "Me" : member.firstName}{" "}{member.lastName}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <GlobalForm
                            formWrapperClassName="grid grid-cols-2 gap-4 mt-4"
                            fields={
                                [
                                    {
                                        name: "date",
                                        type: "date",
                                        label: "Reminder Date",
                                        placeholder: "Enter reminder date",
                                    },
                                    {
                                        name: "time",
                                        type: "time",
                                        label: "Reminder Time",
                                        placeholder: "Enter reminder time",
                                        hourName: "hour",
                                        minuteName: "minute",
                                        ampmName: "amPm",
                                    },
                                    {
                                        name: "title",
                                        type: "text",
                                        label: "Reminder Title",
                                        placeholder: "Enter reminder title",
                                        wrapperClassName: "col-span-2",
                                        className: "w-1/2",
                                    },
                                    {
                                        name: "message",
                                        type: "textarea",
                                        label: "Reminder Message",
                                        placeholder: "Enter reminder message",
                                        wrapperClassName: "col-span-2",
                                    },


                                ]}
                        />

                        {/* Footer Actions */}
                        < div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800" >
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="w-28 font-semibold border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 dark:bg-transparent"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#0072BC] hover:bg-[#005f9e] text-white font-semibold flex-1 max-w-[180px]"
                            >
                                Create Reminder
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog >
    )
}
