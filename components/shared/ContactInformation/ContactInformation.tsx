import { forwardRef, useImperativeHandle } from "react";
import { GlobalForm } from "@/components/common/form/GlobalForm";
import { FormProvider, useForm } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ListTodo } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
// import { QuoteType } from "@/types/quote/quote.types";
import { QuoteTypes } from "../DynamicQuote/DynamicQuote";


const ContactInformation = forwardRef(({ quoteType }: { quoteType: QuoteTypes }, ref: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm({
        defaultValues: {
            spotContact: {
                contactName: "",
                phoneNumber: "",
                shipDate: "",
                emailAddress: "",
                spotQuoteName: "",
            },
        },
    })

    useImperativeHandle(ref, () => ({
        getValues: form.getValues,
        trigger: form.trigger
    }))

    return (
        <Accordion type="single" collapsible value={isOpen ? "insurance" : ""} onValueChange={(val) => setIsOpen(!!val)} className="shadow-lg border border-border rounded-md bg-white dark:bg-card">
            <AccordionItem value="insurance" className="border-none">
                <AccordionTrigger className="group px-6 py-4 hover:no-underline items-center cursor-pointer [&>svg]:hidden!" >
                    <h2 className="font-semibold flex items-center gap-2 text-lg text-slate-700 dark:text-white ">
                        <ListTodo />
                        Contact Information
                        <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </h2>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-6 h-full">

                    <FormProvider {...form}>
                        <form>
                            <GlobalForm
                                formWrapperClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                fields={[
                                    {
                                        name: "spotContact.contactName",
                                        label: "Contact Name *",
                                        type: "text",
                                        placeholder: "Contact Name",

                                    },
                                    {
                                        name: "spotContact.phoneNumber",
                                        label: "Phone Number*",
                                        type: "phone",
                                        placeholder: "Phone Number",
                                    },
                                    {
                                        name: "spotContact.shipDate",
                                        label: "Ship Date*",
                                        type: "date",
                                        placeholder: "Ship Date",
                                    },
                                    {
                                        name: "spotContact.email",
                                        label: "Email Address*",
                                        type: "email",
                                        placeholder: "Email Address",
                                    },
                                    {
                                        name: "spotContact.spotQuoteName",
                                        label: "Spot Quote Name (optional)",
                                        type: "text",
                                        placeholder: "Spot Quote Name",
                                    },
                                ]}
                            />
                        </form>
                    </FormProvider>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
})

export default ContactInformation;