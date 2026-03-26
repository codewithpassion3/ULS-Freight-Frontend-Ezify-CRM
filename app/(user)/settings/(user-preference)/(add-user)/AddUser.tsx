"use client"

import { Controller, useForm, SubmitHandler } from "react-hook-form"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import FormField from "@/components/common/forms/FormField"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { createUser, editUserAdmin, getAllUsers } from "@/api/services/auth.api"
import { addUserSchema } from "@/lib/validations/admin/create-user.schema"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { Loader } from "@/components/common/Loader"
import { User } from "../UserTable"
import { FormFieldWrapper } from "@/components/common/forms/FormFieldWrapper"

export type AddUserFormValues = {
    id?: number
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    roleId: number
    permissionIds?: number[]
}

export default function AddUser({ open, setOpen, mode, setMode, selectedUser, setSelectedUser }: { open: boolean, setOpen: (open: boolean) => void, mode: "create" | "edit", setMode: (mode: "create" | "edit") => void, selectedUser: User | null, setSelectedUser: (user: User | null) => void }) {

    const { register, handleSubmit, reset, control, watch, formState: { isValid, errors } } = useForm<AddUserFormValues>({
        resolver: zodResolver(addUserSchema),
        mode: mode === "edit" ? "onChange" : "onSubmit",
        defaultValues: {
            email: mode === "edit" ? selectedUser?.email : "",
            firstName: mode === "edit" ? selectedUser?.firstName : "",
            lastName: mode === "edit" ? selectedUser?.lastName : "",
            phoneNumber: mode === "edit" ? selectedUser?.phoneNumber : "",
            roleId: mode === "edit" ? selectedUser?.role : 1,
            permissionIds: mode === "edit" ? selectedUser?.permissions?.map((p: any) => p.id) : []
        }
    })
    console.log("selectedUser", selectedUser)
    const { data: res = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    })
    console.log(res.users)
    // const [roleId, setRoleId] = useState(1)

    // useEffect(() => {
    //     setRoleId(Number(watch("roleId")))
    // }, [watch("roleId")])
    const roleId = watch("roleId")
    const queryClient = useQueryClient()

    useEffect(() => {
        if (mode === "edit" && selectedUser) {
            reset({
                email: selectedUser.email,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                phoneNumber: selectedUser.phoneNumber,
                roleId: selectedUser.role,
                permissionIds: selectedUser?.permissions?.map((permission: any) => permission.id)
            })
        }

    }, [selectedUser])
    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success("User created successfully")
            reset()
            queryClient.invalidateQueries({ queryKey: ["users"] })
            setOpen(false)
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message)
        }
    })
    const updateUserMutation = useMutation({
        mutationFn: editUserAdmin,
        onSuccess: () => {
            toast.success("User updated successfully")
            reset()
            queryClient.invalidateQueries({ queryKey: ["users"] })
            setOpen(false)
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message)
        }
    })


    const onSubmit: SubmitHandler<AddUserFormValues> = (data) => {
        const payload = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            roleId: Number(data.roleId),
            permissionIds: data.permissionIds
        }
        console.log("payload before", payload)
        if (mode === "edit") {
            console.log("payload after", { id: selectedUser?.id, ...payload })
            // @ts-ignore
            updateUserMutation.mutate({ id: selectedUser?.id, ...payload })

        } else {
            createUserMutation.mutate(payload)
        }
    }
    // console.log(isValid)
    return (
        <>
            {isLoading ? <Loader /> : <div>
                <h3 className="font-medium">Account Users</h3>
                <p className="text-sm text-muted-foreground">
                    Total # of Users: {res.users.length}
                </p>
            </div>}
            <Button
                onClick={() => {
                    setMode("create")
                    setSelectedUser(null)
                    setOpen(true)
                }}
            >
                + Add New User
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[450px]">

                    <DialogHeader>
                        <DialogTitle>{mode === "create" ? "Add New" : "Edit"} User</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {mode === "create" ? <FormField
                            name="email"
                            label="Email"
                            placeholder="Enter email"
                            register={register}


                        /> : ""}

                        <FormField
                            name="firstName"
                            label="First Name"
                            placeholder="Enter first name"
                            register={register}
                        />

                        <FormField
                            name="lastName"
                            label="Last Name"
                            placeholder="Enter last name"
                            register={register}
                        />

                        {mode === "create" ? <FormField
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Enter phone number"
                            register={register}
                        /> : ""}

                        {/* Role */}
                        <div>
                            <label className="text-sm font-medium">
                                User Role
                            </label>

                            <Controller
                                name="roleId"
                                control={control}
                                defaultValue={mode === "edit" ? selectedUser?.role : 1}
                                render={({ field }) => (
                                    <Select
                                        value={field.value?.toString()}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="1">Admin</SelectItem>
                                            <SelectItem value="2">User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        {/* Permissions */}
                        {roleId === 2 ? <div>
                            <label className="text-sm font-medium block mb-2">
                                Permissions
                            </label>

                            <div className="space-y-2">

                                <div className="flex items-center gap-2">
                                    <Controller
                                        name="permissionIds"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value?.includes(1)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([...(field.value || []), 1]);
                                                    } else {
                                                        field.onChange(field.value?.filter(v => v !== 1));
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                    <span className="text-sm">Shipping</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Controller
                                        name="permissionIds"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value?.includes(2)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([...(field.value || []), 2]);
                                                    } else {
                                                        field.onChange(field.value?.filter(v => v !== 2));
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                    <span className="text-sm">Invoicing</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Controller
                                        name="permissionIds"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value?.includes(3)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([...(field.value || []), 3]);
                                                    } else {
                                                        field.onChange(field.value?.filter(v => v !== 3));
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                    <span className="text-sm">Claims</span>
                                </div>

                            </div>
                        </div> : ""}
                        <DialogFooter>
                            <Button disabled={!isValid} type="submit" className="w-full">
                                {mode === "create" ? "Create" : "Update"} User
                            </Button>
                        </DialogFooter>

                    </form>

                </DialogContent>

            </Dialog>
        </>
    )
}