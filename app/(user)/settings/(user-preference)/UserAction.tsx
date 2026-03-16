"use client"

import { MoreHorizontal, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "@/api/services/auth.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"

export function UserActions({ id }: { id: number }) {
    const queryClient = useQueryClient()
    const deleteUserMutation = useMutation({
        mutationFn: () => deleteUser(id),
        onSuccess: () => {
            toast.success("User deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message)

        }
    })
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={() => deleteUserMutation.mutate()}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}