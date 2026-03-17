"use client"

import { MoreHorizontal, MoreVertical, Trash2, UserRoundPen } from "lucide-react"
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
import { User } from "./UserTable"

export function UserActions({ id, selectedUser, open, setOpen, setMode, setSelectedUser }: { id: number, selectedUser: User | null, open: boolean, setOpen: (open: boolean) => void, setMode: (mode: "create" | "edit") => void, setSelectedUser: (user: User | null) => void }) {
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
    const handleEditUser = () => {
        setMode("edit")
        setSelectedUser(selectedUser)
        setOpen(!open)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={handleEditUser}
                >
                    <UserRoundPen />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="bg-red-100 text-red-600 flex items-center gap-2 cursor-pointer"
                    onClick={() => deleteUserMutation.mutate()}
                >
                    <Trash2 />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}