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

const packageSchema = z.object({
    measurementUnit: z.enum(["METRIC", "IMPERIAL"]),
    name: z.string().min(1, "Name is required"),
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
    weight: z.number().min(0).optional(),
    freightClass: z.string().optional(),
    nmfc: z.string().optional(),
    type: z.string().optional(),
    unitsOnPallet: z.number().optional(),
    description: z.string().optional(),
});

export type PackageFormValues = z.infer<typeof packageSchema>;

type AddPackageProps = {
    id?: string;
    initialData?: Partial<PackageFormValues>;
    onSave?: (data: PackageFormValues) => void;
    children?: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function AddPackage({ id, initialData, onSave, children, open, setOpen }: AddPackageProps) {

    // Determine Add or Edit mode
    const isEdit = false;

    const methods = useForm<PackageFormValues>({
        resolver: zodResolver(packageSchema),
        defaultValues: {
            measurementUnit: "IMPERIAL",
            name: "",
            length: undefined,
            width: undefined,
            height: undefined,
            weight: undefined,
            freightClass: "",
            nmfc: "",
            type: "PALLET",
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
                type: "PALLET",
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? children : <Button variant="outline">{isEdit ? "Edit Profile" : "Add Package"}</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto w-full">
                <DialogHeader className="border-b pb-4 mb-4">
                    <DialogTitle className="flex items-center gap-2 text-xl text-slate-800">
                        <PackageIcon className="w-5 h-5 text-slate-700" />
                        {isEdit ? "Edit Pallet" : "Add Pallet"}
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
                                show: !isEdit
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
                                    { value: "50", label: "50" },
                                    { value: "55", label: "55" },
                                    { value: "60", label: "60" },
                                    { value: "65", label: "65" },
                                    { value: "70", label: "70" },
                                    { value: "77.5", label: "77.5" },
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
                        <Button type="submit" onClick={onSubmit}>
                            Save Package
                        </Button>
                    </div>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}

