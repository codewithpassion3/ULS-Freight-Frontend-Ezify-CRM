import { FormCheckbox } from "@/components/common/forms/FormCheckbox";
import { Checkbox } from "@/components/ui/checkbox";
import { Cuboid } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { FormRadio } from "@/components/common/forms/FormRadio";
import FormField from "@/components/common/forms/FormField";
import { Input } from "@/components/ui/input";

export default function Dimensions() {
    const [dimensionUnit, setDimensionUnit] = useState("in")
    const [weightUnit, setWeightUnit] = useState("lbs")
    const { register } = useFormContext<any>()
    const toggleDimensionsAndWeight = () => {
        setDimensionUnit(dimensionUnit === "in" ? "cm" : "in")
        setWeightUnit(weightUnit === "lbs" ? "kg" : "lbs")
    }

    return (
        <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-6">
            <h2 className="flex gap-2 items-center border-b pb-4">
                <Cuboid />
                Dimensions & Weight
            </h2>
            <div className="flex gap-2 items-center justify-between">
                <FormField
                    register={register}
                    name="dimensionsAndWeight.quantity"
                    label="Quantity"
                    type="number"
                />
                <FormRadio
                    onChange={toggleDimensionsAndWeight}
                    name="dimensionsAndWeight"
                    label=""
                    options={[
                        { value: "metric", label: "Metric (cm & kg)" },
                        { value: "imperial", label: "Imperial (in & lbs)" }
                    ]}
                />
            </div>
            <p className="text-sm text-slate-700 dark:text-white font-medium">Please provide the dimensions and weight of the shipment</p>
            <div className="grid grid-cols-2 sm:grid-cols-24 gap-2 pb-4 items-center border-b-2 border-sky-100">
                {[
                    { title: "#", className: "col-span-1" },
                    { title: `Length (${dimensionUnit}) `, className: "col-span-3" },
                    { title: `Width (${dimensionUnit})`, className: "col-span-3" },
                    { title: `Height (${dimensionUnit})`, className: "col-span-3" },
                    { title: `Weight (${weightUnit})`, className: "col-span-3" },
                    { title: "Description", className: "col-span-6" }
                ].map((item) => <div key={item.title} className={item.className}>{item.title}</div>)}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-24 gap-2 pb-4 items-center border-b-2 border-sky-100">
                <p>1</p>
                {[
                    // { name: "dimensionsAndWeight.quantity", placeholder: "", label: "", type: "number", className: "col-span-1" },
                    { name: "dimensionsAndWeight.length", placeholder: "L", label: "", type: "number", className: "col-span-3" },
                    { name: "dimensionsAndWeight.width", placeholder: "W", label: "", type: "number", className: "col-span-3" },
                    { name: "dimensionsAndWeight.height", placeholder: "H", label: "", type: "number", className: "col-span-3" },
                    { name: "dimensionsAndWeight.weight", placeholder: "Weight", label: "", type: "number", className: "col-span-3" },
                    { name: "dimensionsAndWeight.description", placeholder: "Description the item(s) being shipped", label: "", type: "text", className: "col-span-6" }
                ].map((item) =>
                    <div key={item.name} className={item.className}>
                        <Input {...register(item.name)} placeholder={item.placeholder} type={item.type} />
                    </div>
                )}

            </div>
        </div>
    )
}