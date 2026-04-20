import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MyPackages } from "./MyPackages";
import { PackageOpen } from "lucide-react";

export default function PackageSelectionModal({ selectedPackage }: { selectedPackage: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link"><PackageOpen /> My Packages</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl!">
                <DialogHeader>
                    <DialogTitle>My Packages</DialogTitle>
                    <DialogDescription>
                        Select a package to use for this shipment.
                    </DialogDescription>
                </DialogHeader>
                <MyPackages selectedPackage={selectedPackage} />
            </DialogContent>
        </Dialog>
    )
}