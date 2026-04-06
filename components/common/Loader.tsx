export function Loader({ className }: { className?: string }) {
    return (
        <div className={`flex flex-col gap-4 items-center justify-center ${className}`}>
            <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
        </div>
    )
}