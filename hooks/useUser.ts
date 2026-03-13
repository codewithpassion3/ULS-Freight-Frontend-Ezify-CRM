
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/services/auth.api";
export function useUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
