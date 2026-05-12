import Image from 'next/image';
import type { CarrierResult } from '../shippinRates.types';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';

interface CarrierCardProps {
    result: CarrierResult;
    index: number;
    setSelectedCarrier: (carrier: string) => void;
    selectedCarrier: any;
}

export function CarrierCard({ result, index, selectedCarrier, setSelectedCarrier }: CarrierCardProps) {
    const isError = result.error !== null;
    const quotes = JSON.stringify(result.quotes);
    const carrierName = result?.carrier || null;

    console.log(result);
    return (

        <>

            {isError ? (
                // <TableRow>
                //     <TableCell colSpan={5}>
                //         <code className="text-red-500 text-sm">
                //             {result.error}
                //         </code>
                //     </TableCell>
                // </TableRow>
                ""
            ) : result?.quotes?.length ? (
                result.quotes.map((quote: any, index: number) => (
                    <TableRow key={index} className={selectedCarrier?.carrier === quote.carrier ? "border-primary bg-primary/10" : ""}>
                        {/* Carrier */}
                        <TableCell>
                            <div className="h-16 w-16 flex items-center justify-center">
                                {carrierName === "fedex" ? (
                                    <Image
                                        src="/FedExFreight.svg"
                                        width={80}
                                        height={80}
                                        alt="FedEx"
                                    />
                                ) : (
                                    <Image
                                        src="/tst.png"
                                        width={80}
                                        height={80}
                                        alt="TST"
                                    />
                                )}
                            </div>
                        </TableCell>

                        {/* Service */}
                        <TableCell>
                            {quote?.serviceName || "N/A"}
                        </TableCell>

                        {/* EST Time */}
                        <TableCell>
                            {quote?.estimatedDeliveryDays || "—"}
                        </TableCell>

                        {/* Shipping Rate */}
                        <TableCell>
                            {quote?.totalPrice
                                ? `${quote.currency} ${quote.totalPrice}`
                                : "—"}

                        </TableCell>

                        {/* Action */}
                        <TableCell className="cursor-pointer" >
                            <Button
                                variant={selectedCarrier?.carrier === quote.carrier ? "default" : "outline"}
                                onClick={() => {
                                    setSelectedCarrier(quote)
                                }}
                            >
                                {selectedCarrier?.carrier === quote.carrier ? "Selected" : "Select"}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                // 🟡 Empty / loading state
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                        No rates available
                    </TableCell>
                </TableRow>
            )}

        </>
    );
}