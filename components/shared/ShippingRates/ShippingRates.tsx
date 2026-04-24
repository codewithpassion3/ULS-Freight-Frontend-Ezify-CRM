import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BadgeCheck, CheckCheck, ClipboardPen, Coins, TruckElectric } from "lucide-react";
import { ChevronUp } from "lucide-react";
import FormRadio from "@/components/common/form/fields/FormRadio";
import { useMutation } from "@tanstack/react-query";
import { getShipmentRates } from "@/api/services/shipment.api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
// shipping rates table component
export default function ShippingRates({
    dimensions,
    fromAddress,
    toAddress
}: {
    dimensions: any
    fromAddress: any
    toAddress: any
}) {
    console.log("dimensions", dimensions)
    console.log("fromAddress", fromAddress)
    console.log("toAddress", toAddress)
    const payload =
    {
        "quoteType": "STANDARD",
        "fedex": {
            "from": {
                "postalCode": "38117",
                "countryCode": "US"
            },
            "to": {
                "postalCode": "90210",
                "countryCode": "US"
            }
        },
        "tst": {
            "from": {
                "name": "ULS Freight",
                "address": "123 Main St",
                "postalCode": "M5V3A8",
                "city": "Toronto",
                "state": "ON"
            },
            "to": {
                "name": "ULS Freight",
                "address": "456 Hollywood Blvd",
                "postalCode": "48226",
                "city": "Detroit",
                "state": "MI"
            }
        },
        "pickupType": "DROPOFF_AT_FEDEX_LOCATION",
        "rateRequestType": ["LIST"],
        "serviceType": "FEDEX_EXPRESS_SAVER",
        "packages": [{
            "weightUnit": "LB",
            "weight": 10,
            "dimensionsUnit": "IN",
            "length": 20,
            "width": 20,
            "height": 40,
            "handlingUnits": 1,
            "packaging": "BOX"
        }]
    }
    const mutation = useMutation({
        mutationFn: (payload: any) => getShipmentRates(payload),
        onSuccess: () => {
            toast.success("Shipment rates fetched successfully")
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })
    async function streamRates(dto: any) {
        const response = await fetch('/shipment-carrier/rates/stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dto),
        });

        const reader = response?.body?.getReader() as any;
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader?.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(l => l.startsWith('data:'));

            for (const line of lines) {
                const result = JSON.parse(line.replace('data: ', ''));

                if (result.error) {
                    console.error(`${result.carrier} failed:`, result.error);
                    continue;
                }

                // Render as each arrives
                //             if (result.carrier === 'fedex') {
                //                 renderFedExQuote(result.quotes);
                //             } else if (result.carrier === 'tst') {
                //                 renderTSTQuote(result.quotes);
                //             }
                // print result
                console.log("result", result.quotes)
            }
        }
    }
    // useEffect(() => {
    //     mutation.mutate(payload)
    //     streamRates(payload)
    // }, [])
    // const renderFedExQuote = (quotes: any[]) => {
    //     // render fedex quotes here
    //     {


    // const renderTSTQuote = (quotes: any[]) => {
    //     // render tst quotes here
    // }
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
                    {/* render quotes here */}
                    {/* <ShippingRatesTable /> */}
                    {/* get rates button */}
                    <Button onClick={() => mutation.mutate(payload)} className="mt-3">
                        Get Rates
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}