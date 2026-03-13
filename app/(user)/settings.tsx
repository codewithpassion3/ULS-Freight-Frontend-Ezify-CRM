// "use client"
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// // import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { getUser } from "@/api/services/auth.api";
// import { useUser } from "@/hooks/useUser"
// const schema = z.object({
//     companyName: z.string().min(1),
//     contactName: z.string().min(1),
//     industry: z.string().min(1),
//     email: z.email(),
//     phone: z.string().min(7),
//     ext: z.string().optional(),
//     address1: z.string().min(1),
//     address2: z.string().optional(),
//     unit: z.string().optional(),
//     postal: z.string().min(1),
//     city: z.string().min(1),
//     province: z.string().min(1),
//     country: z.string().min(1),
//     promotions: z.boolean().default(true),
//     updates: z.boolean().default(true),
//     newsletters: z.boolean().default(true),
// });

// type FormValues = z.infer<typeof schema>;

// export default function AccountSettingsPage() {
//     // const form = useForm<FormValues>({
//     //     resolver: zodResolver(schema),
//     //     defaultValues: {
//     //         companyName: "ULS Freight Inc",
//     //         contactName: "Anmol Verma",
//     //         industry: "Fulfillment",
//     //         email: "",
//     //         phone: "",
//     //         ext: "",
//     //         address1: "",
//     //         address2: "",
//     //         unit: "",
//     //         postal: "",
//     //         city: "",
//     //         province: "",
//     //         country: "Canada",
//     //         promotions: true,
//     //         updates: true,
//     //         newsletters: true,
//     //     },
//     // });

//     function onSubmit(data: FormValues) {
//         console.log(data);
//     }
//     const { data: user, isLoading, error } = useUser()

//     console.log("user", user)

//     useEffect(() => {
//         if (user) console.log("user updated", user)
//     }, [user])
//     return (
//         <Tabs defaultValue="account" className="space-y-6">
//             <TabsList className="flex flex-wrap gap-2">
//                 <TabsTrigger value="account">Account Settings</TabsTrigger>
//                 <TabsTrigger value="shipment">Shipment Settings</TabsTrigger>
//                 <TabsTrigger value="payment">Payment Settings</TabsTrigger>
//                 <TabsTrigger value="api">API Settings</TabsTrigger>
//             </TabsList>
//             <TabsContent value="account" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                 <Card className="lg:col-span-1">
//                     <CardHeader>
//                         <CardTitle>Account Settings</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-2">
//                         <Button variant="secondary" className="w-full">General Settings</Button>
//                         <Button variant="ghost" className="w-full">User Preferences</Button>
//                         <Button variant="ghost" className="w-full">Email Notifications</Button>
//                     </CardContent>
//                 </Card>

//                 <Card className="lg:col-span-3">
//                     <CardHeader>
//                         <CardTitle>General Settings</CardTitle>
//                     </CardHeader>

//                     <CardContent>

//                     </CardContent>
//                 </Card>
//             </TabsContent>
//         </Tabs>
//     );
// }
