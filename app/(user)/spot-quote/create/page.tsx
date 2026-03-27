// "use client"

// import { useState } from "react"
// import { useForm, FormProvider } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { quoteSchema } from "@/lib/validations/quote/spot-quote-schema"
// import { Step1Form } from "./step-1-form"
// import { Step2Form } from "./step-2-form"
// import { Eye, Truck } from "lucide-react"
// import { SideBar } from "./Step1Form/SideBar"

// export default function CreateSpotQuotePage() {
//   const [currentStep, setCurrentStep] = useState(1)

//   const methods = useForm({
//     resolver: zodResolver(quoteSchema),
//     defaultValues: {
//       shipmentType: "LTL-Partial Truckload",
//       shippingFrom: {
//         multiplePickupLocations: false,
//         address1: "",
//         postalCode: "",
//         city: "",
//         province: "",
//         country: "",
//         locationType: "",
//         additionalNotes: "",
//       },
//       shippingTo: {
//         multipleDeliveryLocations: false,
//         address1: "",
//         postalCode: "",
//         city: "",
//         province: "",
//         country: "Canada",
//         locationType: "",
//         additionalNotes: "",
//       },
//       equipment: {

//         refrigeratedType: undefined,
//         inBond: false,
//         protectFromFreeze: false,
//         limitedAccess: false,
//         dangerousGoods: false,
//         allPalletsStackable: false,
//         somePalletsStackable: false,
//       },
//       dimensionsAndWeight: {
//         quantity: "1",
//         unitSystem: "Imperial",
//         pallets: [
//           {
//             length: "",
//             width: "",
//             height: "",
//             weight: "",
//             freightClass: "",
//             nmfc: "",
//             type: "Pallet",
//             unitsOnPallet: "",
//           },
//         ],
//         description: "",
//         dangerousGoods: false,
//         stackable: false,
//       },
//       additionalServicesForPallets: {
//         limitedAccess: false,
//         appointmentDelivery: false,
//         thresholdDelivery: false,
//         thresholdPickup: false,
//         inBond: false,
//         protectFromFreeze: false,
//         tradeShowDelivery: false,
//         amazonFBADelivery: false,
//         refrigeratedServices: false,
//       },
//       additionalInsurance: {
//         totalCostValue: 0,
//         currency: "CAD",
//       },
//       contactInformation: {
//         contactName: "",
//         phoneNumber: "",
//         ext: "",
//         shipDate: "",
//         emailAddress: "",
//         spotQuoteName: "",
//       }
//     },
//     mode: "onTouched",
//   })

//   const onSubmit = (data: unknown) => {
//     console.log("Form Submitted:", data)
//     alert("Quote submitted successfully! Check console for details.")
//   }

//   const handleFullSubmit = () => methods.handleSubmit(onSubmit)()

//   return (
//     <div className="container mx-auto py-8 px-4 max-w-7xl">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Create New Spot Quote</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         <div className="lg:col-span-3">
//           <FormProvider {...methods}>
//             <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
//               {currentStep === 1 && (
//                 <Step1Form onNext={() => setCurrentStep(2)} />
//               )}
//               {currentStep === 2 && (
//                 <Step2Form
//                   onPrev={() => setCurrentStep(1)}
//                   onSubmit={handleFullSubmit}
//                 />
//               )}
//             </form>
//           </FormProvider>
//         </div>

//         {/* Sidebar */}
//         <SideBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
//       </div>
//     </div>
//   )
// }

// function Save({ size }: { size: number }) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
//   )
// }
