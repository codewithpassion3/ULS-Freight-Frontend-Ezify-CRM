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

import FormField from "@/components/common/FormField"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { createUser, getAllUsers } from "@/api/services/auth.api"
import { addUserSchema } from "@/lib/validations/admin/create-user.schema"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { Loader } from "@/components/common/Loader"

export type AddUserFormValues = {
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    roleId: number
    permissionIds?: number[]
}

export default function AddUser() {

    const { register, handleSubmit, reset, control, watch, formState: { isValid, errors } } = useForm<AddUserFormValues>({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            roleId: 1,
            permissionIds: []
        }
    })
    const { data: res = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    })
    console.log(res.users)
    // const [roleId, setRoleId] = useState(1)
    const [open, setOpen] = useState(false)
    // useEffect(() => {
    //     setRoleId(Number(watch("roleId")))
    // }, [watch("roleId")])
    const roleId = watch("roleId")
    const queryClient = useQueryClient()

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

    const onSubmit: SubmitHandler<AddUserFormValues> = (data) => {

        // const permissionIds: number[] = []

        // if (data.permissions[0]) permissionIds.push(1)
        // if (data.permissions[1]) permissionIds.push(2)
        // if (data.permissions[2]) permissionIds.push(3)

        const payload = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            roleId: Number(data.roleId),
            permissionIds: data.permissionIds
        }
        // console.log(payload)
        createUserMutation.mutate(payload)
    }
    console.log(isValid)
    return (
        <>
            {isLoading ? <Loader /> : <div>
                <h3 className="font-medium">Account Users</h3>
                <p className="text-sm text-muted-foreground">
                    Total # of Users: {res.users.length}
                </p>
            </div>}
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <Button variant="outline">
                        + Add New User
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[450px]">

                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            name="email"
                            label="Email"
                            placeholder="Enter email"
                            register={register}
                        />

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

                        <FormField
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Enter phone number"
                            register={register}
                        />

                        {/* Role */}
                        <div>
                            <label className="text-sm font-medium">
                                User Role
                            </label>

                            <Controller
                                name="roleId"
                                control={control}
                                defaultValue={1}
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
                                Create User
                            </Button>
                        </DialogFooter>

                    </form>

                </DialogContent>

            </Dialog>
        </>
    )
}