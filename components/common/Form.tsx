// import { useForm } from "react-hook-form";
// import { FormFactoryProps } from "../types/form";
// import { zodResolver } from "@hookform/resolvers/zod"
// import RenderField from "./RenderField";
// import React from 'react';

// export default function formFactory({
//     schema,
//     fields,
//     onSubmit
// }: FormFactoryProps) {

//     return function GeneratedFormWithFiedsAndSchema() {
//         const { register, handleSubmit, formState: { errors } } = useForm({
//             resolver: zodResolver(schema)
//         })
//         console.log("Errors =>", errors)
//         return (
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 {
//                     fields.map((field) => (
//                         <RenderField key={field.name} name={field.name} label={field.label} type={field.type} placeholder={field.placeholder} style={field.style} register={register} error={errors[field.name]} />
//                     ))
//                 }

//                 <button type="submit" className="w-full py-3 m-3 border border-gray-500 rounded-md hover:bg-cyan-500 hover:text-white">Submit</button>
//             </form>
//         )
//     }
// }