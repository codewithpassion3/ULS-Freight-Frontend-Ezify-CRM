import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function LegalPolicyModal() {
    return (
        // shadcn modal
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link">Legal Policy</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Our Legal Terms</DialogTitle>
                    <DialogDescription>
                        Legal Policy
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="terms" className="w-full">
                    <TabsList>
                        <TabsTrigger value="terms" className="cursor-pointer">Terms</TabsTrigger>
                        <TabsTrigger value="privacy" className="cursor-pointer">Privacy Policy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="terms">
                        <p>Content Required for Terms</p>
                    </TabsContent>
                    <TabsContent value="privacy">
                        <p>Content Required for Privacy Policy</p>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}