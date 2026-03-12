"use client"

import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/api/services/auth.api"
import { LoginPayload } from "@/types/auth/login.types"

export function useLoginMutation() {
    return useMutation({
        mutationFn: (data: LoginPayload) => loginUser(data),
    })
}