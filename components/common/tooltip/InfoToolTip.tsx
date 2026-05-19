import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

interface Props {
    message?: string;
    tooltipIcon?: React.ReactNode;
}

export default function InfoToolTip({ message, tooltipIcon }: Props) {
    return (

        <TooltipProvider>
            <Tooltip >
                <TooltipTrigger className="cursor-pointer">
                    {tooltipIcon || <Info size={16} className="" />}
                </TooltipTrigger>
                <TooltipContent side="bottom" className="shadow-lg">
                    <p>{message || "?"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}