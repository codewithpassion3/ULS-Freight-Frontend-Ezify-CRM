"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Package, Truck, ShoppingCart, Info } from "lucide-react"

interface Step1FormProps {
  onNext: () => void
}

export function Step1Form({ onNext }: Step1FormProps) {
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validation logic would go here before advancing
    onNext()
  }

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name*</Label>
          <Input id="firstName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name*</Label>
          <Input id="lastName" required />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="businessName">Business or Corporation Name*</Label>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input id="businessName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry Type</Label>
          <Input id="industry" placeholder="ex: Furniture" />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="space-y-2 sm:col-span-5">
          <Label htmlFor="email">Email*</Label>
          <Input id="email" type="email" placeholder="example@email.com" required />
        </div>
        <div className="space-y-2 sm:col-span-4">
          <Label htmlFor="phone">Phone Number*</Label>
          <Input id="phone" type="tel" required />
        </div>
        <div className="space-y-2 sm:col-span-3">
          <Label htmlFor="ext">Ext.</Label>
          <Input id="ext" />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="signupCode">Sign up Code</Label>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input id="signupCode" />
        </div>
        <div className="space-y-2">
          <Label>Are you a Freight Broker?</Label>
          <RadioGroup defaultValue="no" className="flex space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="broker-no" />
              <Label htmlFor="broker-no" className="font-normal border-r border-border pr-4 cursor-pointer">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="broker-yes" />
              <Label htmlFor="broker-yes" className="font-normal cursor-pointer">Yes</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Shipping Types Custom Cards */}
      <div className="space-y-3 pt-4">
        <Label>Select all the <span className="text-primary underline cursor-pointer">shipping types</span> that apply*</Label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Custom Type Card 1 */}
          <div
            className={`flex items-center justify-center gap-2 p-3 border rounded-md cursor-pointer transition-all ${selectedTypes.includes('Pallet') ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20' : 'border-border'}`}
            onClick={() => toggleType('Pallet')}
          >
            {selectedTypes.includes('Pallet') && <div className="w-4 h-4 rounded-sm bg-green-500 text-white flex items-center justify-center text-[10px]">✓</div>}
            {!selectedTypes.includes('Pallet') && <div className="w-4 h-4 rounded-sm border border-muted-foreground"></div>}
            <span className="text-sm font-medium">Pallet</span>
            <Truck className="h-4 w-4 ml-auto text-[#103b5f]" />
          </div>

          {/* Custom Type Card 2 */}
          <div
            className={`flex items-center justify-center gap-2 p-3 border rounded-md cursor-pointer transition-all ${selectedTypes.includes('Package') ? 'border-primary shadow-sm bg-primary/5' : 'border-border'}`}
            onClick={() => toggleType('Package')}
          >
            {selectedTypes.includes('Package') && <div className="w-4 h-4 rounded-sm bg-green-500 text-white flex items-center justify-center text-[10px]">✓</div>}
            {!selectedTypes.includes('Package') && <div className="w-4 h-4 rounded-sm border border-muted-foreground"></div>}
            <span className="text-sm font-medium">Package</span>
            <Package className="h-4 w-4 ml-auto text-[#103b5f]" />
          </div>

          {/* Custom Type Card 3 */}
          <div
            className={`flex items-center justify-center gap-2 p-3 border rounded-md cursor-pointer transition-all ${selectedTypes.includes('eCommerce') ? 'border-primary shadow-sm bg-primary/5' : 'border-border'}`}
            onClick={() => toggleType('eCommerce')}
          >
            {selectedTypes.includes('eCommerce') && <div className="w-4 h-4 rounded-sm bg-green-500 text-white flex items-center justify-center text-[10px]">✓</div>}
            {!selectedTypes.includes('eCommerce') && <div className="w-4 h-4 rounded-sm border border-muted-foreground"></div>}
            <span className="text-sm font-medium text-muted-foreground">eCommerce</span>
            <ShoppingCart className="h-4 w-4 ml-auto text-[#103b5f]" />
          </div>

          {/* Custom Type Card 4 */}
          <div
            className={`flex items-center justify-center gap-2 p-3 border rounded-md cursor-pointer transition-all ${selectedTypes.includes('PTL/FTL') ? 'border-primary shadow-sm bg-primary/5' : 'border-border'}`}
            onClick={() => toggleType('PTL/FTL')}
          >
            {selectedTypes.includes('PTL/FTL') && <div className="w-4 h-4 rounded-sm bg-green-500 text-white flex items-center justify-center text-[10px]">✓</div>}
            {!selectedTypes.includes('PTL/FTL') && <div className="w-4 h-4 rounded-sm border border-muted-foreground"></div>}
            <span className="text-sm font-medium text-muted-foreground">PTL/FTL</span>
            <Truck className="h-4 w-4 ml-auto text-[#103b5f]" />
          </div>
        </div>

        {/* Conditional sub-question for Package */}
        {selectedTypes.includes('Package') && (
          <div className="mt-3 p-4 border border-primary rounded-md bg-transparent relative">
            <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6" type="button" onClick={() => toggleType('Package')}>
              <span className="text-xs">✕</span>
            </Button>
            <Label className="block mb-3 font-medium text-sm">How many <span className="font-bold">package shipments</span> do you do monthly?</Label>
            <RadioGroup defaultValue="none" className="flex flex-wrap gap-4 mt-2">
              {['< 25', '26-50', '50-100', '101-300', '> 300'].map(val => (
                <div key={val} className="flex items-center space-x-2">
                  <RadioGroupItem value={val} id={`ship-${val.replace(/\s+/g, '')}`} />
                  <Label htmlFor={`ship-${val.replace(/\s+/g, '')}`} className="font-normal cursor-pointer text-sm text-muted-foreground">{val}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit" className="bg-[#0070c0] hover:bg-[#005999] text-white px-8 py-2">
          Next Step
        </Button>
      </div>
    </form>
  )
}
