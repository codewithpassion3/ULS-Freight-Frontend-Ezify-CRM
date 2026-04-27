"use client"

import React, { useEffect, useRef, useState } from "react"
import { Bell, AlertCircle, OctagonAlert } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dismissNotification, getNotifications } from "@/api/services/notification.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { Loader } from "@/components/common/Loader"

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

export default function NotificationsWidget() {
    const queryClient = useQueryClient();
    const eventSourceRef = useRef<EventSource | null>(null);

    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');

    // ✅ Fetch notifications
    const { data, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
    });

    const notifications: Notification[] = data?.notifications ?? [];

    // ✅ derived unread count (no manual state bugs)
    const unreadCount = notifications.filter(n => !n.read).length;

    // ✅ Request browser permission once
    useEffect(() => {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }, []);

    // ✅ SSE Connection
    useEffect(() => {
        connectSSE();

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    const connectSSE = () => {
        // ✅ close old connection (important)
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        setConnectionStatus('connecting');

        const companyId = 1;

        const es = new EventSource(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/stream?companyId=${companyId}`,
            { withCredentials: true }
        );

        eventSourceRef.current = es;

        es.onopen = () => {
            setConnectionStatus('connected');
            console.log("✅ SSE Connected");
        };

        es.addEventListener('notification.new', (e) => {
            const data: Notification = JSON.parse(e.data);

            console.log("🔔 New Notification:", data);

            // ✅ update react-query cache safely
            queryClient.setQueryData(["notifications"], (old: any) => {
                // console old
                console.log("Old notifications:", old);
                if (!old) return old;

                const exists = old.notifications.some(
                    (n: Notification) => (n.userNotificationId || n.id) === (data.userNotificationId || data.id)
                );
                // console exists
                console.log("Exists:", exists);
                if (exists) return old;

                return {
                    ...old,
                    notifications: [
                        { ...data, read: false }, // normalize
                        ...old.notifications,
                    ],
                };
            });

            // ✅ browser notification
            if (Notification.permission === 'granted' && data?.payload) {
                const title = data.payload.title || "New Notification";
                const message = data.payload.message || "";
                new Notification(title, {
                    body: message,
                    icon: '/favicon.ico'
                });
            }
        });

        es.onerror = (err) => {
            console.error("❌ SSE Error:", err);
            setConnectionStatus('disconnected');

            es.close();

            // ✅ reconnect safely
            setTimeout(() => {
                connectSSE();
            }, 3000);
        };
    };

    // ✅ dismiss mutation
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

    // ✅ render notification
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
                    !isCritical && !isWarning && "border-slate-200 bg-white"
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative rounded-full">
                    <Bell />

                    {notifications.length > 0 && (
                        <span className="absolute flex items-center justify-center -top-2 -right-2 text-xs bg-primary text-white h-5 w-5 rounded-full">
                            {notifications.length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[400px]">
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">
                            All ({notifications.length})
                        </TabsTrigger>
                        <TabsTrigger value="unread">
                            Unread ({unreadCount})
                        </TabsTrigger>
                    </TabsList>

                    {isLoading ? <Loader /> : (
                        <div className="max-h-[60vh] overflow-y-auto p-3">
                            <TabsContent value="all">
                                <Accordion type="single" collapsible>
                                    {notifications.length > 0
                                        ? notifications.map(renderNotification)
                                        : <p className="text-center">No notifications</p>}
                                </Accordion>
                            </TabsContent>

                            <TabsContent value="unread">
                                <Accordion type="single" collapsible>
                                    {notifications.filter(n => !n.read).length > 0
                                        ? notifications
                                            .filter(n => !n.read)
                                            .map(renderNotification)
                                        : <p className="text-center">No unread notifications</p>}
                                </Accordion>
                            </TabsContent>
                        </div>
                    )}
                </Tabs>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
