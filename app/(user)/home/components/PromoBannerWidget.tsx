import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function PromoBannerWidget() {
    return (
        <div className="w-full max-w-3xl border rounded-md overflow-hidden">

            {/* Top Label */}
            <div className="bg-[#0072BC] dark:bg-[#005085] text-white p-2 text-sm w-full">
                <span className="rounded-2xl py-1 px-2 bg-white dark:bg-card text-[#0072BC] dark:text-white text-xs">
                    New White Glove Options
                </span>
            </div>

            <Carousel className="bg-[#CBDFEE] dark:bg-card py-8 relative">
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

                <CarouselPrevious className="left-2 z-50" />
  <CarouselNext className="right-2 z-50" />
            </Carousel>
        </div>
    )
}
