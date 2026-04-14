import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MyPackages } from "./MyPackages";
import { PackageOpen } from "lucide-react";

export default function PackageSelectionModal({ selectedPackage }: { selectedPackage: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link"><PackageOpen /> My Packages</Button>
            </DialogTrigger>
            <DialogContent>
                <MyPackages selectedPackage={selectedPackage}/>
            </DialogContent>
        </Dialog>
    )
}