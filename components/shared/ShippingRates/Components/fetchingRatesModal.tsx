import { Loader } from '@/components/common/Loader';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

export default function FetchingRatesModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='flex items-center justify-center flex-col gap-4'>
                <DialogTitle className='text-center font-semibold text-lg'>Fetching Rates</DialogTitle>
                {/* Please wait while we fetch rates from all carriers */}
                <DialogDescription className='text-center'>
                    Please wait while we fetch rates from all carriers
                </DialogDescription>
                <Loader />
            </DialogContent>
        </Dialog>
    )
}