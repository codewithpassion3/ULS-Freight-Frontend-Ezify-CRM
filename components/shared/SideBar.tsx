import { ArrowRight, Check, Eye, FileUser, Package, Save, Truck } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
export function SideBar({ currentStep, setCurrentStep }: { currentStep: number, setCurrentStep: (step: number) => void }) {
    return (
        <div className="lg:col-span-1">
            <div className="border border-border p-5 rounded-md sticky top-24 bg-white dark:bg-card space-y-4 shadow-lg">
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="font-semibold text-lg">{currentStep === 1 ? 'Shipment Overview' : 'Quote Overview'}</h2>
                    {/* {currentStep === 1 && <span className="text-[#0070c0] text-sm flex items-center gap-1 cursor-pointer hover:underline"><Eye size={14} /> Hide</span>} */}
                </div>

                <div className="relative pt-2 pl-2">
                    {/* Stepper Lines connecting steps */}
                    <div className="absolute left-4 top-5 bottom-8 w-px bg-slate-200 dark:bg-slate-800 z-0 hidden lg:block"></div>
                    <div className="space-y-6 relative z-10">
                        <div className={`flex items-center gap-3 ${currentStep >= 1 ? "text-[#0070c0] font-medium" : "text-muted-foreground"}`}>
                            <div className={`p-1 rounded-full flex items-center justify-center text-xs ${currentStep === 1 ? 'bg-[#0070c0] text-white' : 'border-2 border-[#0070c0] text-[#0070c0] bg-white'}`}>
                                {currentStep > 1 ? <Check size={10} /> : <ArrowRight size={12} />}
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <span>{currentStep === 1 ? 'Step 1: Shipping Details' : 'Shipping Details'}</span>
                                {currentStep > 1 && <Button variant="outline" onClick={() => setCurrentStep(1)}>View</Button>}
                            </div>
                        </div>

                        <div className={`flex items-center gap-3 ${currentStep >= 2 ? "text-[#0070c0] font-medium" : "text-muted-foreground"}`}>
                            <div className={`w-5 h-5 flex shrink-0 items-center justify-center ${currentStep === 2 ? 'text-[#0070c0]' : 'text-muted-foreground'}`}>
                                {currentStep === 2 ?
                                    <div className="bg-[#0070c0] text-white rounded-full p-1"><ArrowRight size={12} /></div> :
                                    <div className="border border-muted-foreground/30 text-muted-foreground/30 rounded-full p-1 bg-white dark:bg-transparent">
                                        <Package size={12} />
                                    </div>
                                }
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <span>{currentStep === 1 ? 'Step 2: Dimensions & Weight' : 'Dimensions & Weight'}</span>
                                {currentStep > 2 && <Button variant="outline">View</Button>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-[#0070c0] pt-4 cursor-pointer hover:underline text-sm font-medium">
                            <Save size={16} />
                            <span>Save For Later</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Carousel */}


                <div className="w-full max-w-3xl border rounded-md overflow-hidden">

                    {/* Top Label */}
                    <div className="bg-[#0072BC] dark:bg-[#005085] text-white p-2 text-sm w-full">
                        <span className="rounded-2xl py-1 px-2 bg-white dark:bg-card text-[#0072BC] dark:text-white text-xs">
                            New White Glove Options
                        </span>
                    </div>

                    <Carousel className="bg-[#CBDFEE] dark:bg-card py-8">
                        <CarouselContent>

                            {/* Slide 1 */}
                            <CarouselItem>
                                <div className="flex flex-col items-center gap-4 text-center px-10">

                                    <div className="flex flex-col xl:flex-row items-center gap-4">
                                        <Image
                                            src="/logo.png"
                                            alt="Logo"
                                            width={60}
                                            height={40}
                                        />

                                        <Button>Learn More</Button>
                                    </div>

                                    <p className="text-sm font-medium max-w-md">
                                        Exciting New White Glove Delivery Options and Carriers NOW AVAILABLE.
                                    </p>

                                </div>
                            </CarouselItem>

                            {/* Slide 2 Example */}
                            <CarouselItem>
                                <div className="flex flex-col items-center gap-4 text-center px-10">
                                    <p className="text-lg font-medium max-w-md">
                                        Faster shipping options now available across Canada.
                                    </p>
                                </div>
                            </CarouselItem>

                        </CarouselContent>

                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}