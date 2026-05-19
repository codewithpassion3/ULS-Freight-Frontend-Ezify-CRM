// components/invoice/additional-charges-accordion.tsx

"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type Charge = {
    id: string;
    chargeType: string;
    amount: number;
    currency?: string;
    comment?: string;
};

type AdditionalChargesAccordionProps = {
    charges: Charge[];
    title?: string;
};

export function AdditionalChargesAccordion({
    charges,
    title = "New Charges",
}: AdditionalChargesAccordionProps) {
    const total = charges.reduce((acc, item) => acc + item.amount, 0);

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="additional-charges" className="border-none">
                <AccordionTrigger className="py-1 hover:no-underline">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="text-blue-600 font-medium">{title}</span>

                        <span className="font-medium">
                            ${total.toFixed(2)} CAD
                        </span>
                    </div>
                </AccordionTrigger>

                <AccordionContent>
                    <div className="border rounded-md overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-2 bg-muted px-4 py-3 text-sm font-medium border-b">
                            <div>Charge Type</div>
                            <div className="text-right">Amount</div>
                        </div>

                        {/* Rows */}
                        {charges.map((charge, index) => (
                            <div key={charge.id}>
                                <div className="grid grid-cols-2 px-4 py-3 text-sm">
                                    <div>{charge.chargeType}</div>

                                    <div className="text-right">
                                        ${charge.amount.toFixed(2)}{" "}
                                        {charge.currency || "CAD"}
                                    </div>
                                </div>

                                {/* Comment */}
                                {charge.comment && (
                                    <div className="px-4 pb-3 text-xs text-muted-foreground">
                                        <span className="font-medium">Comment:</span>{" "}
                                        {charge.comment}
                                    </div>
                                )}

                                {index !== charges.length - 1 && (
                                    <div className="border-b" />
                                )}
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}