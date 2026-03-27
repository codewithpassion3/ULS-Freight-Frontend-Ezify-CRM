import { ArrowRight, Check, Eye, FileUser, Package, Save, Truck } from "lucide-react"

export function SideBar({ currentStep, setCurrentStep }: { currentStep: number, setCurrentStep: (step: number) => void }) {
    return (
        <div className="lg:col-span-1">
            <div className="border border-border p-5 rounded-md sticky top-20 bg-white dark:bg-card space-y-4 shadow-lg">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="font-semibold text-lg">{currentStep === 1 ? 'Shipment Overview' : 'Quote Overview'}</h2>
                    {currentStep === 1 && <span className="text-[#0070c0] text-sm flex items-center gap-1 cursor-pointer hover:underline"><Eye size={14} /> Hide</span>}
                </div>

                <div className="relative pt-2 pl-2">
                    {/* Stepper Lines connecting steps */}
                    <div className="absolute left-4 top-5 bottom-8 w-px bg-slate-200 dark:bg-slate-800 z-0 hidden lg:block"></div>
                    <div className="space-y-6 relative z-10">
                        <div className={`flex items-center gap-3 ${currentStep >= 1 ? "text-[#0070c0] font-medium" : "text-muted-foreground"}`}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${currentStep === 1 ? 'bg-[#0070c0] text-white' : 'border-2 border-[#0070c0] text-[#0070c0] bg-white'}`}>
                                {currentStep > 1 ? <Check size={12} /> : <ArrowRight size={12} />}
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <span>{currentStep === 1 ? 'Step 1: Shipping Details' : 'Shipping Details'}</span>
                                {currentStep > 1 && <span className="text-xs text-muted-foreground cursor-pointer hover:underline" onClick={() => setCurrentStep(1)}>View</span>}
                            </div>
                        </div>

                        <div className={`flex items-center gap-3 ${currentStep >= 2 ? "text-[#0070c0] font-medium" : "text-muted-foreground"}`}>
                            <div className={`w-5 h-5 flex shrink-0 items-center justify-center ${currentStep === 2 ? 'text-[#0070c0]' : 'text-muted-foreground'}`}>
                                {currentStep === 2 ?
                                    <div className="bg-[#0070c0] text-white rounded-md p-1"><ArrowRight size={12} /></div> :
                                    <div className="border border-muted-foreground/30 text-muted-foreground/30 rounded-md p-1 bg-white dark:bg-transparent">
                                        <Package size={12} />
                                    </div>
                                }
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <span>{currentStep === 1 ? 'Step 2: Dimensions & Weight' : 'Dimensions & Weight'}</span>
                                {currentStep > 2 && <span className="text-xs text-muted-foreground cursor-pointer hover:underline">View</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-muted-foreground/50">
                            <div className="w-5 h-5 border border-muted-foreground/30 text-muted-foreground/30 rounded-md p-1 bg-white dark:bg-transparent flex items-center justify-center">
                                <FileUser size={12} />
                            </div>
                            <span>{currentStep === 1 ? 'Step 3: Send Request' : 'Send Request'}</span>
                        </div>

                        <div className="flex items-center gap-3 text-[#0070c0] pt-4 cursor-pointer hover:underline text-sm font-medium">
                            <Save size={16} />
                            <span>Save For Later</span>
                        </div>
                    </div>
                </div>

                {currentStep === 2 && (
                    <div className="mt-8 bg-amber-100 p-4 rounded-md">
                        <div className="bg-white rounded max-w-min whitespace-nowrap px-2 py-0.5 text-xs font-bold border border-amber-300 mb-2">DDP Available</div>
                        <div className="flex items-center gap-2 justify-center py-4 px-2">
                            <span className="text-muted-foreground cursor-pointer">‹</span>
                            <div className="text-center text-sm font-medium">
                                <div className="flex justify-center mb-2 items-center font-bold text-slate-800 gap-1"><span className="text-blue-600 bg-slate-800 rounded-sm p-0.5"><Truck size={12} /></span> FREIGHTCOM</div>
                                Simplify cross-border shipping with all duties and taxes handled upfront. No surprises, no hidden costs.
                            </div>
                            <span className="text-muted-foreground cursor-pointer">›</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}