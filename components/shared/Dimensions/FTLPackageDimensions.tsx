import { GlobalForm } from "@/components/common/form/GlobalForm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

export function FTLPackageDimensions() {
    // create RHF form
    const { watch, control } = useFormContext<any>()
    const measurementUnit = watch("lineItem.measurementUnit")
    const isImperial = measurementUnit === "IMPERIAL"
    const weightUnit = isImperial ? "lbs" : "kg"
    //ftl package type
    const ftlPackageType = watch("lineItem.units.0.name")
    console.log("ftlPackageType", ftlPackageType)
    // count also
    const ftlPackageCount = watch("lineItem.units.0.totalCount")
    console.log("ftlPackageCount", ftlPackageCount)
    const ftlPackageTypeName = ftlPackageType === "looseFreight" ? "Loose Freight" : "Pallets"
    return (
        <GlobalForm
            formWrapperClassName="grid grid-cols-1 md:grid-cols-4 gap-4"
            fields={
                [
                    {
                        name: "lineItem.units.0.name",
                        type: "radio",
                        options: [
                            { value: "looseFreight", label: "Loose Freight" },
                            { value: "pallets", label: "Pallets" },
                        ],
                        wrapperClassName: "col-span-4"

                    },

                    {
                        name: `lineItem.units.0.count`,
                        label: `${ftlPackageTypeName} Count`,
                        type: "number",
                        placeholder: `${ftlPackageTypeName} Count`,
                        labelClassName: "text-xs text-muted-foreground",

                    },
                    // total weight
                    {
                        name: `lineItem.units.0.weight`,
                        label: `Weight ${weightUnit}*`,
                        type: "number",
                        placeholder: "W",
                        min: 0,
                        labelClassName: "text-xs text-muted-foreground",
                        className: "",
                    },
                    // description
                    {
                        name: "lineItem.units.0.description",
                        label: "Description",
                        type: "text",
                        labelClassName: "text-xs text-muted-foreground",

                        placeholder: "Description",
                    },

                ]
            }
        />

    )
}