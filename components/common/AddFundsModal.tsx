import Link from "next/link"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "../ui/dialog"
import { CreditCard } from "lucide-react"



export default function AddFundsModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                        <CreditCard className="h-5 w-5" />
                        Add Funds
                    </DialogTitle>
                </DialogHeader>
                <div className="px-6 py-4 border-t bg-slate-50 gap-2 sm:justify-end">
                    <p>Insufficient funds. Please add funds to your account.</p>
                </div>
                <DialogFooter className="px-6 py-4 border-t bg-slate-50 gap-2 sm:justify-end">
                    <DialogClose asChild>
                        <Button onClick={() => onOpenChange(false)} variant="outline" className="w-24">Cancel</Button>
                    </DialogClose>
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white min-w-[120px]"
                        asChild
                    >
                        <Link href="/settings?tab=payment">
                            Add Funds
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}