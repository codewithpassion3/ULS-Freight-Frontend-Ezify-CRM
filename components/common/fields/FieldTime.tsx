// "use client"

// import { Label } from "@/components/ui/label"
// import { memo } from "react"
// import { useFieldController } from "../useFieldController"
// import { Input } from "@/components/ui/input"
// import { FormTimeProps } from "./fields.types"

// const FormTime = memo(({ field: config }: { field: FormTimeProps }) => {
//     const { field: hourField, error: hourError } = useFieldController(config.hourName)
//     const { field: minuteField, error: minuteError } = useFieldController(config.minuteName)
//     const { field: ampmField, error: ampmError } = useFieldController(config.ampmName)
//     return (
//         <div className="space-y-2">
//             <Label className="text-xs text-muted-foreground font-medium">Ready Time*</Label>
//             <div className="flex items-center gap-2">
//                 <Input {...register("readyTimeHour")} type="number" min={0} max={11} className="w-14 px-2 text-center " />
//                 <span>:</span>
//                 <Input {...register("readyTimeMinute")} type="number" min={0} max={59} className="w-14 px-2 text-center" />

//                 <Controller
//                     name="readyTimeAmPm"
//                     control={control}
//                     render={({ field }) => (
//                         <div className="flex border border-border rounded-md bg-background w-max">
//                             <button
//                                 type="button"
//                                 onClick={() => field.onChange("AM")}
//                                 className={`cursor-pointer px-3 py-2 text-xs font-semibold ${field.value === "AM" ? "bg-muted text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
//                             >
//                                 AM
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => field.onChange("PM")}
//                                 className={`cursor-pointer px-3 py-2 text-xs font-semibold ${field.value === "PM" ? "bg-muted text-[#4aa0e3]" : "text-foreground hover:bg-muted/50"}`}
//                             >
//                                 PM
//                             </button>
//                         </div>
//                     )}
//                 />
//             </div>
//         </div>
//     )
// })

// export default FormTime