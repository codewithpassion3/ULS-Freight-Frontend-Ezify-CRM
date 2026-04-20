"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Delete, Trash2, Plus, Copy, X } from "lucide-react"

interface ReqItem {
    id: number
    length: string
    width: string
    height: string
    weight: string
    commodity: string
}

export const NmfcCodeRequestModal = () => {
    const [open, setOpen] = useState(false)
    const [unit, setUnit] = useState<"IMPERIAL" | "METRIC">("IMPERIAL")
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [phone, setPhone] = useState("")
    const [ext, setExt] = useState("")
    
    const [items, setItems] = useState<ReqItem[]>([
        { id: Date.now(), length: "", width: "", height: "", weight: "", commodity: "" }
    ])

    const handleQuantityChange = (val: string) => {
        const qty = parseInt(val, 10)
        const currentCount = items.length
        if (qty > currentCount) {
            const added = Array.from({ length: qty - currentCount }).map(() => ({
                id: Date.now() + Math.random(),
                length: "", width: "", height: "", weight: "", commodity: ""
            }))
            setItems([...items, ...added])
        } else if (qty < currentCount) {
            setItems(items.slice(0, qty))
        }
    }

    const updateItem = (id: number, field: keyof ReqItem, value: string) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
    }

    const addItem = () => {
        setItems([...items, { id: Date.now(), length: "", width: "", height: "", weight: "", commodity: "" }])
    }
    
    const duplicateAllAsFirst = () => {
        if (items.length > 0) {
            const first = items[0]
            setItems(items.map(item => ({ ...item, length: first.length, width: first.width, height: first.height, weight: first.weight, commodity: first.commodity })))
        }
    }

    const clearItems = () => {
        setItems(items.map(item => ({ ...item, length: "", width: "", height: "", weight: "", commodity: "" })))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log("NMFC Request Submitted:", { name, email, company, phone, ext, unit, items })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <a href="#" onClick={(e) => { e.preventDefault(); setOpen(true); }} className="text-blue-500 hover:underline">
                    click here
                </a>
            </DialogTrigger>
            <DialogContent className="max-w-4xl! p-0 gap-0 border-0 rounded-lg overflow-hidden bg-white">
                <DialogHeader className="p-5 border-b bg-white">
                    <DialogTitle className="text-xl font-semibold text-slate-800">
                        NMFC Code Request Form
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit}>
                    <div className="p-6 md:p-8 overflow-y-auto max-h-[75vh] bg-slate-50/50">
                        <div className="bg-white border rounded-lg p-6 shadow-sm mb-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-slate-600 font-medium mb-1.5 block">Name*</Label>
                                    <Input required value={name} onChange={e => setName(e.target.value)} className="focus-visible:ring-amber-500" />
                                </div>
                                <div>
                                    <Label className="text-slate-600 font-medium mb-1.5 block">Email Address*</Label>
                                    <Input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="focus-visible:ring-amber-500" />
                                </div>
                                <div>
                                    <Label className="text-slate-600 font-medium mb-1.5 block">Company (optional)</Label>
                                    <Input value={company} onChange={e => setCompany(e.target.value)} className="focus-visible:ring-amber-500" />
                                </div>
                                <div className="grid grid-cols-[1fr_80px] gap-4">
                                    <div>
                                        <Label className="text-slate-600 font-medium mb-1.5 block">Contact Phone Number*</Label>
                                        <Input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="focus-visible:ring-amber-500" />
                                    </div>
                                    <div>
                                        <Label className="text-slate-600 font-medium mb-1.5 block">Ext.</Label>
                                        <Input value={ext} onChange={e => setExt(e.target.value)} className="focus-visible:ring-amber-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border rounded-lg p-6 shadow-sm mt-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <Label className="text-slate-600 font-medium mb-1.5 block">Quantity</Label>
                                    <Select value={items.length.toString()} onValueChange={handleQuantityChange}>
                                        <SelectTrigger className="w-24">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <RadioGroup value={unit} onValueChange={(val: "IMPERIAL" | "METRIC") => setUnit(val)} className="flex space-x-6 pt-6 sm:pt-0">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="METRIC" id="nmfc-metric" className={unit === "METRIC" ? "text-amber-500 border-amber-500" : ""} />
                                        <Label htmlFor="nmfc-metric" className={`cursor-pointer ${unit === "METRIC" ? "font-semibold text-slate-800" : "font-normal text-slate-500"}`}>
                                            Metric <span className="hidden sm:inline">(cm & kg)</span>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="IMPERIAL" id="nmfc-imperial" className={unit === "IMPERIAL" ? "text-amber-500 border-amber-500" : ""} />
                                        <Label htmlFor="nmfc-imperial" className={`cursor-pointer ${unit === "IMPERIAL" ? "font-semibold text-slate-800" : "font-normal text-slate-500"}`}>
                                            Imperial <span className="hidden sm:inline">(in & lbs)</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="overflow-x-auto pb-4">
                                <div className="min-w-[700px]">
                                    <div className="grid grid-cols-[40px_100px_100px_100px_120px_1fr] items-center gap-3 border-b border-blue-200 pb-3 mb-4">
                                        <div className="text-sm font-semibold text-slate-700 text-center">#</div>
                                        <div className="text-sm font-semibold text-slate-700">Length ({unit === "IMPERIAL" ? "in" : "cm"})*</div>
                                        <div className="text-sm font-semibold text-slate-700">Width ({unit === "IMPERIAL" ? "in" : "cm"})*</div>
                                        <div className="text-sm font-semibold text-slate-700">Height ({unit === "IMPERIAL" ? "in" : "cm"})*</div>
                                        <div className="text-sm font-semibold text-slate-700">Weight ({unit === "IMPERIAL" ? "lbs" : "kg"})*</div>
                                        <div className="text-sm font-semibold text-slate-700">Commodity*</div>
                                    </div>

                                    {items.map((item, idx) => (
                                        <div key={item.id} className="grid grid-cols-[40px_100px_100px_100px_120px_1fr] items-center gap-3 mb-3">
                                            <div className="text-center font-medium text-slate-600">{idx + 1}</div>
                                            <Input required type="number" value={item.length} onChange={e => updateItem(item.id, "length", e.target.value)} placeholder={unit === "IMPERIAL" ? "L" : "L"} className="text-center focus-visible:ring-amber-500" />
                                            <Input required type="number" value={item.width} onChange={e => updateItem(item.id, "width", e.target.value)} placeholder={unit === "IMPERIAL" ? "W" : "W"} className="text-center focus-visible:ring-amber-500" />
                                            <Input required type="number" value={item.height} onChange={e => updateItem(item.id, "height", e.target.value)} placeholder={unit === "IMPERIAL" ? "H" : "H"} className="text-center focus-visible:ring-amber-500" />
                                            <Input required type="number" value={item.weight} onChange={e => updateItem(item.id, "weight", e.target.value)} placeholder={unit === "IMPERIAL" ? "lbs" : "kg"} className="text-center focus-visible:ring-amber-500" />
                                            <Input required value={item.commodity} onChange={e => updateItem(item.id, "commodity", e.target.value)} placeholder="Describe the item(s) being shipped" className="focus-visible:ring-amber-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-end gap-6 border-b pb-6 mb-6">
                                <button type="button" onClick={duplicateAllAsFirst} className="flex items-center gap-1 text-[#0070c0] font-medium text-sm hover:underline">
                                    <Copy size={14} /> All The Same
                                </button>
                                <button type="button" onClick={clearItems} className="flex items-center gap-1 text-red-600 font-medium text-sm hover:underline">
                                    <X size={14} className="bg-red-600 text-white rounded-full p-0.5" /> Clear
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <Button type="button" variant="outline" onClick={addItem} className="border-slate-300 text-slate-700 font-semibold px-6 gap-1 hover:bg-slate-50">
                                    <Plus size={16} /> Add Item
                                </Button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-5 border-t bg-slate-50/50 sm:justify-end gap-3 rounded-b-lg">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-32 bg-white border-slate-300">
                            Cancel
                        </Button>
                        <Button type="submit" className="w-full sm:w-32 bg-[#0070c0] hover:bg-[#005f9e] text-white">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
