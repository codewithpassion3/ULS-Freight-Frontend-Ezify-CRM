import React, { useState } from "react"
import { AlertCircle, Clock, CheckCircle2, AlertOctagon, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateReminderDialog } from "./CreateReminderDialog"
import { Button } from "@/components/ui/button"

export default function NotificationsSummary() {
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
                            className="bg-transparent font-semibold text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200  rounded-none pb-2 -mb-[2px] shadow-none data-[state=active]:shadow-none! cursor-pointer! border-x-none! border-t-none! px-4 data-[state=active]:border-b-orange-400 data-[state=active]:border-b-2"
                        >
                            All (28)
                        </TabsTrigger>
                        <TabsTrigger
                            value="urgent"
                            className="bg-transparent flex items-center gap-1.5 text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-400 rounded-none pb-2 -mb-[2px] px-0 data-[state=active]:shadow-none! cursor-pointer!"
                        >
                            <AlertOctagon className="size-4 text-red-600" />
                            Urgent (4)
                        </TabsTrigger>
                        <TabsTrigger
                            value="new"
                            className="bg-transparent flex items-center gap-1.5 text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-400 rounded-none pb-2 -mb-[2px] shadow-none data-[state=active]:shadow-none! cursor-pointer! px-0"
                        >
                            <AlertCircle className="size-4 text-orange-500" />
                            New (22)
                        </TabsTrigger>
                        <TabsTrigger
                            value="today"
                            className="bg-transparent flex items-center gap-1.5 text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-400 rounded-none pb-2 -mb-[2px] shadow-none data-[state=active]:shadow-none! cursor-pointer! px-0"
                        >
                            <CheckCircle2 className="size-4 text-slate-700" />
                            Today (0)
                        </TabsTrigger>
                        <TabsTrigger
                            value="reminders"
                            className="bg-transparent flex items-center gap-1.5 text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-800 dark:data-[state=active]:text-slate-200 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-400 rounded-none pb-2 -mb-[2px] shadow-none data-[state=active]:shadow-none! cursor-pointer! px-0"
                        >
                            <Clock className="size-4 text-[#0072BC]" />
                            Reminders (0)
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="all" className="m-0">
                    <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50">
                        <button className="text-sm font-medium text-[#0072BC] dark:text-[#3da9fc] hover:underline flex items-center gap-1.5">
                            View 28 Notifications <CheckCircle2 className="size-4" />
                        </button>
                    </div>
                </TabsContent>

                <TabsContent value="urgent" className="m-0">
                    <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50">
                        <button className="text-sm font-medium text-[#0072BC] dark:text-[#3da9fc] hover:underline flex items-center gap-1.5">
                            View 4 Urgent Notifications <CheckCircle2 className="size-4" />
                        </button>
                    </div>
                </TabsContent>

                <TabsContent value="new" className="m-0">
                    <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50">
                        <button className="text-sm font-medium text-[#0072BC] dark:text-[#3da9fc] hover:underline flex items-center gap-1.5">
                            View 22 New Notifications <CheckCircle2 className="size-4" />
                        </button>
                    </div>
                </TabsContent>

                <TabsContent value="today" className="m-0">
                    <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50">
                        <p className="text-sm text-slate-500 dark:text-slate-400">No new items today.</p>
                    </div>
                </TabsContent>

                <TabsContent value="reminders" className="m-0">
                    <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50">
                        <p className="text-sm text-slate-500 dark:text-slate-400">No pending reminders.</p>
                    </div>
                </TabsContent>
            </Tabs>

        </div>
    )
}
