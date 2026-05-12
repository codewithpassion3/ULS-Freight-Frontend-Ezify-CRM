import { contactSchema } from "@/app/(user)/settings/(address-book)/schemas/addContact.schema";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ShipmentOptions } from "../../DynamicQuote/DynamicQuote";

// import { contactSchema } from "../validation/contactValidation";

export function useShippingAddressForm({ shipmentType, quoteType, type }: { shipmentType: ShipmentOptions[keyof ShipmentOptions], quoteType: keyof ShipmentOptions, type: "FROM" | "TO" }) {
    const showLocationType = quoteType === "SPOT" || shipmentType === "PALLET";

    const pathname = usePathname()
    const isShipment = pathname.includes("shipment")
    const addressDefaultValues = {
        // @ts-ignore
        type: type,
        address: {
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        },
    }

    const shipmentDefaultValues = {
        companyName: "",
        contactId: "",
        phoneNumber: "",
        email: "",
        contactName: "",
        // @ts-ignore
        type: type,
        address: {
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            // set mins to 00 and hours to 12
        },
        readyTimeHour: "09",
        readyTimeMinute: "00",
        readyTimeAmPm: "AM",
        closeTimeHour: "05",
        closeTimeMinute: "00",
        closeTimeAmPm: "PM",
        shipDate: undefined,
    }
    const defaultValues = isShipment ? shipmentDefaultValues : addressDefaultValues;
    const localSchema = useMemo(() => {
        if (isShipment) {
            // make a field optional from contact schema
            const { signatureId, ...rest } = contactSchema.shape;
            let baseShape: any = {
                ...rest,
                signatureId: signatureId.optional(),
            };

            if (type === "FROM") {
                baseShape.shipDate = z.date({
                    message: "Ship date is required",
                }).min(new Date(new Date().setHours(0, 0, 0, 0)), {
                    message: "Ship date cannot be in the past",
                });
            }

            return z.object(baseShape);
        }
        else {
            let schema = contactSchema.pick({
                address: true,
            });

            if (showLocationType) {
                schema = schema.extend({ locationTypeId: z.number("Location type is required") }) as any;
            }
            return schema;
        }
    }, [shipmentType]);
    const methods = useForm({
        // @ts-ignore
        resolver: zodResolver(localSchema),
        mode: "onChange",
        defaultValues: defaultValues,
        shouldUnregister: false,
    });
    return {
        methods, addressDefaultValues, shipmentDefaultValues, defaultValues, localSchema
    }
}