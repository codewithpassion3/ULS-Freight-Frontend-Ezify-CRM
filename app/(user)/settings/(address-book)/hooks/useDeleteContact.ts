"use client";
import { deleteContact } from "@/api/services/address-book.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export function useDeleteContact(id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deleteContact(id),
        onSuccess: () => {
            toast.success("Contact deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["contact"] })
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })
}
