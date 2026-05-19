// import { Dialog } from "@/components/ui/dialog"

// export default function AddSurchargesModal() {
//   const shipment = {
//     carrier: "FedEx",
//     trackingNumber: "784512369874",
//     dimensions: "24 x 18 x 12 in",
//     weight: "18 KG",
//     totalCharges: "$420.00",
//     service: "International Priority",
//   }

//   return (
//     // create a modal
//     // it should open when click on Add Surcharges button
//     // it should close when click on Close button
//     // it should have a form to add surcharges
//     // it should have a button to add more surcharges
//     // it should have a button to save surcharges
//     // it should have a table to display surcharges
//     // it should have a table to display shipment details
//     <Dialog open={true} onOpenChange={() => { }}>
      
//     <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
//       <div className="w-full max-w-4xl rounded-3xl border bg-background shadow-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b px-6 py-5">
//           <div>
//             <h2 className="text-2xl font-semibold tracking-tight">
//               Add Surcharges
//             </h2>
//             <p className="mt-1 text-sm text-muted-foreground">
//               Add additional shipment charges and descriptions.
//             </p>
//           </div>

//           <button className="rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-muted">
//             Close
//           </button>
//         </div>

//         <div className="grid gap-6 p-6 lg:grid-cols-[320px_1fr]">
//           {/* Shipment Details */}
//           <div className="rounded-2xl border bg-muted/30 p-5">
//             <h3 className="mb-5 text-lg font-semibold">Shipment Details</h3>

//             <div className="space-y-4">
//               <DetailRow label="Carrier" value={shipment.carrier} />
//               <DetailRow
//                 label="Tracking Number"
//                 value={shipment.trackingNumber}
//               />
//               <DetailRow
//                 label="Dimensions"
//                 value={shipment.dimensions}
//               />
//               <DetailRow label="Weight" value={shipment.weight} />
//               <DetailRow label="Service" value={shipment.service} />
//               <DetailRow
//                 label="Total Charges"
//                 value={shipment.totalCharges}
//                 highlight
//               />
//             </div>
//           </div>

//           {/* Surcharge Form */}
//           <div className="rounded-2xl border p-5">
//             <div className="mb-5 flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold">Surcharge Entries</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Add all applicable additional shipment charges.
//                 </p>
//               </div>

//               <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
//                 + Add More
//               </button>
//             </div>

//             <div className="space-y-5">
//               {[1, 2].map((item) => (
//                 <div
//                   key={item}
//                   className="rounded-2xl border bg-muted/20 p-5"
//                 >
//                   <div className="mb-4 flex items-center justify-between">
//                     <h4 className="text-sm font-semibold text-muted-foreground">
//                       Surcharge #{item}
//                     </h4>

//                     <button className="rounded-lg border px-3 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive hover:text-white">
//                       Remove
//                     </button>
//                   </div>

//                   <div className="grid gap-4 md:grid-cols-2">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Charge Amount
//                       </label>

//                       <div className="flex overflow-hidden rounded-xl border bg-background">
//                         <button className="flex h-11 w-11 items-center justify-center border-r text-lg font-semibold transition hover:bg-muted">
//                           -
//                         </button>

//                         <input
//                           type="number"
//                           placeholder="0.00"
//                           className="h-11 flex-1 bg-transparent px-4 outline-none"
//                         />

//                         <button className="flex h-11 w-11 items-center justify-center border-l text-lg font-semibold transition hover:bg-muted">
//                           +
//                         </button>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Surcharge Description
//                       </label>

//                       <input
//                         type="text"
//                         placeholder="Enter surcharge description"
//                         className="h-11 w-full rounded-xl border bg-background px-4 outline-none transition focus:ring-2 focus:ring-primary/30"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Footer */}
//             <div className="mt-6 flex items-center justify-end gap-3 border-t pt-5">
//               <button className="rounded-xl border px-5 py-2.5 text-sm font-medium transition hover:bg-muted">
//                 Cancel
//               </button>

//               <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
//                 Save Surcharges
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// type DetailRowProps = {
//   label: string
//   value: string
//   highlight?: boolean
// }

// function DetailRow({ label, value, highlight }: DetailRowProps) {
//   return (
//     <div className="flex items-start justify-between gap-3 rounded-xl border bg-background p-3">
//       <span className="text-sm text-muted-foreground">{label}</span>

//       <span
//         className={`text-right text-sm font-semibold ${
//           highlight ? "text-primary" : ""
//         }`}
//       >
//         {value}
//       </span>
//     </div>
//   )
// }
