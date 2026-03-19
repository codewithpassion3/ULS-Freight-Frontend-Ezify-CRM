"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { quoteSchema } from "@/lib/validations/quote/quote-schema"
import { Step1Form } from "./step-1-form"
import { Step2Form } from "./step-2-form"
import { Eye, Bell, Truck } from "lucide-react"

export default function CreateSpotQuotePage() {
  const [currentStep, setCurrentStep] = useState(1)

  const methods = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      shipmentType: "LTL-Partial Truckload",
      shippingFrom: {
        address1: "",
        postalCode: "",
        city: "",
        province: "",
        country: "Canada",
        locationType: "",
        additionalNotes: "",
      },
      shippingTo: {
        address1: "",
        postalCode: "",
        city: "",
        province: "",
        country: "Canada",
        locationType: "",
        additionalNotes: "",
      },
      equipment: {
        type: "Dry Van",
        inBond: false,
        protectFromFreeze: false,
        limitedAccess: false,
      },
      dimensionsAndWeight: {
        quantity: "1",
        unitSystem: "Imperial",
        pallets: [
          {
            length: "",
            width: "",
            height: "",
            weight: "",
            freightClass: "",
            nmfc: "",
            type: "Pallet",
            unitsOnPallet: "",
          },
        ],
        description: "",
        dangerousGoods: false,
        stackable: false,
      },
      additionalServicesForPallets: {
        limitedAccess: false,
        appointmentDelivery: false,
        thresholdDelivery: false,
        thresholdPickup: false,
        inBond: false,
        protectFromFreeze: false,
        tradeShowDelivery: false,
        amazonFBADelivery: false,
        refrigeratedServices: false,
      },
      additionalInsurance: {
        totalCostValue: 0,
        currency: "CAD",
      }
    },
    mode: "onTouched",
  })

  const onSubmit = (data: unknown) => {
    console.log("Form Submitted:", data)
    alert("Quote submitted successfully! Check console for details.")
  }

  const handleFullSubmit = () => methods.handleSubmit(onSubmit)()

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Spot Quote</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
              {currentStep === 1 && (
                <Step1Form onNext={() => setCurrentStep(2)} />
              )}
              {currentStep === 2 && (
                <Step2Form 
                  onPrev={() => setCurrentStep(1)} 
                  onSubmit={handleFullSubmit}
                />
              )}
            </form>
          </FormProvider>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="border border-border p-5 rounded-md sticky top-6 bg-white dark:bg-card space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-semibold text-lg">{currentStep === 1 ? 'Shipment Overview' : 'Quote Overview'}</h2>
              {currentStep === 1 && <span className="text-primary text-sm flex items-center gap-1 cursor-pointer hover:underline"><Eye size={14}/> Hide</span>}
            </div>
            
            <div className="relative pt-2 pl-2">
              {/* Stepper Lines connecting steps */}
              <div className="absolute left-4 top-5 bottom-8 w-px bg-gray-200 dark:bg-gray-800 z-0 hidden lg:block"></div>
              
              <div className="space-y-6 relative z-10">
                <div className={`flex items-center gap-3 ${currentStep >= 1 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${currentStep === 1 ? 'bg-primary text-white' : 'border-2 border-primary text-primary bg-white'}`}>
                    {currentStep > 1 ? '✓' : '➔'}
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <span>{currentStep === 1 ? 'Step 1: Shipping Details' : 'Shipping Details'}</span>
                    {currentStep > 1 && <span className="text-xs text-muted-foreground cursor-pointer hover:underline" onClick={() => setCurrentStep(1)}>View</span>}
                  </div>
                </div>

                <div className={`flex items-center gap-3 ${currentStep >= 2 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  <div className={`w-5 h-5 flex shrink-0 items-center justify-center ${currentStep === 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                    {currentStep === 2 ? 
                      <div className="bg-primary text-white rounded-md p-1"><span className="text-xs">➔</span></div> : 
                      <div className="border border-muted-foreground/30 text-muted-foreground/30 rounded-md p-1 bg-white dark:bg-transparent"><span className="text-xs">Step 2</span></div>
                    }
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <span>{currentStep === 1 ? 'Step 2: Dimensions & Weight' : 'Packaging Details'}</span>
                    {currentStep > 2 && <span className="text-xs text-muted-foreground cursor-pointer hover:underline">View</span>}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground/50">
                  <div className="w-5 h-5 border border-muted-foreground/30 text-muted-foreground/30 rounded-md p-1 bg-white dark:bg-transparent flex items-center justify-center">
                    <span className="text-xs">💰</span>
                  </div>
                  <span>{currentStep === 1 ? 'Step 3: Send Request' : 'Shipping Rates'}</span>
                </div>

                <div className="flex items-center gap-3 text-primary pt-4 cursor-pointer hover:underline">
                  <Save size={16} />
                  <span>Save For Later</span>
                </div>
              </div>
            </div>
            
            {/* Banner present in Image 1 */}
             {currentStep === 2 && (
              <div className="mt-8 bg-amber-100 p-4 rounded-md">
                <div className="bg-white rounded max-w-min whitespace-nowrap px-2 py-0.5 text-xs font-bold border border-amber-300 mb-2">DDP Available</div>
                <div className="flex items-center gap-2 justify-center py-4 px-2">
                  <span className="text-muted-foreground cursor-pointer">‹</span>
                  <div className="text-center text-sm font-medium">
                     <div className="flex justify-center mb-2 items-center font-bold text-slate-800 gap-1"><span className="text-blue-600 bg-slate-800 rounded-sm p-0.5"><Truck size={12}/></span> FREIGHTCOM</div>
                     Simplify cross-border shipping with all duties and taxes handled upfront. No surprises, no hidden costs.
                  </div>
                  <span className="text-muted-foreground cursor-pointer">›</span>
                </div>
              </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Save({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  )
}
