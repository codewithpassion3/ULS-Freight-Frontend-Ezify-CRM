"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { NotebookText, BookUser, RotateCw } from "lucide-react"
import { getAllAddressBookContacts } from "@/api/services/quotes.api"
import { useDebounce } from "../../settings/(address-book)/hooks/debounce.hook"
import { AddressBookTable } from "../../settings/(address-book)/AddressBookTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
          <Button variant="outline" type="button" className="text-sm text-primary flex items-center gap-1 hover:underline">
            <span>
              <NotebookText />
            </span>
            Address Book
          </Button>
        )}
      </DialogTrigger>
      <DialogContent style={{ maxWidth: "max-content" }}>
        <DialogHeader>
          <DialogTitle>Select Address from Address Book</DialogTitle>
        </DialogHeader>
        <Tabs>
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="address-book">
              <BookUser />
              All Contacts ( {contacts.length} )
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="recent">
              <RotateCw />
              Recent
            </TabsTrigger>
          </TabsList>
          <TabsContent value="address-book">
            <AddressBookTable handleSelect={handleSelect} />
          </TabsContent>
          <TabsContent value="recent">
            <AddressBookTable type="recent" handleSelect={handleSelect} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
