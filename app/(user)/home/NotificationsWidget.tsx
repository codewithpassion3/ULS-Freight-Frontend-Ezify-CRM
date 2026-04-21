"use client"

import React, { useEffect, useRef, useState } from "react"
import { Bell, X, AlertCircle, Info, OctagonAlert, ChevronDown, BellDot } from "lucide-react"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
    payload: {
        title: string;
        message: string;
        actionUrl?: string;
        entityType?: string;
        entityId?: number;
        metaData?: any;
    };
    createdAt: string;
    actorId?: number;
}

export default function NotificationsWidget() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
    const [clientId, setClientId] = useState<string>('');
    const [unreadCount, setUnreadCount] = useState(0);
    const eventSourceRef = useRef<EventSource | null>(null);
    const queryClient = useQueryClient();
    // get all notifications from api using tanstack query
    const { data: notificationsListing, isLoading, isPending, error } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => getNotifications(),
    });




    useEffect(() => {
        connectSSE();

        // Cleanup on unmount
        return () => {
            eventSourceRef.current?.close();
        };
    }, []);

    const connectSSE = () => {
        setConnectionStatus('connecting');

        // Replace with your actual companyId or get from context
        const companyId = 1;
        const es = new EventSource(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/stream?companyId=${companyId}`,
            { withCredentials: true } // Important for cookie-based auth
        );

        eventSourceRef.current = es;

        // Connection opened
        es.onopen = () => {
            setConnectionStatus('connected');
            console.log(':white_check_mark: SSE Connected');
        };

        // Handle specific events
        es.addEventListener('connected', (e) => {
            const data = JSON.parse(e.data);
            setClientId(data.clientId);
            console.log(':link: Session:', data);
        });

        // Handle new notifications
        es.addEventListener('notification.new', (e) => {
            const data: Notification = JSON.parse(e.data);
            console.log(':bell: New Notification:', data);

            setNotifications(prev => [data, ...prev]);
            setUnreadCount(prev => prev + 1);

            // Show browser notification if permitted
            if (Notification.permission === 'granted') {
                new Notification(data.payload.title, {
                    body: data.payload.message,
                    icon: '/favicon.ico'
                });
            }
        });

        // Default message handler (fallback)
        es.onmessage = (e) => {
            console.log(':incoming_envelope: Raw message:', e.data);
        };

        // Error/Disconnect
        es.onerror = (error) => {
            console.error(':x: SSE Error:', error);
            setConnectionStatus('disconnected');
            es.close();

            // Auto-reconnect after 3 seconds
            setTimeout(() => {
                console.log(':arrows_counterclockwise: Attempting reconnect...');
                connectSSE();
            }, 3000);
        };
    };

    const markAsRead = async (userNotificationId: number) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/${userNotificationId}/read`, {
                method: 'POST',
                credentials: 'include'
            });
            setUnreadCount(prev => Math.max(0, prev - 1));

            // Update local state to show as read
            setNotifications(prev =>
                prev.map(n =>
                    n.userNotificationId === userNotificationId
                        ? { ...n, read: true }
                        : n
                )
            );
        } catch (err) {
            console.error('Failed to mark as read:', err);
        }
    };

    const requestBrowserPermission = () => {
        Notification.requestPermission();
    };

    const clearNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);
    };
    // dismiss notification mutation

    const dismissMutation = useMutation({
        mutationFn: (id: number) => dismissNotification(id),
        onSuccess: () => {
            toast.success("Notification dismissed successfully")
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data.message)
        }
    })

    const allNotifications = [
        ...notifications,
        ...(notificationsListing?.notifications || [])
    ].filter(
        (n, i, arr) =>
            arr.findIndex(x => x.userNotificationId === n.userNotificationId) === i
    );


    const renderNotification = (notif: Notification) => {
        if (!notif || !notif.payload) return null;
        const isCritical = notif.type === 'critical'
        const isWarning = notif.type === 'warning'
        console.log(notif)
        return (
            notificationsListing?.notifications.length > 0 ?
                <AccordionItem
                    key={notif.userNotificationId}
                    value={notif.userNotificationId ? notif.userNotificationId.toString() : ""}
                    className={cn(
                        "mb-3 rounded-md border-2 transition-colors overflow-hidden bg-primary/10! text-primary border-primary!",
                        isCritical && "border-[#FDA29B] bg-[#FFFBFA] dark:bg-[#fDa29b]/10",
                        isWarning && "border-[#FEDF89] bg-[#FFFCF5] dark:bg-[#fEdF89]/10",
                        !isCritical && !isWarning && "border-slate-200 dark:border-slate-800 bg-white dark:bg-card"
                    )}
                >
                    <div className="flex items-center px-4 py-3">
                        <div className={cn(
                            "flex shrink-0 items-center justify-center size-8 rounded-full",
                            isCritical && "bg-red-100 text-[#D92D20] dark:bg-[#fDa29b]/10 dark:text-[#ff4437]",
                            isWarning && "bg-orange-100 text-[#B54708] dark:bg-[#fEdF89]/10 dark:text-[#ff4437]"
                        )}>
                            {isCritical ? <OctagonAlert className="size-5 text-primary" /> : <AlertCircle className="size-5 text-primary" />}
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                            <p className={cn(
                                "text-sm font-semibold truncate",
                                isCritical && "text-[#912018] dark:text-[#ff4437]",
                                isWarning && "text-[#93370D] dark:text-[#ff4437]"
                            )}>
                                {notif.payload.title}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <Button asChild>
                                <AccordionTrigger className="hover:no-underline [&_svg]:hidden">
                                    View
                                </AccordionTrigger>
                            </Button>
                            <Button
                                onClick={() => dismissMutation.mutate(notif.id)}
                                variant="destructive"
                            // className="text-sm font-semibold text-red-600 hover:text-red-700 underline underline-offset-2"
                            >
                                Dismiss
                            </Button>

                        </div>
                    </div>

                    <AccordionContent className="px-15 pb-4 pt-0">
                        <div className="text-sm text-slate-600 border-t border-dashed border-slate-300 dark:border-slate-800 pt-3 mt-1">
                            {notif.payload.message}
                        </div>
                    </AccordionContent>
                </AccordionItem> : ""
        )
    }

    return (

        <DropdownMenu>
            <Button asChild variant="outline" className='relative w-fit cursor-pointer rounded-full'>
                <DropdownMenuTrigger className="focus:outline-none">
                    <Bell />
                    {notifications.length > 0 ?
                        <div className='absolute -top-2 -right-2 h-5 min-w-5 px-1 bg-primary dark:bg-card rounded-full text-white text-xs flex items-center justify-center'>
                            {notifications.length}
                        </div> : ""}
                </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent className="w-max rounded-b-none">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full justify-start gap-4 cursor-pointer">
                        <TabsTrigger
                            value="all"
                            className="px-2 cursor-pointer data-[state=active]:text-primary data-[state=active]:bg-primary/10  data-[state=active]:border-primary"

                        >
                            All: {notificationsListing?.notifications.length}
                        </TabsTrigger>
                        <TabsTrigger
                            value="unread"
                            className="px-2 cursor-pointer data-[state=active]:text-primary data-[state=active]:bg-primary/10  data-[state=active]:border-primary"

                        >
                            Unread: {unreadCount}
                        </TabsTrigger>
                        <TabsTrigger
                            value="important"
                            className="px-2 cursor-pointer data-[state=active]:text-primary data-[state=active]:bg-primary/10  data-[state=active]:border-primary"

                        >
                            Important: 0
                        </TabsTrigger>
                        <TabsTrigger
                            value="news"
                            className="px-2 cursor-pointer data-[state=active]:text-primary data-[state=active]:bg-primary/10  data-[state=active]:border-primary"

                        >
                            News: 0
                        </TabsTrigger>
                    </TabsList>


                    {/* Floating Content Area */}
                    {isLoading || isPending ? <Loader /> :
                        <div className="absolute top-full -left-0.25 -right-0.25 bg-[#F8F9FA] dark:bg-card border-x border-b border-slate-200 dark:border-slate-800 rounded-b-2xl shadow-2xl z-50 flex flex-col max-h-[70vh] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
                                <TabsContent value="all" className="mt-0 focus-visible:outline-none">
                                    <Accordion type="single" collapsible className="w-full">
                                        {dismissMutation.isPending ? <Loader /> : (
                                            allNotifications.length > 0 ? (
                                                allNotifications.map(renderNotification)
                                            ) : (
                                                <p className="text-center py-10 text-slate-400">No notifications</p>
                                            )
                                        )}

                                    </Accordion>
                                </TabsContent>

                                <TabsContent value="unread" className="mt-0 focus-visible:outline-none">
                                    <Accordion type="single" collapsible className="w-full">
                                        {/* {notifications.filter(n => n.isUnread).length > 0 ? (
                                        notifications.filter(n => n.isUnread).map(renderNotification)
                                    ) : (
                                        <p className="text-center py-10 text-slate-400">No unread notifications</p>
                                    )} */}
                                    </Accordion>
                                </TabsContent>

                                <TabsContent value="important" className="mt-0 focus-visible:outline-none">
                                    <Accordion type="single" collapsible className="w-full">
                                        {/* {notifications.filter(n => n.isImportant).length > 0 ? (
                                        notifications.filter(n => n.isImportant).map(renderNotification)
                                    ) : (
                                        <p className="text-center py-10 text-slate-400">No important notifications</p>
                                    )} */}
                                    </Accordion>
                                </TabsContent>

                                <TabsContent value="news" className="mt-0 focus-visible:outline-none">
                                    <Accordion type="single" collapsible className="w-full">
                                        {/* {notifications.filter(n => n.isNews).length > 0 ? (
                                        notifications.filter(n => n.isNews).map(renderNotification)
                                    ) : (
                                        <p className="text-center py-10 text-slate-400">No news updates</p>
                                    )} */}
                                    </Accordion>
                                </TabsContent>
                            </div>

                            {/* Footer inside the floating area */}
                            {notifications.length > 0 && (
                                <div className="p-4 bg-slate-50 dark:bg-card border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                    <Button
                                        onClick={clearNotifications}
                                        variant="destructive"
                                    >
                                        Clear All
                                    </Button>
                                </div>
                            )}
                        </div>}
                </Tabs>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}