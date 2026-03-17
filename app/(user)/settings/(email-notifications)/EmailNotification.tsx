import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BellRing } from "lucide-react";

export default function EmailNotification() {
    return (
        <div >
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <BellRing />
                    Email Notification Preferences
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground font-medium">
                    Set Email Preferences
                </div>

                <div className="flex items-center gap-3">
                    <Switch id="freight-email" defaultChecked />
                    <Label htmlFor="freight-email" className="text-sm">
                        Enable optional ULS Freight email notifications
                    </Label>
                </div>
            </CardContent>
        </div>
    );
}
