"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { getAllAddressBookContacts } from "@/api/services/quotes.api"
import { useDebounce } from "../../settings/(address-book)/hooks/debounce.hook"

type SelectAddressBookModalProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (contact: any) => void;
  triggerButton?: React.ReactNode;
}

export function SelectAddressBookModal({ onSelect, triggerButton }: SelectAddressBookModalProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)
  
  const { data: addressBook, isLoading, isPending } = useQuery({
    queryKey: ["contacts", debouncedSearch],
    queryFn: () => getAllAddressBookContacts({ search: debouncedSearch }),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (contact: any) => {
    onSelect(contact)
    setOpen(false)
  }

  const contacts = addressBook?.data ?? []
  const loading = isLoading || isPending

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <button type="button" className="text-sm text-primary flex items-center gap-1 hover:underline">
            <span className="bg-primary text-white p-0.5 rounded-sm text-[10px]">book</span> Address Book
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Select Address from Address Book</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center">
            <Input
              placeholder="Search Contacts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-r-none"
            />
            <Button className="rounded-l-none bg-[#0070c0] hover:bg-[#005999] px-3">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="border rounded-md max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted sticky top-0">
                  <tr>
                    <th className="p-3 font-semibold">Company/Name</th>
                    <th className="p-3 font-semibold">Contact</th>
                    <th className="p-3 font-semibold">Location</th>
                    <th className="p-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    contacts.map((contact: any) => (
                      <tr key={contact.id} className="border-t hover:bg-muted/50">
                        <td className="p-3">
                          <div className="font-medium">{contact.companyName}</div>
                          <div className="text-xs text-muted-foreground">{contact.email}</div>
                        </td>
                        <td className="p-3">
                          <div>{contact.contactName}</div>
                          <div className="text-xs text-muted-foreground">{contact.phoneNumber}</div>
                        </td>
                        <td className="p-3">
                          {contact.address?.address1}, {contact.address?.city}, {contact.address?.state} {contact.address?.postalCode}
                        </td>
                        <td className="p-3 text-right">
                          <Button size="sm" onClick={() => handleSelect(contact)} className="bg-[#0070c0] hover:bg-[#005999]">Select</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-muted-foreground">
                        No contacts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
