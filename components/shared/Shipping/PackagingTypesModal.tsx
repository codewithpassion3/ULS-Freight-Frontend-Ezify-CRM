import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Info, Boxes, Package, Mail, Truck, Briefcase } from "lucide-react"

const packagingTypes = [
  {
    id: "pallet",
    label: "Pallet",
    content: {
      title: "Pallet",
      description: "This option applies to goods and/or boxes that are packaged and secured onto a pallet.\n\nBoxed, crated or palletized shipments weighing in excess of 75 lbs or more or with a dimension greater than 4 feet in most cases.",
      icon: <Boxes className="w-32 h-32 text-primary stroke-1" />
    }
  },
  {
    id: "package",
    label: "Package",
    content: {
      title: "Package",
      description: "Standard boxed shipments. Suitable for single or multiple items up to 75 lbs without requiring a pallet.",
      icon: <Package className="w-32 h-32 text-primary stroke-1" />
    }
  },
  {
    id: "courier_pak",
    label: "Courier Pak",
    content: {
      title: "Courier Pak",
      description: "Tear-resistant, waterproof poly mailer suited for soft goods or documents.",
      icon: <Mail className="w-32 h-32 text-primary stroke-1" />
    }
  },
  {
    id: "ftl",
    label: "FTL",
    content: {
      title: "Full Truckload (FTL)",
      description: "Dedicated truck for your large shipments. Best for high-volume or oversized freight.",
      icon: <Truck className="w-32 h-32 text-primary stroke-1" />
    }
  },
]

export const PackagingTypesModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="text-sm text-[#0070c0] flex items-center gap-1 hover:underline font-medium">
          <Info size={14} /> Shipment Types
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl! p-0 gap-0">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
            <Info size={18} className="text-gray-800" /> Packaging Types
          </DialogTitle>
        </DialogHeader>

        <div className="px-4">
          <Tabs defaultValue="pallet" className="w-full">
            <TabsList className="w-full border-b gap-2 border-gray-200 pb-0 ">
              {packagingTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="text-sm cursor-pointer pb-2 data-[state=active]:font-medium text-gray-500 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10! data-[state=active]:text-primary hover:text-gray-700"
                >
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="p-6 border rounded-md my-4 shadow-sm bg-white">
              {packagingTypes.map((type) => (
                <TabsContent key={type.id} value={type.id} className="mt-0">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="shrink-0 flex items-center justify-center bg-gray-50 p-4 rounded-xl shadow-inner w-48 h-40">
                      {type.content.icon}
                    </div>
                    <div className="flex-1 py-2">
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">{type.content.title}</h3>
                      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-600">
                        {type.content.description}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        <div className="p-4 border-t flex justify-end bg-gray-50/50 rounded-b-xl">
          <DialogClose asChild>
            <Button variant="outline" className="w-24 bg-white hover:bg-gray-50">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
