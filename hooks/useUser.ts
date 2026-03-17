
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/services/auth.api";
export function useUser(enabled = true) {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        // staleTime: 1000 * 60 * 5,
        // refetchOnWindowFocus: false,
        // retry: false,
        enabled
    })
}
