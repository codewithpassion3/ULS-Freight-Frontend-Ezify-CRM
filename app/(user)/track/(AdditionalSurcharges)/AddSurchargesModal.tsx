"use client";

import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { BookedShipment } from "@/types/api/bookedShipment.type";
import { useMutation } from "@tanstack/react-query";
import { createSurcharges } from "@/api/services/payment.api";
import { toast } from "sonner";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GlobalForm } from "@/components/common/form/GlobalForm";

const surchargeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    description: z.string().min(1, "Description is required"),
    currency: z.enum(["USD", "CAD", "EUR"]),
});

const formSchema = z.object({
    surcharges: z.array(surchargeSchema).min(1, "At least one surcharge is required").max(5, "Maximum 5 surcharges allowed"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddSurchargesModalProps {
    bookedShipment: BookedShipment;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (surcharges: any) => void;
}

export function AddSurchargesModal({
    bookedShipment,
    open,
    onOpenChange,
    onSave,
}: AddSurchargesModalProps) {
    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            surcharges: [{ name: "", amount: 0, description: "", currency: "USD" }],
        },
    });

    const { control, handleSubmit, reset, watch } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "surcharges",
    });

    const watchedSurcharges = watch("surcharges");
    const totalSurcharges = watchedSurcharges?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            reset({
                surcharges: [{ name: "", amount: 0, description: "", currency: "USD" }],
            });
        }
    }, [open, reset]);

    // create surcharges mutation
    const createSurchargesMutation = useMutation({
        mutationFn: createSurcharges,
        onSuccess: () => {
            toast.success("Surcharges Added successfully");
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error("Failed to add surcharges");
        },
    });

    const onSubmit = (data: FormValues) => {
        createSurchargesMutation.mutate({
            shipmentId: bookedShipment?.shipment?.id,
            surcharges: data.surcharges,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Add Surcharges</DialogTitle>
                </DialogHeader>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Shipment Details Section */}
                        <div className="bg-primary/10 border-primary border p-4 rounded-lg space-y-3 mb-4">
                            <h3 className="font-semibold text-sm uppercase ">
                                Shipment Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="col-span-2">
                                    <span className=" block">Carrier</span>
                                    <span className="font-medium">{bookedShipment?.shipment?.carrier}</span>
                                </div>
                                {/* <div>
                                    <span className=" block">Total Charges</span>
                                    <span className="font-medium">
                                        ${bookedShipment?.shipment?.totalCharge?.toFixed(2)}
                                    </span>
                                </div> */}
                                <div>
                                    <span className=" block">Shipment Type</span>
                                    <span className="font-medium capitalize">{bookedShipment?.shipmentType}</span>
                                </div>
                                <div>
                                    <span className=" block text-primary font-bold">Total Surcharges</span>
                                    <span className="font-bold text-primary text-right">
                                        ${totalSurcharges.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Units Details */}
                            {bookedShipment?.lineItems?.units && bookedShipment.lineItems.units.length > 0 && (
                                <div className="pt-4 border-t mt-4">
                                    <span className="text-xs font-semibold uppercase block mb-2">
                                        Units Details ({bookedShipment.lineItems.quantity} Total)
                                    </span>
                                    <div className="space-y-2">
                                        {bookedShipment.lineItems.units.map((unit, index) => (
                                            <div key={unit.id || index} className="grid grid-cols-4 gap-8 text-sm bg-background p-3 rounded-md border border-border">
                                                <div>
                                                    <span className="text-muted-foreground text-xs block">Unit(s)</span>
                                                    <span className="font-medium">{index + 1}</span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-muted-foreground text-xs block">Dimensions (L x W x H)</span>
                                                    <span className="font-medium">
                                                        {unit.length} x {unit.width} x {unit.height} {bookedShipment.lineItems.measurementUnit === 'metric' ? 'cm' : 'in'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground text-xs block">Weight</span>
                                                    <span className="font-medium">
                                                        {unit.weight} {bookedShipment.lineItems.measurementUnit === 'metric' ? 'kg' : 'lbs'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Surcharges Inputs Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">Surcharges</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({ name: "", amount: 0, description: "", currency: "USD" })}
                                    disabled={fields.length >= 5}
                                    className="flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add Surcharge
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-start justify-between gap-4 w-full p-4 border rounded-md relative group bg-background/50">
                                        <div className="w-full">
                                            <GlobalForm
                                                formWrapperClassName="grid grid-cols-12 gap-4"
                                                fields={[
                                                    {
                                                        name: `surcharges.${index}.name`,
                                                        label: "Surcharge Name",
                                                        placeholder: "e.g. Fuel",
                                                        type: "text",
                                                        wrapperClassName: "col-span-8",
                                                    },
                                                    {
                                                        name: `surcharges.${index}.amount`,
                                                        label: "Amount ($)",
                                                        placeholder: "0.00",
                                                        type: "number",
                                                        wrapperClassName: "col-span-4",
                                                    },
                                                    {
                                                        name: `surcharges.${index}.description`,
                                                        label: "Description",
                                                        placeholder: "e.g. Additional fuel charges due to carrier policy",
                                                        type: "text",
                                                        wrapperClassName: "col-span-12",
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="pt-6">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => remove(index)}
                                                disabled={fields.length === 1}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={createSurchargesMutation.isPending}
                            >
                                {createSurchargesMutation.isPending ? <LoaderCircle className="animate-spin mr-2" size={16} /> : ""}
                                Add Surcharges
                            </Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}


