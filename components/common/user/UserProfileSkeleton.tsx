import { Skeleton } from "@/components/ui/skeleton"

export function UserProfileSkeleton() {
    return (
        <div className="flex items-center justify-end gap-4">
            <div className="space-y-2 flex flex-col items-end">
                <Skeleton className="h-4 w-[110px]" />
                <Skeleton className="h-4 w-[160px]" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
        </div>
    )
}
