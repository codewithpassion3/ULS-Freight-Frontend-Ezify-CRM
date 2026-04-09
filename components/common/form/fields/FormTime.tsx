// "use client"

// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import { memo } from "react"
// import { FormRadioTypes } from "./fields.types"
// import { useFieldController } from "../useFieldController"

// type FormTimeProps = {
//     label: string
//     hourName: string
//     minuteName: string
//     ampmName: string
//     register: any
//     control: any
//     errors: any
// }

// const FormTime = ({
//     label,
//     hourName,
//     minuteName,
//     ampmName,
//     register,
//     control,
//     errors
// }: FormTimeProps) => {
//     const hourError = errors?.[hourName]
//     const minuteError = errors?.[minuteName]
//     const ampmError = errors?.[ampmName]

//     const FormTime = memo(({ field: config }: { field: FormTimeProps }) => {
//         const { field } = useFieldController(config.name)
//         return (
//             <div className="space-y-2">
//                 <Label className="text-xs text-muted-foreground font-medium">
//                     {label}
//                 </Label>

//                 <div className="flex items-center gap-2">
//                     <Input
//                         {...register(hourName, { valueAsNumber: true })}
//                         type="number"
//                         min={0}
//                         max={11}
//                         className={`w-14 px-2 text-center ${hourError ? "border-red-500" : ""}`}
//                     />

//                     <span>:</span>

//                     <Input
//                         {...register(minuteName, { valueAsNumber: true })}
//                         type="number"
//                         min={0}
//                         max={59}
//                         className={`w-14 px-2 text-center ${minuteError ? "border-red-500" : ""}`}
//                     />

//                     <Controller
//                         name={ampmName}
//                         control={control}
//                         render={({ field }) => (
//                             <div className="flex border border-border rounded-md bg-background w-max">
//                                 <button
//                                     type="button"
//                                     onClick={() => field.onChange("AM")}
//                                     className={`px-3 py-2 text-xs font-semibold ${field.value === "AM"
//                                             ? "bg-muted text-[#4aa0e3]"
//                                             : "hover:bg-muted/50"
//                                         }`}
//                                 >
//                                     AM
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => field.onChange("PM")}
//                                     className={`px-3 py-2 text-xs font-semibold ${field.value === "PM"
//                                             ? "bg-muted text-[#4aa0e3]"
//                                             : "hover:bg-muted/50"
//                                         }`}
//                                 >
//                                     PM
//                                 </button>
//                             </div>
//                         )}
//                     />
//                 </div>

//                 {(hourError || minuteError || ampmError) && (
//                     <p className="text-xs text-red-500">
//                         {hourError?.message || minuteError?.message || ampmError?.message}
//                     </p>
//                 )}
//             </div>
//         )
//     }
//         </div >
//     )
// })
// export default FormRadio