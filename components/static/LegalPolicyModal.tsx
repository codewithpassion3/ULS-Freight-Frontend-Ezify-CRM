import PrivacyPolicyPage from "@/app/privacy-policy/page"
import TermsOfUsePage from "@/app/terms/page"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function LegalPolicyModal({ children, defaultTab }: { children?: React.ReactNode, defaultTab?: "terms" | "privacy" }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children ? children : <Button variant="link">Legal Policy</Button>}
            </DialogTrigger>
            <DialogContent className="max-w-4xl!">
                <DialogHeader>
                    <DialogTitle>Our Legal Terms</DialogTitle>
                    <DialogDescription>
                        Legal Policy
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={defaultTab} className="max-w-5xl">
                    <TabsList>
                        <TabsTrigger value="terms" className="cursor-pointer">Terms</TabsTrigger>
                        <TabsTrigger value="privacy" className="cursor-pointer">Privacy Policy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="terms" className="max-h-[calc(100vh-20rem)] overflow-y-auto">
                        <TermsOfUsePage />
                    </TabsContent>
                    <TabsContent value="privacy" className="max-h-[calc(100vh-20rem)] overflow-y-auto">
                        <PrivacyPolicyPage />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}