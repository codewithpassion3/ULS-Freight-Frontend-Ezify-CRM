import { useQuery } from "@tanstack/react-query"
import { registerUser } from "@/api/services/auth.api"

export const useRegisterUser = (payload: any) => {
    return useQuery({
        queryKey: ["register-user"],
        queryFn: () => registerUser(payload),
    })
}