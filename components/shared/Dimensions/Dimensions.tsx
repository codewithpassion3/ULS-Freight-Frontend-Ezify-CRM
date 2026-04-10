"use client"
import { forwardRef, useImperativeHandle, useState } from "react"
import { FormProvider } from "react-hook-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Cuboid, ChevronUp, Info, PackageCheck } from "lucide-react"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import DangerousGoodsForm from "./DangerousGoodDetails"
import { useDimensions } from "./Dimensions.hooks"
import { DimensionsMeasurementControls } from "./DimensionsMesurementControls"
import { PackageRow } from "./PackageRow"
import { DimensionsFooter } from "./DimensionsFooter"
import type { ShipmentOptions } from "../DynamicQuote/DynamicQuote"
import { usePathname } from "next/navigation"

const Dimensions = forwardRef(({ shipmentType }: { shipmentType: ShipmentOptions[keyof ShipmentOptions] }, ref) => {
  const { methods, fieldArray, handleAddPackage, handleClearDimensions } = useDimensions(shipmentType)
  const { watch } = methods
  const { fields, append, remove } = fieldArray

  const [isOpen, setIsOpen] = useState(false)
  const [packageDialogOpen, setPackageDialogOpen] = useState(false)
 // isShipment
 const pathname = usePathname()
 const isShipment = pathname.includes("shipment")
  useImperativeHandle(ref, () => ({
    getValues: methods.getValues,
    setValues: (vals: any) => methods.reset({ ...vals }),
    trigger: methods.trigger,
    open: () => setIsOpen(true),
  }), [methods])

  // show error
  const { formState: { errors } } = methods
  console.log("parent errors", errors)

  // values
  console.log("values", methods.getValues())


  const handleQuantityChange = (targetCount: number) => {
    const currentCount = fields.length
    if (targetCount > currentCount) {
      append(Array(targetCount - currentCount).fill({ quantity: 1, length: 0, width: 0, height: 0, weight: 0, description: "" }))
    } else {
      remove(Array.from({ length: currentCount - targetCount }, (_, i) => currentCount - 1 - i))
    }
  }

  const isDangerousGood = watch("lineItem.dangerousGoods")

  return (
    <FormProvider {...methods}>
      <form className="space-y-6">
        <Accordion type="single" collapsible value={isOpen ? "dimensions" : ""} onValueChange={(val) => setIsOpen(!!val)}
          className="shadow-lg border border-border rounded-md bg-white dark:bg-card">
          <AccordionItem value="dimensions" className="border-none">
            <AccordionTrigger className="group px-6 py-4 hover:no-underline items-center cursor-pointer [&>svg]:hidden!">
              <h2 className="flex gap-2 items-center text-lg font-semibold text-slate-800 dark:text-slate-100">
                <PackageCheck />
                {isShipment ? " Packaging Details" :"Dimensions & Weight"}
                <ChevronUp className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </h2>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-6 h-full space-y-6">
              <DimensionsMeasurementControls fieldCount={fields.length} onQuantityChange={handleQuantityChange} />

              <div className="space-y-6 flex flex-col">
                {fields.map((field, index) => (
                  <PackageRow
                    key={field.id}
                    index={index}
                    fieldId={field.id}
                    shipmentType={shipmentType}
                    canRemove={fields.length > 1}
                    onRemove={remove}
                    onClear={handleClearDimensions}
                    open={packageDialogOpen}
                    setOpen={setPackageDialogOpen}
                  />
                ))}
                <DimensionsFooter shipmentType={shipmentType} onAddPackage={handleAddPackage} />
              </div>

              <div className="pt-2">
                <GlobalForm
                  formWrapperClassName="flex items-center gap-4"
                  fields={[
                    // { name: "lineItem.units.0.length", label: "Length", type: "number", defaultValue: 1, icon: <Info size={14} className="text-slate-800 dark:text-white" /> },
                    { name: "lineItem.dangerousGoods", label: "Dangerous Goods", type: "checkbox", defaultValue: false, icon: <Info size={14} className="text-slate-800 dark:text-white" /> },
                    { name: "lineItem.stackable",      label: "Stackable",       type: "checkbox", defaultValue: false, icon: <Info size={14} className="text-slate-800 dark:text-white" /> },
                  ]}
                />
              </div>

              {isDangerousGood && <DangerousGoodsForm />}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </FormProvider>
  )
})

Dimensions.displayName = "Dimensions"
export default Dimensions