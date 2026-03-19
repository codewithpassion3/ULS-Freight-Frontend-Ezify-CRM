import Image from "next/image";

export function Loader() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
            {/* <Image src="/logo.png" alt="ULS Freight" width={200} height={200} /> */}
            <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
        </div>
    )
}