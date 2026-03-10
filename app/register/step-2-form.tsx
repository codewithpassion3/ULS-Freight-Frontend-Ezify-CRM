"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Step2FormProps {
  onNext: () => void
  onBack: () => void
}

export function Step2Form({ onNext, onBack }: Step2FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Registered Business Address*</Label>
          <Input id="address" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unit/Floor #</Label>
          <Input id="unit" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address2">Address 2 (optional)</Label>
        <Input id="address2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postal">Postal/ZIP Code*</Label>
          <Input id="postal" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City*</Label>
          <Input id="city" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Province/State*</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on">Ontario</SelectItem>
              <SelectItem value="bc">British Columbia</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="ca">California</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Country*</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="us">United States</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="text-[#0070c0] border border-[#0070c0] hover:bg-[#0070c0]/10 bg-transparent px-8"
        >
          Previous Step
        </Button>
        <Button 
          type="submit" 
          className="bg-[#0070c0] hover:bg-[#005999] text-white px-8"
        >
          Next Step
        </Button>
      </div>
    </form>
  )
}
