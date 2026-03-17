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
import { changePassword, deleteUserProfilePhoto, updateUserSettings } from "@/api/services/auth.api"
import { toast } from "sonner"
import ChangePassword from "./(change-password)/ChangePassword"
import { useEffect, useState } from "react"
import UploadPhotoModal from "./(change-photo)/UploadPhotoModal"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader } from "lucide-react"

type UserSettingsFormValues = {
    landingPage: string
    quickButton: string
}

export default function UserPreferences() {
    const { data: user, isLoading, isPending, refetch } = useUser()
    const { register, handleSubmit } = useForm<UserSettingsFormValues>({
        defaultValues: {
            landingPage: "Create New Quote",
            quickButton: "Create New Quote",
        }
    })
    const [landingPage, setLandingPage] = useState("Create New Quote")
    const [quickButton, setQuickButton] = useState("Create New Quote")
    const [open, setOpen] = useState(false)
    const [userSettingsFormValues, setUserSettingsFormValues] = useState({
        default_landing_page: landingPage,
        home_quick_button: quickButton
    })
    const onSubmit = (data: UserSettingsFormValues) => {
        console.log(data)
    }
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    const [isUploadPhotoModalOpen, setIsUploadPhotoModalOpen] = useState(false)
    useEffect(() => {
        if (user) {
            setUserSettingsFormValues({
                default_landing_page: user.user.settings.default_landing_page,
                home_quick_button: user.user.settings.home_quick_button
            })
        }
    }, [user])
    const deletePhotoMutation = useMutation({
        mutationFn: deleteUserProfilePhoto,
        onSuccess: () => {
            toast.success("Profile photo deleted successfully")
            refetch()
        },
        onError: () => {
            toast.error("Failed to delete profile photo")
        }
    })
    const handleDeletePhoto = () => {
        deletePhotoMutation.mutate()
    }

    const { mutate } = useMutation({
        mutationFn: updateUserSettings,
        onSuccess: () => {
            toast.success("User settings updated successfully")
            refetch()
        },
        onError: () => {
            toast.error("Failed to update user settings")
        }
    })

    const handleUpdateUserSettings = () => {
        mutate(userSettingsFormValues)
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
                    <div>
                        <h3 className="font-medium mb-2">Default Landing Page</h3>
                        <Select
                            name="default_landing_page"
                            onValueChange={(value) => setUserSettingsFormValues({ ...userSettingsFormValues, default_landing_page: value })}
                            defaultValue={user?.user?.settings?.default_landing_page}
                        >
                            <SelectTrigger className="w-[260px]">
                                <SelectValue placeholder="Select Landing Page" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="create-quote">Create New Quote</SelectItem>
                                <SelectItem value="dashboard">Dashboard</SelectItem>
                                <SelectItem value="shipments">Shipments</SelectItem>
                            </SelectContent>
                        </Select>

                        <p className="text-sm text-muted-foreground mt-1">
                            You may select which page you wish to arrive to after signing in.
                        </p>
                    </div>

                    {/* Quick Button */}
                    <div>
                        <h3 className="font-medium mb-2">Home "Quick" Button</h3>
                        <Select
                            name="home_quick_button"
                            onValueChange={(value) => setUserSettingsFormValues({ ...userSettingsFormValues, home_quick_button: value })}
                            defaultValue={user?.user?.settings?.home_quick_button}
                        >
                            <SelectTrigger className="w-[260px]">
                                <SelectValue placeholder="Select Landing Page" />
                            </SelectTrigger>
                            <SelectContent>
                                {[{ text: "Create New Quote", value: "create-quote" }, { text: "Create New Shipments", value: "create-shipments" }, { text: "Quotes Dashboard", value: "quotes-dashboard" }, { text: "Pickups Dashboard", value: "pickups-dashboard" }, { text: "Tracking Dashboard", value: "tracking-dashboard" }, { text: "Invoices Dashboard", value: "invoices-dashboard" }]?.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>{item.text}</SelectItem>
                                ))}
                                {/* <SelectItem value="create-quote">Create New Quote</SelectItem>
                                <SelectItem value="create-shipments">Create New Shipments</SelectItem>
                                <SelectItem value="quotes-dashboard">Quotes Dashboard</SelectItem>
                                <SelectItem value="pickups-dashboard">Pickups Dashboard</SelectItem>
                                <SelectItem value="tracking-dashboard">Tracking Dashboard</SelectItem>
                                <SelectItem value="invoices-dashboard">Invoices Dashboard</SelectItem> */}
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground mt-1">
                            You may customize which shortcut you can access from your home dashboard.
                        </p>
                    </div>

                    <Button type="button" onClick={handleUpdateUserSettings} className="mt-5">Save Changes</Button>
                </div>

                {/* Profile Image */}
                <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Profile Image</h3>

                    <div className="flex items-center gap-4">
                        {/* {isLoading || isPending ?
                            <Loader className="animate-spin" /> :
                            <Image
                                src={`${BASE_URL}${user?.user?.profilePic}`}
                                alt="Profile"
                                width={100}
                                height={100}
                                className="rounded-full object-cover"
                            />
                        } */}
                        <Avatar className="h-16 w-16 cursor-pointer object-cover">
                            <AvatarImage className="object-cover" src={`${BASE_URL}${user?.user?.profilePic}`} />
                            <AvatarFallback className="text-2xl">{user?.user?.firstName?.charAt(0)}{user?.user?.lastName?.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col sm:flex-row gap-2 text-sm">
                            <Button
                                type="button"
                                onClick={() => setIsUploadPhotoModalOpen(true)}
                            >
                                Upload New Photo
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={handleDeletePhoto}
                            >
                                Remove Photo
                            </Button>
                            <UploadPhotoModal
                                open={isUploadPhotoModalOpen}
                                setOpen={setIsUploadPhotoModalOpen}
                            />
                        </div>

                    </div>
                </div>

                {/* Change Password */}
                <ChangePassword />
                {/* Account Users */}
                {user?.user?.role.name.includes("admin") &&
                    <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <AddUser open={open} setOpen={setOpen} />
                        </div>
                        <div className="border rounded-md overflow-hidden">
                            <UserTable open={open} setOpen={setOpen} />
                        </div>
                    </div>}

            </div>
        </div>
    )
}