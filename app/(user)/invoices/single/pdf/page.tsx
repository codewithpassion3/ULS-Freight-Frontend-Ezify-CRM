"use client"

import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { useEffect } from "react"

export default function InvoicePdfPage() {
    const searchParams = useSearchParams()
    const invoiceId = searchParams.get("id") || "FC15017348"

    useEffect(() => {
        // Automatically open print dialog when the page loads
        const timer = setTimeout(() => {
            window.print()
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="bg-white text-black min-h-screen p-8 max-w-[850px] mx-auto font-sans text-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center">
                    {/* Assuming logo exists, falling back to text if not or using next/image with placeholder */}
                    <img
                        src="https://live.ulsfreight.ca/e-north-logo.svg"
                        alt="ULS Logo"
                        style={{ width: 150, height: 40, objectFit: "contain" }}
                    />
                </div>
                <div className="text-xl">
                    <span className="font-normal">Invoice # / # de facture : </span>
                    <span className="font-bold">{invoiceId}</span>
                </div>
            </div>

            {/* Billing Info */}
            <div className="flex justify-between mb-8 text-sm">
                <div>
                    <div className="text-gray-600 mb-1">Bill to / Facturer à :</div>
                    <div className="font-medium">ENorth Logistics Inc</div>
                    <div>2960 Drew Rd Suite 156</div>
                    <div>Mississauga, ON, L4T0A5, CA</div>
                    <div>2893241968</div>
                </div>
                <div className="text-right flex flex-col gap-1">
                    <div className="flex justify-end gap-2">
                        <span className="text-gray-600">Invoice Date / Date de facture :</span>
                        <span className="font-medium w-28 text-left">Apr 12, 2026</span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <span className="text-gray-600">Payment Due / Paiement dû :</span>
                        <span className="font-medium w-28 text-left">May 12, 2026</span>
                    </div>
                    <div className="flex justify-end gap-2">
                        <span className="text-gray-600">Amount Due / Montant dû :</span>
                        <span className="font-bold w-28 text-left">$216.52 CAD</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="mb-6">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#d2e3f0] text-xs">
                        <tr>
                            <th className="py-2 px-3 font-normal"># of Shipments /<br /># d'envois</th>
                            <th className="py-2 px-3 font-normal">Freight Charges /<br />Frais de transport</th>
                            <th className="py-2 px-3 font-normal">Fuel Charges /<br />Frais de carburant</th>
                            <th className="py-2 px-3 font-normal">Accessorials /<br />Accessoires</th>
                            <th className="py-2 px-3 font-normal">Taxes</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm border-b border-gray-300">
                        <tr>
                            <td className="py-3 px-3">1</td>
                            <td className="py-3 px-3">$105.48</td>
                            <td className="py-3 px-3">$41.03</td>
                            <td className="py-3 px-3">$70.01</td>
                            <td className="py-3 px-3">$0.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-16 text-sm">
                <div className="w-[350px]">
                    <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Invoice Subtotal / Sous-total de la facture :</span>
                        <span>$216.52</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Total Amount Paid / Montant total payé :</span>
                        <span>$0.00</span>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>
                    <div className="flex justify-between mb-1">
                        <span className="text-gray-600 font-medium">Invoice Total/Total de la facture :</span>
                        <span className="font-bold">$216.52</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Total Amount Due / Montant total dû :</span>
                        <span className="font-bold">$216.52 CAD</span>
                    </div>
                </div>
            </div>

            {/* Thank you */}
            <div className="text-center mb-16 text-lg font-bold text-gray-800">
                <div className="mb-1">We appreciate your business. Thank you!</div>
                <div>Nous apprécions votre clientèle. Merci !</div>
            </div>

            {/* Remit Payment */}
            <div className="mb-6 text-xs">
                <div className="text-gray-500 mb-2">Remit Payment to / Remettre le paiement à :</div>
                <div className="flex justify-between pr-20">
                    <div>
                        <div className="font-medium text-gray-800">Canadian Mailing Address / Adresse postale canadienne</div>
                        <div className="text-gray-600">77 Pillsworth Ave, Unit #1</div>
                        <div className="text-gray-600">Bolton, ON, L7E 4G4</div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-800">American Mailing Address / Adresse postale américaine</div>
                        <div className="text-gray-600">9220 Bass Lake Road, Suite 302</div>
                        <div className="text-gray-600">New Hope, MN, 55428</div>
                    </div>
                </div>
            </div>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-4 gap-2 text-[10px] text-gray-500 mb-4 border-t border-b border-gray-200 py-3">
                <div>
                    <div>Email for General Inquiries</div>
                    <div>Courriel pour les questions généraux</div>
                    <div className="font-medium text-gray-700">accounting@ulsfreight.com</div>
                </div>
                <div>
                    <div>Canadian Phone Number</div>
                    <div>Numéro de téléphone canadien</div>
                    <div className="font-medium text-gray-700">(289) 371-1005</div>
                </div>
                <div>
                    <div>Toll Free Phone Number</div>
                    <div>Numéro de téléphone sans frais</div>
                    <div className="font-medium text-gray-700">(877) 335-8740</div>
                </div>
                <div>
                    <div>American Phone Number</div>
                    <div>Numéro de téléphone américain</div>
                    <div className="font-medium text-gray-700">(718) 535-3358</div>
                </div>
            </div>

            {/* Tax Numbers */}
            <div className="flex justify-between text-xs text-gray-500 mb-4 border-b border-gray-200 pb-3 font-medium">
                <div>GST Number / Numéro de TPS: 824126650 RT0001</div>
                <div>QST Number / Numéro de TVQ: 1220736560 TQ0001</div>
            </div>

            {/* Terms */}
            <div className="text-[9px] text-gray-400 leading-tight mb-8">
                <div className="font-bold mb-1">Terms & Conditions / Conditions générales</div>
                <p>
                    1. You have thirty (30) days from the Invoice Date above to dispute charges on this invoice after which date you will be deemed to have waived your right to dispute these charges. 2. Please pay the Amount Due in full by the Payment Due date stated above before initiating any invoice dispute or any claim with ENorth Logistics Inc. to avoid service interruptions. In the event your invoice dispute or claim is approved of by ENorth Logistics Inc., such approved amounts will be credited or remitted to you. 3. For further details regarding payment terms, please refer to the Terms of Service on your account details dashboard. / 1. Vous disposez de trente (30) jours à compter de la date de facturation ci-dessus pour contester les frais figurant sur cette facture, date après laquelle vous serez réputé avoir renoncé à votre droit de contester ces frais. 2. Veuillez payer le montant dû dans son intégralité à la date d'échéance du paiement indiquée ci-dessus avant d'entamer toute contestation de facture ou toute réclamation auprès de ENorth Logistics Inc. afin d'éviter toute interruption de service. Dans le cas où votre contestation de facture ou votre réclamation est approuvée par ENorth Logistics Inc., les montants approuvés vous seront crédités ou remis. 3. Pour plus de détails concernant les conditions de paiement, veuillez vous référer aux Conditions de service sur le tableau de bord des détails de votre compte.
                </p>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 font-medium pb-8">
                Page 1 of 2 / Page 1 de 2
            </div>

            {/* Print Styling */}
            <style jsx global>{`
                @media print {
                    body {
                        background-color: white !important;
                    }
                    @page { margin: 0; size: auto; }
                    /* Hide header/footer generated by browser if possible */
                }
            `}</style>
        </div>
    )
}
