"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/api/services/auth.api"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"

type UseLogoutOptions = {
  redirectTo?: string
  onSuccess?: () => void
  onError?: (error: AxiosError<ApiError>) => void
}

export function useLogoutMutation(options: UseLogoutOptions = {}) {
  const { redirectTo = "/login", onSuccess, onError } = options
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ["user"] })
      queryClient.setQueryData(["user"], null)
      queryClient.removeQueries({ queryKey: ["user"], exact: true })
      onSuccess?.()
      router.replace(redirectTo)
    },
    onError: (error: AxiosError<ApiError>) => {
      onError?.(error)
    },
  })
}

