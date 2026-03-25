"use client"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { markContactAsRecent } from "@/api/services/quotes.api"

// Hook returns a mutation that accepts contactId when called
export const useMarkContactAsRecent = (): UseMutationResult<
    any,      // type returned by mutation
    unknown,  // error type
    string    // input parameter type (contactId)
> => {
    return useMutation({
        mutationFn: (contactId: string) => markContactAsRecent(contactId),
    })
}