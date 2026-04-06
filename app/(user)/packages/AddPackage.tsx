"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Info, PackageIcon } from "lucide-react";
import FormField from "@/components/common/forms/FormField";
import { FormSelect } from "@/components/common/forms/FormSelect";
import { useState, useEffect } from "react";
import { GlobalForm } from "@/components/common/form/GlobalForm";
import { createPackage, CreatePackagePayload, PackagePayload, updatePackage, UpdatePackagePayload } from "@/api/services/packages.api";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ShipmentOptions } from "../../../components/shared/DynamicQuote/DynamicQuote";

const packageSchema = z.object({
    measurementUnit: z.enum(["METRIC", "IMPERIAL"]),
    name: z.string().min(1, "Name is required"),
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
    weight: z.number().min(0).optional(),
    freightClass: z.string().optional(),
    nmfc: z.string().optional(),
    shipmentType: z.string().optional(),
    unitsOnPallet: z.number().optional(),
    palletUnitType: z.string().optional(),
    description: z.string().optional(),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

type AddPackageProps = {
    id?: string;
    initialData?: Partial<PackageFormValues>;
    onSave?: (data: PackageFormValues) => void;
    children?: React.ReactNode;
    shipmentType?: ShipmentOptions[keyof ShipmentOptions];
};

export default function AddPackage({ id, shipmentType, initialData, onSave, children }: AddPackageProps) {
    const [open, setOpen] = useState(false)
    // Determine Add or Edit mode
    const isEdit = false;
    const isNew = !shipmentType;

    const methods = useForm<PackageFormValues>({
        resolver: zodResolver(packageSchema),
        mode: "onChange",
        defaultValues: {
            measurementUnit: "IMPERIAL",
            name: "",
            length: undefined,
            width: undefined,
            height: undefined,
            weight: undefined,
            freightClass: "",
            nmfc: "",
            shipmentType: "",
            unitsOnPallet: undefined,
            description: "",
        },
    });

    useEffect(() => {
        if (open && initialData) {
            methods.reset({ ...methods.getValues(), ...initialData });
        } else if (open && !initialData) {
            methods.reset({
                measurementUnit: "IMPERIAL",
                name: "",
                shipmentType: "PALLET",
            });
        }
    }, [open, initialData, methods]);

    const measurementUnit = methods.watch("measurementUnit");
    const isImperial = measurementUnit === "IMPERIAL";
    const lengthUnit = isImperial ? "in" : "cm";
    const weightUnit = isImperial ? "lbs" : "kg";

    const createMutation = useMutation({
        mutationFn: (data: CreatePackagePayload) => createPackage(data),
        onSuccess: () => {
            toast.success("Package created successfully");
            setOpen(false);
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data?.message || "Failed to create package");
        }
    })
    const updateMutation = useMutation({
        mutationFn: (data: UpdatePackagePayload) => updatePackage(data),
        onSuccess: () => {
            toast.success("Package updated successfully");
            setOpen(false);
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data?.message || "Failed to update package");
        }
    })
    const onSubmit = () => {
        const data = methods.getValues()
        if (isEdit) {
            updateMutation.mutate(data as UpdatePackagePayload);
        } else {
            createMutation.mutate(data as CreatePackagePayload);
        }
    };

    const normalText = (text: string) => text?.toLowerCase().replace("_", " ");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? children : <Button variant="outline">{shipmentType ? "Edit Package" : "Add Package"}</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto w-full">
                <DialogHeader className="border-b pb-4 mb-4">
                    <DialogTitle className="flex items-center gap-2 text-xl text-slate-800">
                        <PackageIcon className="w-5 h-5 text-slate-700" />
                        {isEdit ? "Edit" : "Add"}{" "}

                        {<span className="capitalize">
                            {normalText(!isNew ? shipmentType : methods?.watch("shipmentType") || "")}
                        </span>}
                    </DialogTitle>
                </DialogHeader>
                <FormProvider {...methods} >
                    <GlobalForm
                        formWrapperClassName="grid grid-cols-1 md:grid-cols-4 gap-6"
                        fields={[
                            {
                                name: "shipmentType",
                                type: "radio",
                                label: "Packaging Type",
                                defaultValue: "PALLET",
                                options: [
                                    { value: "PALLET", label: "Pallet" },
                                    { value: "PACKAGE", label: "Package" },
                                    { value: "COURIER_PAK", label: "Courier Pak" },
                                ],
                                wrapperClassName: "col-span-2",
                                show: isNew
                            },
                            {
                                name: "measurementUnit",
                                type: "radio",
                                label: "Unit of Measurement",
                                options: [
                                    { value: "METRIC", label: "Metric (cm & kg)" },
                                    { value: "IMPERIAL", label: "Imperial (in & lbs)" },
                                ],
                                wrapperClassName: "col-span-4"
                            },
                            {
                                name: "name",
                                type: "text",
                                label: "Pallet Name*",
                                placeholder: "e.g. Generic",
                                wrapperClassName: "col-span-4",
                                className: "w-1/2"

                            },
                            {
                                name: "length",
                                type: "number",
                                label: `Length (${lengthUnit})*`,
                                placeholder: "L",
                                wrapperClassName: "col-span-1"
                            },
                            {
                                name: "width",
                                type: "number",
                                label: `Width (${lengthUnit})*`,
                                placeholder: "W",
                                wrapperClassName: "col-span-1"

                            },
                            {
                                name: "height",
                                type: "number",
                                label: `Height (${lengthUnit})*`,
                                placeholder: "H",
                                wrapperClassName: "col-span-1"

                            },
                            {
                                name: "weight",
                                type: "number",
                                label: `Weight (${weightUnit})`,
                                placeholder: "Weight",
                                wrapperClassName: "col-span-1"

                            },
                            {
                                name: "freightClass",
                                type: "select",
                                label: "Freight Class",
                                placeholder: "Select Class",
                                options: [
                                    { value: "25", label: "25" },
                                    { value: "50", label: "50" },
                                    { value: "75", label: "75" },
                                    { value: "100", label: "100" },
                                    { value: "125", label: "125" },
                                    { value: "150", label: "150" },
                                    { value: "175", label: "175" },
                                    { value: "200", label: "200" },
                                    { value: "250", label: "250" },
                                    { value: "300", label: "300" },
                                    { value: "350", label: "350" },
                                    { value: "400", label: "400" },
                                    { value: "450", label: "450" },
                                    { value: "500", label: "500" },
                                    { value: "550", label: "550" },
                                    { value: "600", label: "600" },
                                    { value: "650", label: "650" },
                                    { value: "700", label: "700" },
                                    { value: "750", label: "750" },
                                    { value: "800", label: "800" },
                                    { value: "850", label: "850" },
                                    { value: "900", label: "900" },
                                    { value: "950", label: "950" },
                                    { value: "1000", label: "1000" },
                                ],
                                wrapperClassName: "col-span-2",

                            },
                            {
                                name: "nmfc",
                                type: "text",
                                label: "NMFC Code (optional)",
                                placeholder: "#0000",
                                wrapperClassName: "col-span-2"

                            },
                            {
                                name: "palletUnitType",
                                type: "select",
                                label: "Type",
                                placeholder: "Select Type",
                                options: [
                                    { value: "PALLET", label: "Pallet" },
                                    { value: "DRUM", label: "Drum" },
                                    { value: "BOXES", label: "Boxes" },
                                    { value: "ROLLS", label: "Rolls" },
                                    { value: "PIPES_OR_TUBES", label: "Pipes or Tubes" },
                                    { value: "BALES", label: "Bales" },
                                    { value: "BAGS", label: "Bags" },
                                    { value: "CYLINDER", label: "Cylinder" },
                                    { value: "PAILS", label: "Pails" },
                                    { value: "REELS", label: "Reels" },
                                    { value: "CRATE", label: "Crate" },
                                    { value: "LOOSE", label: "Loose" },
                                    { value: "PIECES", label: "Pieces" },
                                ],
                                wrapperClassName: "col-span-2"

                            },
                            {
                                name: "unitsOnPallet",
                                type: "number",
                                label: "# units on pallet (optional)",
                                placeholder: "2",
                                wrapperClassName: "col-span-2"

                            },
                            {
                                name: "description",
                                type: "textarea",
                                label: "Description (optional)",
                                placeholder: "Describe the item(s) being shipped",
                                wrapperClassName: "col-span-4"

                            },
                        ]}
                    />
                    <div className="flex justify-end gap-4 mt-6">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={!methods.formState.isValid} type="submit" onClick={onSubmit}>
                            Save
                            {<span className="capitalize">
                                {normalText(!isNew ? shipmentType : methods?.watch("shipmentType") || "")}
                            </span>}
                        </Button>
                    </div>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}

