"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import FormField from "@/components/common/FormField"
import UserTable from "./UserTable"
import AddUser from "./(add-user)/AddUser"
import { useUser } from "@/hooks/useUser"
import { useMutation } from "@tanstack/react-query"
import { changePassword } from "@/api/services/auth.api"
import { toast } from "sonner"
import ChangePassword from "./(change-password)/ChangePassword"

type UserSettingsFormValues = {
    language: string
    darkMode: boolean
    landingPage: string
    quickButton: string
}

export default function UserPreferences() {
    const { data: user, isLoading } = useUser()
    const { register, handleSubmit } = useForm<UserSettingsFormValues>({
        defaultValues: {
            language: "english",
            darkMode: true,
            landingPage: "Create New Quote",
            quickButton: "Create New Quote",
        }
    })

    const onSubmit = (data: UserSettingsFormValues) => {
        console.log(data)
    }

    return (
        <div className="max-w-6xl">
            <h2 className="text-xl font-semibold mb-6">User Settings</h2>

            <div className="space-y-10">

                {/* Language + Display */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="font-medium mb-3">Language</h3>
                        <div className="flex gap-6 text-sm">
                            <label className="flex items-center gap-2">
                                <input type="radio" value="english" {...register("language")} />
                                English
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="radio" value="francais" {...register("language")} />
                                Français
                            </label>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-3">Display Settings</h3>

                        <div className="flex items-center gap-3">
                            <Switch {...register("darkMode")} />
                            <span className="text-sm">Dark Mode</span>
                        </div>
                    </div>
                </div> */}

                {/* Default Landing Page */}
                <div>
                    <h3 className="font-medium mb-2">Default Landing Page</h3>

                    <select
                        {...register("landingPage")}
                        className="border rounded-md px-3 py-2 text-sm w-[260px]"
                    >
                        <option>Create New Quote</option>
                        <option>Dashboard</option>
                        <option>Shipments</option>
                    </select>

                    <p className="text-sm text-muted-foreground mt-1">
                        You may select which page you wish to arrive to after signing in.
                    </p>
                </div>

                {/* Quick Button */}
                <div>
                    <h3 className="font-medium mb-2">Home "Quick" Button</h3>

                    <select
                        {...register("quickButton")}
                        className="border rounded-md px-3 py-2 text-sm w-[260px]"
                    >
                        <option>Create New Quote</option>
                        <option>Create Shipment</option>
                    </select>

                    <p className="text-sm text-muted-foreground mt-1">
                        You may customize which shortcut you can access from your home dashboard.
                    </p>
                </div>

                {/* Profile Image */}
                <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Profile Image</h3>

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                            ULS
                        </div>

                        <div className="flex gap-4 text-sm">
                            <button
                                type="button"
                                className="text-primary hover:underline"
                            >
                                Upload New Photo
                            </button>

                            <button
                                type="button"
                                className="text-primary hover:underline"
                            >
                                Remove Photo
                            </button>
                        </div>

                    </div>
                </div>

                {/* Change Password */}
                <ChangePassword />
                {/* Account Users */}
                {user?.user?.role.name.includes("admin") && <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="font-medium">Account Users</h3>
                            <p className="text-sm text-muted-foreground">
                                Total # of Users: 1
                            </p>
                        </div>

                        <AddUser />
                    </div>

                    {/* Users Table */}
                    <div className="border rounded-md overflow-hidden">
                        <UserTable />
                    </div>
                </div>}

            </div>
        </div>
    )
}