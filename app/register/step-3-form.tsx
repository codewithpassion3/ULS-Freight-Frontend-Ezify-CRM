"use client"

import * as React from "react"
import { Eye } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Step3FormProps {
  onBack: () => void
}

export function Step3Form({ onBack }: Step3FormProps) {
  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Normally we'd dispatch to API here
    // Redirect to login on success
    router.push('/login')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
         <div className="space-y-2">
           <Label htmlFor="username">Create a Username*</Label>
           <Input id="username" required />
         </div>

         <div className="space-y-2 relative">
           <Label htmlFor="password">Create Password*</Label>
           <div className="relative">
             <Input id="password" type="password" required className="pr-10" />
             <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
               <Eye className="h-4 w-4" />
             </button>
           </div>
           <p className="text-xs text-muted-foreground mt-1">Must be at least 8 characters</p>
         </div>

         <div className="space-y-2 relative">
           <Label htmlFor="confirm-password">Confirm Password*</Label>
           <div className="relative">
             <Input id="confirm-password" type="password" required className="pr-10" />
             <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
               <Eye className="h-4 w-4" />
             </button>
           </div>
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
          Finish Registration
        </Button>
      </div>
    </form>
  )
}
