import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BadgeCheck, CheckCheck, ClipboardPen, Coins, TruckElectric } from "lucide-react";
import { ChevronUp } from "lucide-react";
import FormRadio from "@/components/common/form/fields/FormRadio";
// shipping rates table component
export default function ShippingRates() {
    return (
        <Accordion type="single" collapsible className="px-6 shadow-lg border border-border rounded-md bg-white dark:bg-card">
            <AccordionItem value="shippingRates" className="border-none">
                <AccordionTrigger className="group  hover:no-underline items-center cursor-pointer [&>svg]:hidden!">
                    <h2 className="font-semibold flex items-center gap-2 text-lg text-slate-800 dark:text-white">
                        <Coins />
                        Shipping Rates
                        <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </h2>
                </AccordionTrigger>
                <AccordionContent className="h-max">
                    {/* // 2 tabs Best Price and Quickest */}
                    <div className="flex items-center gap-2 w-full">
                        <div className="border border-primary bg-primary/10 rounded-md p-2 w-1/2">
                            {/* // tick badge icon */}
                            <div className="flex gap-2 items-center mb-2">
                                <BadgeCheck className="text-primary" />
                                Best Price:
                            </div>
                            <span className="text-primary font-bold">Cheapest Carrier Name</span>
                        </div>
                        <div className="border border-yellow-500 bg-yellow-500/10 rounded-md p-2 w-1/2">
                            {/* // tick badge icon */}
                            <div className="flex gap-2 items-center mb-2">
                                <TruckElectric className="text-yellow-500" />
                                Quickest:
                            </div>
                            <span className="text-yellow-500 font-bold">Fastest Carrier Name</span>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}