import { getAllUsers } from "@/api/services/auth.api"
import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { UserActions } from "./UserAction";
import { CircleCheck } from "lucide-react";
interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    permissions: string[] | null;
    role: number;
    updatedAt: string;
    lastLogin: string | null;
}
export default function UserTable() {
    const { data: res = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    })

    if (isLoading) {
        return <Loader />
    }

    if (res.users.length === 0) {
        return <div className="text-center text-muted-foreground">No users found</div>
    }

    return (
        <Table>
            <TableHeader className="bg-muted">
                <TableRow className="text-left">
                    <TableHead className="p-3">Email</TableHead>
                    <TableHead className="p-3">User Role</TableHead>
                    <TableHead className="p-3">Date Created</TableHead>
                    <TableHead className="p-3">Permissions</TableHead>
                    <TableHead className="p-3">Last Login</TableHead>
                    <TableHead className="p-3"></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {res.users.map((user: User) => (
                    <TableRow key={user.id}>
                        <TableCell className="p-3">
                            {user.email}
                        </TableCell>

                        <TableCell className="p-3">
                            {user.role === 1 ? "Admin" : "User"}
                        </TableCell>

                        <TableCell className="p-3">
                            {user.updatedAt.split("T")[0]}
                        </TableCell>

                        <TableCell className="p-3 space-y-1 text-sm">
                            {user.role === 2
                                ? user.permissions?.map((permission: any) => (
                                    <div key={permission.id} className="flex gap-2 items-center">
                                        <CircleCheck size={16} />
                                        <p className="capitalize" >{permission.name}</p>
                                    </div>
                                ))
                                :
                                <div>
                                    {["Shipping", "Claims", "Billing"].map((permission: string) => (
                                        <div key={permission} className="flex gap-2 items-center">
                                            <CircleCheck size={16} />
                                            <p>{permission}</p>
                                        </div>
                                    ))}

                                </div>
                            }
                        </TableCell>

                        <TableCell className="p-3 flex flex-col">
                            {user.lastLogin ? <span className="text-sm"> {new Date(user.lastLogin).toLocaleDateString()}</span> : "Never"}
                            {user.lastLogin ? <span className="text-sm"> {new Date(user.lastLogin).toLocaleTimeString()}</span> : ""}
                        </TableCell>
                        <TableCell className="p-3">
                            <UserActions id={user.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}