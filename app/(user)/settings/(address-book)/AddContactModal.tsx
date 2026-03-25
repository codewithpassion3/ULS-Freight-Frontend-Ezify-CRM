"use client";
import { createContact } from "@/api/services/quotes.api"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ContactForm } from "./components/ContactForm"
import { mapFormToPayload } from "./mappers/contact.mapper"
import { ContactFormValues } from "./schemas/addContact.schema"
import { ContactType } from "./types/addContact.types"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserSquare2 } from "lucide-react";

export function AddContactModal() {
    const [open, setOpen] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: ContactType) => createContact(data),
        onSuccess: () => {
            toast.success("Contact added successfully")
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ["contacts"] })
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })

    const handleSubmit = (data: ContactFormValues) => {
        const payload = mapFormToPayload(data)
        mutation.mutate(payload)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                    <ContactForm
                        onSubmit={handleSubmit}
                        isLoading={mutation.isPending}
                        open={open}
                        setOpen={setOpen}
                        setIsValid={setIsValid}
                    />
                </ScrollArea>
                <DialogFooter className="px-6 py-4 border-t border-border bg-muted/20 sm:justify-start gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className="w-[120px]">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={!isValid || mutation.isPending} type="submit" form="contact-form" className="bg-[#0070c0] hover:bg-[#005999] text-white w-[140px]">
                        Save Contact
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}