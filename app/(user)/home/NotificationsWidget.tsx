"use client"

import React, { useState } from "react"
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

interface Notification {
    id: string
    type: 'critical' | 'warning' | 'info'
    title: string
    description: string
    expandedContent: string
    isUnread: boolean
    isImportant: boolean
    isNews: boolean
}

const INITIAL_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        type: "critical",
        title: "Steel, Aluminum and Copper Ex...",
        description: "Important updates regarding steel and aluminum exports.",
        expandedContent: "Due to new trade regulations, all steel, aluminum, and copper exports will require additional documentation starting next month. Please ensure all compliance forms are updated in your dashboard.",
        isUnread: false,
        isImportant: true,
        isNews: false
    },
    {
        id: "2",
        type: "critical",
        title: "FedEx Alert: Due to changing m...",
        description: "FedEx has announced changes to pricing models.",
        expandedContent: "FedEx is updating its dynamic fuel surcharge and peak season regional surcharges. These changes will impact international shipping rates effective immediately.",
        isUnread: true,
        isImportant: true,
        isNews: false
    },
    {
        id: "3",
        type: "warning",
        title: "Customs Alert: Delays...",
        description: "Expected delays at major ports due to customs backlog.",
        expandedContent: "We are seeing significant backlogs at the Port of Long Beach. Expect 3-5 days additional transit time for all incoming shipments from Asia.",
        isUnread: true,
        isImportant: false,
        isNews: false
    },
    {
        id: "4",
        type: "critical",
        title: "UPS ALERT: Please be advised t...",
        description: "UPS operational alert for regional deliveries.",
        expandedContent: "UPS is experiencing service disruptions in the Northeast region due to severe weather conditions. Deliveries may be delayed by up to 48 hours.",
        isUnread: false,
        isImportant: true,
        isNews: false
    },
    {
        id: "5",
        type: "critical",
        title: "Important Updates U....",
        description: "Universal Logistics Service system maintenance.",
        expandedContent: "The ULS dashboard will be down for scheduled maintenance this Sunday from 2 AM to 6 AM EST. Please complete all pending quotes before this window.",
        isUnread: true,
        isImportant: true,
        isNews: false
    },
    {
        id: "6",
        type: "critical",
        title: "Important UPS Shippi...",
        description: "New UPS label requirements for international cargo.",
        expandedContent: "New regulatory requirements for UPS labels are now in effect. All international cargo must include HTS codes directly on the label to avoid rejection at customs.",
        isUnread: true,
        isImportant: true,
        isNews: false
    },
    {
        id: "7",
        type: "warning",
        title: "Please be advised that ...",
        description: "Warehouse capacity notification.",
        expandedContent: "Our central hub is currently at 95% capacity. We recommend pre-booking storage space for June shipments to ensure availability.",
        isUnread: false,
        isImportant: false,
        isNews: false
    },
    {
        id: "8",
        type: "info",
        title: "Please be advised that ...",
        description: "Warehouse capacity notification.",
        expandedContent: "Our central hub is currently at 95% capacity. We recommend pre-booking storage space for June shipments to ensure availability.",
        isUnread: false,
        isImportant: false,
        isNews: false
    },

    // paste more mock data

]

export default function NotificationsWidget() {
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)
    const [isOpen, setIsOpen] = useState(true)

    const dismissNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    const dismissAll = () => {
        setNotifications([])
    }

    const unreadCount = notifications.filter(n => n.isUnread).length
    const importantCount = notifications.filter(n => n.isImportant).length
    const newsCount = notifications.filter(n => n.isNews).length

    const renderNotification = (notif: Notification) => {
        const isCritical = notif.type === 'critical'
        const isWarning = notif.type === 'warning'

        return (
            <AccordionItem
                key={notif.id}
                value={notif.id}
                className={cn(
                    "mb-3 rounded-xl border-2 transition-colors overflow-hidden",
                    isCritical && "border-[#FDA29B] bg-[#FFFBFA] dark:bg-[#fDa29b]/10",
                    isWarning && "border-[#FEDF89] bg-[#FFFCF5] dark:bg-[#fEdF89]/10",
                    !isCritical && !isWarning && "border-slate-200 dark:border-slate-800 bg-white dark:bg-card"
                )}
            >
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className={cn(
                        "flex shrink-0 items-center justify-center size-8 rounded-full",
                        isCritical && "bg-red-100 text-[#D92D20] dark:bg-[#fDa29b]/10 dark:text-[#ff4437]",
                        isWarning && "bg-orange-100 text-[#B54708] dark:bg-[#fEdF89]/10 dark:text-[#ff4437]"
                    )}>
                        {isCritical ? <OctagonAlert className="size-5" /> : <AlertCircle className="size-5" />}
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                        <p className={cn(
                            "text-sm font-semibold truncate",
                            isCritical && "text-[#912018] dark:text-[#ff4437]",
                            isWarning && "text-[#93370D] dark:text-[#ff4437]"
                        )}>
                            {notif.title}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <AccordionTrigger className="p-0 hover:no-underline [&_svg]:hidden">
                            <Button variant="outline">
                                View
                            </Button>
                        </AccordionTrigger>

                        {(isWarning || notif.isUnread) && (
                            <Button 
                                onClick={() => dismissNotification(notif.id)}
                                variant="destructive"
                                // className="text-sm font-semibold text-red-600 hover:text-red-700 underline underline-offset-2"
                            >
                                Dismiss
                            </Button>
                        )}
                    </div>
                </div>

                <AccordionContent className="px-15 pb-4 pt-0">
                    <div className="text-sm text-slate-600 border-t border-dashed border-slate-300 dark:border-slate-800 pt-3 mt-1">
                        {notif.expandedContent}
                    </div>
                </AccordionContent>
            </AccordionItem>
        )
    }

    return (

        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
                <div className='relative w-fit cursor-pointer'>
                    <Avatar className='size-9 rounded-sm'>
                        <AvatarFallback className='bg-white dark:bg-transparent rounded-full'>
                            <Bell className='size-5 bg-white dark:bg-transparent' />
                        </AvatarFallback>
                    </Avatar>
                    {notifications.length > 0 ? 
                    <div className='absolute -top-2 -right-2 h-5 min-w-5 px-1 bg-primary dark:bg-card rounded-full text-white text-xs flex items-center justify-center'>
                        {notifications.length}
                    </div> : ""}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max rounded-b-none">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full justify-start gap-4 cursor-pointer">
                        <TabsTrigger
                            value="all"
                            className="px-2 cursor-pointer data-[state=active]:text-primary data-[state=active]:bg-primary/10  data-[state=active]:border-primary"
                            
                        >
                            All: {notifications.length}
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
                            Important: {importantCount}
                        </TabsTrigger>
                        <TabsTrigger
                            value="news"
                            className="px-2 cursor-pointer data-[state=active]:text-primary data-[state=active]:bg-primary/10  data-[state=active]:border-primary"
                            
                        >
                            News: {newsCount}
                        </TabsTrigger>
                    </TabsList>


                    {/* Floating Content Area */}
                    <div className="absolute top-full -left-0.25 -right-0.25 bg-[#F8F9FA] dark:bg-card border-x border-b border-slate-200 dark:border-slate-800 rounded-b-2xl shadow-2xl z-50 flex flex-col max-h-[70vh] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
                            <TabsContent value="all" className="mt-0 focus-visible:outline-none">
                                <Accordion type="single" collapsible className="w-full">
                                    {notifications.length > 0 ? (
                                        notifications.map(renderNotification)
                                    ) : (
                                        <p className="text-center py-10 text-slate-400">No notifications</p>
                                    )}
                                </Accordion>
                            </TabsContent>

                            <TabsContent value="unread" className="mt-0 focus-visible:outline-none">
                                <Accordion type="single" collapsible className="w-full">
                                    {notifications.filter(n => n.isUnread).length > 0 ? (
                                        notifications.filter(n => n.isUnread).map(renderNotification)
                                    ) : (
                                        <p className="text-center py-10 text-slate-400">No unread notifications</p>
                                    )}
                                </Accordion>
                            </TabsContent>

                            <TabsContent value="important" className="mt-0 focus-visible:outline-none">
                                <Accordion type="single" collapsible className="w-full">
                                    {notifications.filter(n => n.isImportant).length > 0 ? (
                                        notifications.filter(n => n.isImportant).map(renderNotification)
                                    ) : (
                                        <p className="text-center py-10 text-slate-400">No important notifications</p>
                                    )}
                                </Accordion>
                            </TabsContent>

                            <TabsContent value="news" className="mt-0 focus-visible:outline-none">
                                <Accordion type="single" collapsible className="w-full">
                                    {notifications.filter(n => n.isNews).length > 0 ? (
                                        notifications.filter(n => n.isNews).map(renderNotification)
                                    ) : (
                                        <p className="text-center py-10 text-slate-400">No news updates</p>
                                    )}
                                </Accordion>
                            </TabsContent>
                        </div>

                        {/* Footer inside the floating area */}
                        {notifications.length > 0 && (
                            <div className="p-4 bg-slate-50 dark:bg-card border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <Button
                                    onClick={dismissAll}
                                    variant="destructive"
                                >
                                    Clear All
                                </Button>
                            </div>
                        )}
                    </div>
                </Tabs>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}