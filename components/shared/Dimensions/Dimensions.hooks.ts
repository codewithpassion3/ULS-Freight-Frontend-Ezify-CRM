// Isolates ALL form wiring and data-fetching logic.
// Dimensions.tsx becomes a pure layout component.
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { getSingleQuote } from "@/api/services/quotes.api"
// import { shipmentSchema, ShipmentFormValues } from "./Dimensions.schema"
import type { ShipmentOptions } from "../DynamicQuote/DynamicQuote"
import { courierLineItemSchema, ftlLineItemSchema, lineItemSchema, packageLineItemSchema, palletLineItemSchema } from "./Dimensions.schema"

export function useDimensions(shipmentType: ShipmentOptions[keyof ShipmentOptions]) {
    const [isOpen, setIsOpen] = useState(true)
    const dynamicSchema = (shipmentType: string) => {
        switch (shipmentType) {
            case "PALLET":
                return palletLineItemSchema
            case "PACKAGE":
                return packageLineItemSchema
            case "COURIER_PAK":
                return courierLineItemSchema
            case "STANDARD_FTL":
                return ftlLineItemSchema
        }
    }

    const schema = useMemo(() => {
        return dynamicSchema(shipmentType)
    }, [shipmentType])

    const methods = useForm<any>({
        resolver: zodResolver(schema as any) as any,
        mode: "onChange",
        defaultValues: {
            shipmentType: shipmentType,
            lineItem: {
                type: shipmentType,
                description: "",
                measurementUnit: "IMPERIAL",
                dangerousGoods: false,
                stackable: false,
                units: [{
                    description: "",
                }],
            }
        },
    })



    const { control, setValue, formState: { errors } } = methods
    const fieldArray = useFieldArray({ control, name: "lineItem.units" })

    const quoteId = useSearchParams().get("id")
    const { data: cachedSingleQuote } = useQuery({
        queryKey: ["singleQuote", quoteId],
        queryFn: () => (quoteId ? getSingleQuote(quoteId) : null),
        enabled: !!quoteId,
        staleTime: 1000 * 60 * 5,
    })

    useEffect(() => {
        if (!cachedSingleQuote) return
        const units = cachedSingleQuote.quote.lineItems?.units ?? []

        setValue(
            "lineItem.units",
            units.length === 0
                ? [{ quantity: 1, length: 0, width: 0, height: 0, weight: 0, description: "" }]
                : units
        )
        setValue("lineItem.measurementUnit", cachedSingleQuote.lineItem?.measurementUnit ?? "IMPERIAL")
        setValue("lineItem.dangerousGoods", cachedSingleQuote.lineItem?.dangerousGoods ?? false)
        setValue("lineItem.stackable", cachedSingleQuote.lineItem?.stackable ?? false)
        // cachedSingleQuote.lineItem?.specialHandlingRequired && setValue("specialHandlingRequired", cachedSingleQuote.lineItem?.specialHandlingRequired ?? false)
        setValue("lineItem.quantity", cachedSingleQuote.lineItem?.quantity ?? 1)
        setIsOpen(true)
    }, [cachedSingleQuote, setValue, shipmentType])

    useEffect(() => {
        setValue("shipmentType", shipmentType)
        setValue("lineItem.type", shipmentType)
    }, [shipmentType])

    const handleAddPackage = () => {
        fieldArray.append({ length: 0, width: 0, height: 0, weight: 0, description: "" })
        setValue("lineItem.quantity", fieldArray.fields.length)
    }

    const handleClearDimensions = (index: number) => {
        setValue(`lineItem.units.${index}.length`, null)
        setValue(`lineItem.units.${index}.width`, null)
        setValue(`lineItem.units.${index}.height`, null)
        setValue(`lineItem.units.${index}.weight`, null)
        setValue(`lineItem.units.${index}.description`, "")
    }

    return { methods, fieldArray, handleAddPackage, handleClearDimensions, isOpen, setIsOpen }
}