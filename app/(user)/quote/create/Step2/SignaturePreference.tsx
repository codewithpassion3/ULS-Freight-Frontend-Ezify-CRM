import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Info } from "lucide-react"
import { useFormContext } from "react-hook-form"

export default function SignaturePreference() {
    const { register, control, watch, setValue, formState: { errors } } = useFormContext<any>()
    return (
        <div className="border border-border rounded-md p-6 bg-white dark:bg-card space-y-4">
            <Label className="text-base font-semibold text-slate-800">Signature Preference</Label>
            <Controller
                control={control}
                name={"signature"}
                render={({ field }) => (
                    <RadioGroup
                        value={field.value || "No Signature Required"}
                        onValueChange={field.onChange}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 pt-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No Signature Required" id="sig-none" className="text-amber-500 border-amber-500" />
                            <Label htmlFor="sig-none" className="font-semibold cursor-pointer text-slate-800">No Signature Required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Signature Required" id="sig-req" />
                            <Label htmlFor="sig-req" className="font-normal cursor-pointer text-slate-500">Signature Required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Adult Signature Required" id="sig-adult" />
                            <Label htmlFor="sig-adult" className="font-normal cursor-pointer flex items-center gap-1 text-slate-500">
                                Adult Signature Required <Info size={14} className="text-slate-800" />
                            </Label>
                        </div>
                    </RadioGroup>
                )}
            />
        </div>
    )
}