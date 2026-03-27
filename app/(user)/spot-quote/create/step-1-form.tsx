// "use client"

// import { useFormContext } from "react-hook-form"
// import { QuoteSchemaTypes } from "@/lib/validations/quote/spot-quote-schema"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { SelectAddressBookModal } from "./Step1Form/Shipping/SelectAddressBookModal"
// import { ContactType } from "../../settings/(address-book)/types/addContact.types"
// import { GlobalForm } from "@/components/common/form/GlobalForm"
// import { FormSelect } from "@/components/common/forms/FormSelect"
// import { getAllPalletShippingLocationTypes, markContactAsRecent } from "@/api/services/address-book.api"
// import { useQuery } from "@tanstack/react-query"
// import { Loader } from "@/components/common/Loader"
// import { FormFieldWrapper } from "@/components/common/forms/FormFieldWrapper"
// import { useMarkContactAsRecent } from "./hooks"
// import { ShippingTypeSelector } from "./Step1Form/Shipping/ShippingTypeSelector"
// import { EquimentTypeSelector } from "./Step1Form/EquimentSelection/EquimentTypeSelector"
// import ContactInformation from "./Step1Form/ContactInformation/ContactInformation"
// import { ShippingAddressSection } from "./Step1Form/Shipping/ShippingAddressSection"


// export type ShipmentType = "LTL-Partial Truckload" | "Full Truck Load" | "Time Critical"
// export function Step1Form({ onNext }: { onNext: () => void }) {
//   const form = useFormContext<QuoteSchemaTypes>()
//   const {
//     register,
//     control,
//     formState: { errors, isValid },
//     trigger,
//     watch,
//     setValue,
//   } = form

//   const handleNext = async () => {
//     // const valid = await trigger()
//     // if (valid) onNext()
//     // else console.log("Validation Errors:", errors)
//     onNext()
//   }

//   const shipmentType = watch("shipmentType")
//   const setShipmentType = (type: ShipmentType) => {
//     setValue("shipmentType", type, { shouldValidate: true })
//   }

//   return (
//     <div className="space-y-6">
//       <ShippingTypeSelector shipmentType={shipmentType} setShipmentType={setShipmentType} errors={errors} />
//       <div className="flex flex-col md:flex-row gap-6">
//         <ShippingAddressSection shipmentType={shipmentType} type="shippingFrom" title="Shipping From" />
//         <ShippingAddressSection shipmentType={shipmentType} type="shippingTo" title="Shipping To" />
//       </div>
//       <EquimentTypeSelector
//         control={control}
//         errors={errors}
//         watch={watch}
//         shipmentType={shipmentType}
//       />
//       <ContactInformation onNext={handleNext} />
//     </div>
//   )
// }
