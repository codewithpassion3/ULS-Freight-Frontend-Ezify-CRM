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

const schema = z.object({
    companyName: z.string().min(1),
    contactName: z.string().min(1),
    industry: z.string().min(1),
    email: z.email(),
    phone: z.string().min(7),
    ext: z.string().optional(),
    address1: z.string().min(1),
    address2: z.string().optional(),
    unit: z.string().optional(),
    postal: z.string().min(1),
    city: z.string().min(1),
    province: z.string().min(1),
    country: z.string().min(1),
    promotions: z.boolean().default(true),
    updates: z.boolean().default(true),
    newsletters: z.boolean().default(true),
});

type FormValues = z.infer<typeof schema>;

export default function Settings() {
    // const form = useForm<FormValues>({
    //     resolver: zodResolver(schema),
    //     defaultValues: {
    //         companyName: "ULS Freight Inc",
    //         contactName: "Anmol Verma",
    //         industry: "Fulfillment",
    //         email: "",
    //         phone: "",
    //         ext: "",
    //         address1: "",
    //         address2: "",
    //         unit: "",
    //         postal: "",
    //         city: "",
    //         province: "",
    //         country: "Canada",
    //         promotions: true,
    //         updates: true,
    //         newsletters: true,
    //     },
    // });

    function onSubmit(data: FormValues) {
        console.log(data);
    }
    const { data: user, isLoading, error } = useUser()
    const getUserQuery = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    })
    useEffect(() => {
        if (user) console.log("user updated", user)
        getUserQuery.refetch()
    }, [user])
    console.log("user", user)

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <Tabs defaultValue="account" className="space-y-6">
                <TabsList className="flex flex-wrap gap-2">
                    <TabsTrigger value="account">Account Settings</TabsTrigger>
                    <TabsTrigger value="shipment">Shipment Settings</TabsTrigger>
                    <TabsTrigger value="payment">Payment Settings</TabsTrigger>
                    <TabsTrigger value="api">API Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <Tabs defaultValue="general-settings" orientation="vertical" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <TabsList className="h-max w-full gap-4">
                                    <TabsTrigger value="general-settings" className="w-max">General Settings</TabsTrigger>
                                    <TabsTrigger value="user-preference" className="w-max">User Preferences</TabsTrigger>
                                    <TabsTrigger value="email-notification" className="w-max">Email Notifications</TabsTrigger>
                                </TabsList>
                            </CardContent>
                        </Card>
                        <TabsContent className="lg:col-span-3" value="general-settings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>General Settings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    General Settings Content
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </TabsContent>
            </Tabs>
        </div>
    );
}
