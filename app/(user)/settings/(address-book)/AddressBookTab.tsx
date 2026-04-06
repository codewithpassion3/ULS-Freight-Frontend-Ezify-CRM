"use client"

import { useState } from "react"
import { Search, Trash2, Edit, Copy, UserSquare2, Info, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
// import { AddContactModal } from "./AddContactModalOld"
import { AddressBookTable } from "./AddressBookTable"
import { AddContactModal } from "./AddContactModal"

const mockContacts = [
  {
    id: "1",
    name: "American Renolit NORTH",
    contactName: "Shipping Clerk",
    contactId: "",
    address: "301 Enterprise Drive, Unit 2\nLa Porte, IN, 46350, US",
    contactInfo: "(219)-344-5676\n",
  },
  {
    id: "2",
    name: "American Select Tubing (AST Filaments)",
    contactName: "Shipping",
    contactId: "",
    address: "4005 Dewitt Ave.\nMattoon, IL, 61938, US",
    contactInfo: "1 217-234-7300\nwsimpson@select-canada.com",
  },
  {
    id: "3",
    name: "Hankyu Hanshin Express (USA) Inc",
    contactName: "Hiroki and Ayako",
    contactId: "",
    address: "2222 W Windsor Ct\nAddison, IL, 60101, US",
    contactInfo: "630-238-6070 x 5903\nA.Shallow@us.hh-express.com, habe@ambtra.com",
  },
  {
    id: "4",
    name: "Hydraulic Production Systems Canada Ltd",
    contactName: "Rimmy",
    contactId: "",
    address: "5180 Ure street\nOldcastle, ON, NOR 1L0, CA",
    contactInfo: "+1 226 759 5359\nmoazzam@ulsfreight.ca",
  },
  {
    id: "5",
    name: "INTE-GRATES INC",
    contactName: "Christina",
    contactId: "",
    address: "4 CHISHOLM COURT\nAjax, ON, L1S 4N8, CA",
    contactInfo: "(647) 777-3544 x 224\nmoazzam@ulsfreight.ca",
  },
  {
    id: "6",
    name: "MODULAR CLOSETS",
    contactName: "Shlomo",
    contactId: "",
    address: "1985 RUTGERS UNIVERSITY BLVD 2\nLakewood, NJ, 08701, US",
    contactInfo: "732-813-1135\nshlomo@modularclosets.com",
  },
  {
    id: "7",
    name: "Mutlimatic New Haven,",
    contactName: "Scott Vorndran",
    contactId: "",
    address: "2808 Adams Center Road\nFort Wayne, IN, 46803, US",
    contactInfo: "260-749-3700 , +1 269 519 3515\nmoazzam@ulsfreight.ca",
  },
  {
    id: "8",
    name: "PROSOL-Calgary South",
    contactName: "Recviver",
    contactId: "",
    address: "105 - 5760 9th Street SE\nCalgary, AB, T2H 1Z9, CA",
    contactInfo: "403-253-4642\nmoazzam@ulsfreight.ca",
  }
]

export function AddressBookTab() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [search, setSearch] = useState("")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(mockContacts.map((c) => c.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (checked: boolean, id: string) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((extId) => extId !== id))
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <UserSquare2 className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semiBold text-foreground">Address Book</h2>
        </div>
        <AddContactModal />
      </div>
      <AddressBookTable />
      
    </div>
  )
}
