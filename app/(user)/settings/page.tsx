"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/services/auth.api";
import GeneralSettings from "./GeneralSettings";
import UserPreferences from "./(user-preference)/UserPreferences";
import EmailNotification from "./(email-notifications)/EmailNotification";
import { AddressBookTab } from "./(address-book)/AddressBookTab";
import { BellDot, CircleUserRound, Code, CreditCard, User, UserCog, UserRoundCog } from "lucide-react";


export default function Settings() {
    const { data: user, isLoading, error } = useUser()

    useEffect(() => {
        if (user) console.log("user updated", user)
    }, [user])
    console.log("user", user)

    const settings = [
        {
            title: "Account Settings",
            value: "account",
            icon: <CircleUserRound />

        },
        {
            title: "Shipment Settings",
            value: "shipment",
            icon: <UserRoundCog />
        },
        {
            title: "Payment Settings",
            value: "payment",
            icon: <CreditCard />
        },
        {
            title: "API Settings",
            value: "api",
            icon: <Code />
        },
    ]

    const accountSettings = [
        {
            title: "General Settings",
            value: "general-settings",
            icon: <UserRoundCog />
        },
        {
            title: "User Preferences",
            value: "user-preference",
            icon: <Settings />
        },
        {
            title: "Email Notifications",
            value: "email-notification",
            icon: <BellDot />
        },
    ]

    return (
        <div className="p-4 md:p-8 w-full mx-auto">
            <Tabs defaultValue="account" className="space-y-6">
                <TabsList className="flex flex-wrap gap-2">
                    {settings.map((setting) => (
                        <TabsTrigger key={setting.value} value={setting.value} className="cursor-pointer">{setting.icon} {setting.title}</TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="account">
                    <Tabs defaultValue="general-settings" orientation="vertical" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <TabsList className="h-max w-full gap-4 bg-transparent">
                                    {accountSettings.map((setting) => (
                                        <TabsTrigger key={setting.value} value={setting.value} className="w-max cursor-pointer p-3 data-[state=active]:border data-[state=active]:border-gray-400 data-[state=active]:shadow-lg">
                                            {setting.title}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </CardContent>
                        </Card>
                        <Card className="px-6 lg:col-span-3">
                            <TabsContent value="general-settings">
                                <GeneralSettings />
                            </TabsContent>
                            <TabsContent value="user-preference">
                                <UserPreferences />
                            </TabsContent>
                            <TabsContent value="email-notification">
                                <EmailNotification />
                            </TabsContent>
                        </Card>

                    </Tabs>
                </TabsContent>

                <TabsContent value="shipment">
                    <Tabs defaultValue="general-settings" orientation="vertical" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Shipment Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <TabsList className="h-max w-full gap-4 bg-transparent">
                                    {[
                                        { title: "Shipping Preferences", value: "shipping-preferences" },
                                        { title: "Carrier Preferences", value: "carrier-preferences" },
                                        { title: "Address Book", value: "address-book" },
                                        { title: "My Package & Pallets", value: "my-packages" },
                                        { title: "My Products", value: "my-products" },
                                        { title: "Request Shipping Supplies", value: "request-shipping-supplies" },

                                    ].map((subTab) => (
                                        <TabsTrigger key={subTab.value} value={subTab.value} className="w-max cursor-pointer"> {subTab.title}</TabsTrigger>
                                    ))}

                                </TabsList>
                            </CardContent>
                        </Card>
                        <Card className="px-6 lg:col-span-3">
                            <TabsContent value="shipping-preferences">

                            </TabsContent>
                            <TabsContent value="carrier-preferences">

                            </TabsContent>
                            <TabsContent value="address-book" className="mt-0 pt-0">
                                <AddressBookTab />
                            </TabsContent>
                        </Card>

                    </Tabs>
                </TabsContent>
            </Tabs>
        </div>
    );
}
