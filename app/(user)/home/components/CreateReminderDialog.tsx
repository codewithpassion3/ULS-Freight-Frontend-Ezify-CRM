import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BellRing, CalendarDays } from "lucide-react"

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

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ReminderFormValues>({
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

    const onSubmit = (data: ReminderFormValues) => {
        console.log("Reminder Created:", data)
        setIsOpen(false)
        reset()
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            reset()
        }
    }

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

                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    <div className="space-y-6">
                        
                        {/* Recipients */}
                        <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Send Reminder to</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6">
                                <Controller
                                    name="recipients"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            {RECIPIENTS.map((recipient) => (
                                                <div key={recipient} className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={`recipient-${recipient}`}
                                                        checked={field.value.includes(recipient)}
                                                        onCheckedChange={(checked) => {
                                                            const updated = checked
                                                                ? [...field.value, recipient]
                                                                : field.value.filter((val) => val !== recipient)
                                                            field.onChange(updated)
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={`recipient-${recipient}`}
                                                        className="text-sm text-slate-600 dark:text-slate-400 font-medium cursor-pointer"
                                                    >
                                                        {recipient}
                                                    </label>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                />
                            </div>
                            {errors.recipients && <p className="text-sm text-red-600 mt-2">{errors.recipients.message}</p>}
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Set Reminder Date*</label>
                                <div className="flex">
                                    <Input 
                                        type="date" 
                                        {...register("date")} 
                                        className="rounded-r-none focus-visible:ring-0 focus-visible:border-[#0072BC]"
                                    />
                                    <div className="bg-[#0072BC] px-3 flex items-center justify-center rounded-r border border-[#0072BC]">
                                        <CalendarDays className="size-5 text-white" />
                                    </div>
                                </div>
                                {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Set Reminder Time*</label>
                                <div className="flex items-center gap-2">
                                    <Input 
                                        {...register("hour")} 
                                        maxLength={2} 
                                        className="w-14 text-center focus-visible:ring-0 focus-visible:border-[#0072BC] bg-transparent" 
                                    />
                                    <span className="font-bold text-slate-600 dark:text-slate-400">:</span>
                                    <Input 
                                        {...register("minute")} 
                                        maxLength={2} 
                                        className="w-14 text-center focus-visible:ring-0 focus-visible:border-[#0072BC] bg-transparent" 
                                    />
                                    <Controller
                                        control={control}
                                        name="period"
                                        render={({ field }) => (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-[60px] border-[#0072BC] text-[#0072BC] font-bold hover:bg-[#dbeaf4]"
                                                onClick={() => field.onChange(field.value === "AM" ? "PM" : "AM")}
                                            >
                                                {field.value}
                                            </Button>
                                        )}
                                    />
                                </div>
                                {(errors.hour || errors.minute) && <p className="text-sm text-red-600 mt-1">Invalid time format</p>}
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Reminder Title*</label>
                            <Input 
                                {...register("title")} 
                                className="focus-visible:ring-0 focus-visible:border-[#0072BC] max-w-sm bg-transparent" 
                            />
                            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                                Reminder Message *
                            </label>
                            <Textarea 
                                {...register("message")} 
                                className="min-h-[120px] resize-none focus-visible:ring-0 focus-visible:border-[#0072BC] bg-transparent" 
                            />
                            {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
                        </div>


                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
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
            </DialogContent>
        </Dialog>
    )
}
