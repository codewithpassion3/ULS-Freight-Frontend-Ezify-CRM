import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Speech } from "lucide-react";

export default function Feedback(){
    return(
        <Dialog>
            <DialogTrigger className="cursor-pointer text-primary flex gap-2 items-center">
                <Speech />
                Give us feedback
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription>
                        Please provide your feedback
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>    
    )
}