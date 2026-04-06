import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { CircleSlash } from "lucide-react"

export default function EmptyUI({
    title,
    description,
    icon,
    action
}: {
    title: string
    description: string
    icon?: React.ReactNode
    action?: React.ReactNode
}) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    {icon ? icon : <CircleSlash />}
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>
                    {description}
                </EmptyDescription>
            </EmptyHeader>
            {action ? <EmptyContent className="flex-row justify-center gap-2">
                {action}
            </EmptyContent> : null}
        </Empty>
    )
}
