// Isolates ALL form wiring and data-fetching logic.
// Dimensions.tsx becomes a pure layout component.
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { getSingleQuote } from "@/api/services/quotes.api"
// import { shipmentSchema, ShipmentFormValues } from "./Dimensions.schema"
import type { ShipmentOptions } from "../DynamicQuote/DynamicQuote"
import { lineItemSchema, palletLineItemSchema } from "./Dimensions.schema"

export function useDimensions(shipmentType: ShipmentOptions[keyof ShipmentOptions]) {
    const methods = useForm<any>({
        resolver: zodResolver(palletLineItemSchema) as any,
        mode: "onChange",
        // defaultValues: {
        //     shipmentType: shipmentType,
        //     description: "",
        //     measurementUnit: "IMPERIAL",
        //     units: [{
        //         length: 0,
        //         width: 0,
        //         height: 0,
        //         weight: 0,
        //         description: "",
        //     }],
        // },
    })

    const { control, setValue, formState: { errors } } = methods
    const fieldArray = useFieldArray({ control, name: "units" })

    const quoteId = useSearchParams().get("id")
    const { data: cachedSingleQuote } = useQuery({
        queryKey: ["singleQuote", quoteId],
        queryFn: () => (quoteId ? getSingleQuote(quoteId) : null),
        enabled: !!quoteId,
        staleTime: 1000 * 60 * 5,
    })
    console.log("grand-parent errors", errors)

    // useEffect(() => {
    //     if (!cachedSingleQuote) return
    //     const units = cachedSingleQuote.quote.lineItems?.units ?? []

    //     setValue(
    //         "lineItem.units",
    //         units.length === 0
    //             ? [{ quantity: 1, length: 0, width: 0, height: 0, weight: 0, description: "" }]
    //             : units
    //     )
    //     setValue("lineItem.measurementUnit", cachedSingleQuote.lineItem?.measurementUnit ?? "IMPERIAL")
    //     setValue("lineItem.dangerousGoods", cachedSingleQuote.lineItem?.dangerousGoods ?? false)
    //     setValue("lineItem.stackable", cachedSingleQuote.lineItem?.stackable ?? false)
    //     setValue("lineItem.specialHandlingRequired", cachedSingleQuote.lineItem?.specialHandlingRequired ?? false)
    //     setValue("lineItem.quantity", cachedSingleQuote.lineItem?.quantity ?? 1)
    // }, [cachedSingleQuote, setValue])

    const handleAddPackage = () =>
        fieldArray.append({ length: 0, width: 0, height: 0, weight: 0, description: "" })

    const handleClearDimensions = (index: number) => {
        setValue(`lineItem.units.${index}.length`, null)
        setValue(`lineItem.units.${index}.width`, null)
        setValue(`lineItem.units.${index}.height`, null)
        setValue(`lineItem.units.${index}.weight`, null)
        setValue(`lineItem.units.${index}.description`, "")
    }

    return { methods, fieldArray, handleAddPackage, handleClearDimensions }
}