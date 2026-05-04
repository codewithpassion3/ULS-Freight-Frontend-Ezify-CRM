import React, { useState } from "react"
import { AlertCircle, Clock, CheckCircle2, AlertOctagon, Plus, OctagonAlert } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateReminderDialog } from "./CreateReminderDialog"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dismissNotification, getNotifications } from "@/api/services/notification.api"
import { Loader } from "@/components/common/Loader"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { cn } from "@/lib/utils"
interface Notification {
    userNotificationId: number;
    notificationId: number;
    id: number;
    type: string;
    severity: string;
    read?: boolean; // ✅ added
    payload: {
        title: string;
        message: string;
    };
    createdAt: string;
}
export default function NotificationsSummary() {
    // get notifications
    const { data, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
    });
    const queryClient = useQueryClient();
    const dismissMutation = useMutation({
        mutationFn: (id: number) => dismissNotification(id),
        onSuccess: () => {
            toast.success("Notification dismissed");

            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message);
        }
    });
    // print notifications
    // console.log(notifications);
    const renderNotification = (notif: Notification) => {
        if (!notif || !notif.payload) return null;

        const isCritical = notif.type === 'critical';
        const isWarning = notif.type === 'warning';

        return (
            <AccordionItem
                key={notif.userNotificationId || notif.id}
                value={(notif.userNotificationId || notif.id)?.toString() || ""}
                className={cn(
                    "mb-3 rounded-md border-2",
                    isCritical && "border-red-300 bg-red-50",
                    isWarning && "border-yellow-300 bg-yellow-50",
                    !isCritical && !isWarning && "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                )}
            >
                <div className="flex items-center px-4 py-3">
                    <div className="mr-3">
                        {isCritical ? <OctagonAlert /> : <AlertCircle />}
                    </div>

                    <div className="flex-1">
                        <p className="font-semibold">{notif.payload?.title || ""}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <AccordionTrigger className="[&>svg]:hidden [&_svg]:hidden">
                            View
                        </AccordionTrigger>

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => dismissMutation.mutate(notif.id)}
                        >
                            Dismiss
                        </Button>
                    </div>
                </div>

                <AccordionContent className="px-4 pb-3">
                    {notif.payload?.message || ""}
                </AccordionContent>
            </AccordionItem>
        );
    };
    return (
        <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-3 border-slate-200 dark:border-border">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">28 Items For Mar 5, 2026</h3>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <CreateReminderDialog >
                        <Button variant="outline" className="dark:bg-slate-800 dark:text-white dark:border-slate-700">
                            <Plus />
                            Create Reminder
                        </Button>
                    </CreateReminderDialog>

                </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <div className="px-4 border-slate-200 dark:border-border py-2">
                    <TabsList className="bg-transparent h-auto flex flex-wrap gap-6 text-sm w-max justify-start border-none">
                        <TabsTrigger
                            value="all"
                            className="bg-transparent font-semibold text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200  rounded-sm pb-2 -mb-[2px] shadow-none data-[state=active]:shadow-none! cursor-pointer! border-x-none! border-t-none! px-4 data-[state=active]:border-b-orange-400 "
                        >
                            All ({data?.notifications.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="urgent"
                            className="bg-transparent flex items-center gap-1.5 text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-400 rounded-sm pb-2 -mb-[2px] px-0 data-[state=active]:shadow-none! cursor-pointer!"
                        >
                            <AlertOctagon className="size-4 text-red-600" />
                            Urgent (0)
                        </TabsTrigger>
                        <TabsTrigger
                            value="new"
                            className="bg-transparent flex items-center gap-1.5 text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-400 rounded-sm pb-2 -mb-[2px] shadow-none data-[state=active]:shadow-none! cursor-pointer! px-0"
                        >
                            <AlertCircle className="size-4 text-orange-500" />
                            New (0)
                        </TabsTrigger>
                        <TabsTrigger
                            value="today"
                            className="bg-transparent flex items-center gap-1.5 text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-400 rounded-sm pb-2 -mb-[2px] shadow-none data-[state=active]:shadow-none! cursor-pointer! px-0"
                        >
                            <CheckCircle2 className="size-4 text-slate-700" />
                            Today (0)
                        </TabsTrigger>
                        <TabsTrigger
                            value="reminders"
                            className="bg-transparent flex items-center gap-1.5 text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-400 rounded-sm pb-2 -mb-[2px] shadow-none data-[state=active]:shadow-none! cursor-pointer! px-0"
                        >
                            <Clock className="size-4 text-[#0072BC]" />
                            Reminders (0)
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="all" className="m-0">
                    {isLoading ? <Loader /> : (
                        <div className="max-h-[60vh] overflow-y-auto p-3">
                            <TabsContent value="all">
                                <Accordion type="single" collapsible>
                                    {data.notifications.length > 0
                                        ? data.notifications.map(renderNotification)
                                        : <p className="text-center">No notifications</p>}
                                </Accordion>
                            </TabsContent>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="urgent" className="m-0">

                </TabsContent>

                <TabsContent value="new" className="m-0">

                </TabsContent>

                <TabsContent value="today" className="m-0">

                </TabsContent>

                <TabsContent value="reminders" className="m-0">

                </TabsContent>
            </Tabs>

        </div>
    )
}
