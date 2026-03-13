"use client"

import { Controller, useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
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
import { createUser } from "@/api/services/auth.api"
import { addUserSchema } from "@/lib/validations/admin/create-user.schema"

export type AddUserFormValues = {
    email: string
    password: string
    phoneNumber: string
    roleId: number
    shipping: boolean
    invoicing: boolean
    claims: boolean
}

export default function AddUser() {

    const { register, handleSubmit, reset, control, watch } = useForm<AddUserFormValues>({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            email: "",
            password: "",
            phoneNumber: "",
            roleId: 1,
            shipping: true,
            invoicing: false,
            claims: false
        }
    })
    const [roleId, setRoleId] = useState(1)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setRoleId(Number(watch("roleId")))
    }, [watch("roleId")])

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success("User created successfully")
            reset()
            setOpen(false)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const onSubmit = (data: AddUserFormValues) => {

        const permissionIds = []

        if (data.shipping) permissionIds.push(1)
        if (data.invoicing) permissionIds.push(2)
        if (data.claims) permissionIds.push(3)

        const payload = {
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            roleId: Number(data.roleId),
            permissionIds
        }

        createUserMutation.mutate(payload)
    }

    return (
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
                        name="password"
                        label="Password"
                        placeholder="Enter password"
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
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
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
                                <Checkbox {...register("shipping")} />
                                <span className="text-sm">Shipping</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox {...register("invoicing")} />
                                <span className="text-sm">Invoicing</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox {...register("claims")} />
                                <span className="text-sm">Claims</span>
                            </div>

                        </div>
                    </div> : ""}

                    <DialogFooter>
                        <Button type="submit" className="w-full">
                            Create User
                        </Button>
                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>
    )
}