"use client"

import { ReactNode, useMemo, useState } from "react"
import { Search, X, UserSquare2, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AddContactModal } from "./AddContactModal"

export type AddressBookContact = {
  id: string
  name: string
  address: string
  contactInfo: string
}

type AddressBookModalProps = {
  trigger?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  contacts?: AddressBookContact[]
  recentContacts?: AddressBookContact[]
  onSelectContact?: (contact: AddressBookContact) => void
  onEditContact?: (contact: AddressBookContact) => void
  onGoToAddressBook?: () => void
  title?: string
}

const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")]

const defaultContacts: AddressBookContact[] = [
  {
    id: "1",
    name: "American Renolit NORTH",
    address: "301 Enterprise Drive, Unit 2,\nLa Porte, IN,\n46350, United States",
    contactInfo: "Shipping Clerk\n(219)-344-5676",
  },
  {
    id: "2",
    name: "American Select Tubing (AST Filaments)",
    address: "4005 Dewitt Ave.,\nMattoon, IL,\n61938, United States",
    contactInfo: "Shipping\nwsimpson@select-canada.com\n1 217-234-7300",
  },
  {
    id: "3",
    name: "Hankyu Hanshin Express (USA) Inc",
    address: "2222 W Windsor Ct,\nAddison, IL,\n60101, United States",
    contactInfo: "A Shallow@us.hh-express.com,\nhabe@ambtra.com\n630-238-6070",
  },
  {
    id: "4",
    name: "Hydraulic Production Systems Canada Ltd",
    address: "5180 Ure street,\nOldcastle, ON,\nN0R 1L0, Canada",
    contactInfo: "Rimmy\nmoazzam@ulsfreight.ca\n+1 226 759 5359",
  },
  {
    id: "5",
    name: "INTE-GRATES INC",
    address: "4 CHISHOLM COURT,\nAjax, ON,\nL1S 4N8, Canada",
    contactInfo: "Christina\nmoazzam@ulsfreight.ca\n(647) 777-3544",
  },
]

export function AddressBookModal({
  trigger,
  open,
  onOpenChange,
  contacts = defaultContacts,
  recentContacts,
  onSelectContact,
  onEditContact,
  onGoToAddressBook,
  title = "Address Book",
}: AddressBookModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const [tab, setTab] = useState<"all" | "recent">("all")
  const [search, setSearch] = useState("")
  const [letter, setLetter] = useState<string>("All")

  const isControlled = typeof open === "boolean"
  const isOpen = isControlled ? open : uncontrolledOpen

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  const effectiveRecent = useMemo(() => {
    if (recentContacts) return recentContacts
    return contacts.slice(0, Math.min(10, contacts.length))
  }, [contacts, recentContacts])

  const visible = useMemo(() => {
    const source = tab === "recent" ? effectiveRecent : contacts
    const q = search.trim().toLowerCase()
    return source.filter((c) => {
      const matchesSearch =
        q.length === 0 ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.contactInfo.toLowerCase().includes(q)

      const matchesLetter =
        letter === "All" ? true : c.name.trim().toUpperCase().startsWith(letter)

      return matchesSearch && matchesLetter
    })
  }, [contacts, effectiveRecent, letter, search, tab])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent className="sm:max-w-[980px] p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <UserSquare2 className="h-6 w-6 text-primary" />
              {title}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" aria-label="Close">
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="px-6 pt-4">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "all" | "recent")}>
            <TabsList className="bg-transparent p-0 h-auto">
              <TabsTrigger
                value="all"
                className="cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 mr-6"
              >
                All Contacts ({contacts.length})
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0"
              >
                Recent ({effectiveRecent.length})
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                {alphabet.map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setLetter(ch)}
                    className={`font-semibold ${
                      letter === ch ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>

              <div className="flex w-full sm:w-auto items-center">
                <Input
                  placeholder="Search contacts"
                  className="rounded-r-none w-full sm:w-[360px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  type="button"
                  className="rounded-l-none bg-[#0070c0] hover:bg-[#005999] px-3"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-4" />
            <TabsContent value="recent" className="mt-4" />
          </Tabs>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="mt-2 divide-y divide-border rounded-md border border-border">
            {visible.map((contact) => (
              <div
                key={contact.id}
                className="grid grid-cols-1 md:grid-cols-[1.4fr_1.2fr_180px] gap-4 p-4 bg-card hover:bg-muted/20 transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-foreground">{contact.name}</div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {contact.contactInfo}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground whitespace-pre-line">{contact.address}</div>

                <div className="flex md:flex-col items-stretch md:items-end justify-start md:justify-center gap-2">
                  <Button
                    type="button"
                    className="bg-[#0070c0] hover:bg-[#005999] text-white"
                    onClick={() => onSelectContact?.(contact)}
                  >
                    Select
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#0070c0] text-[#0070c0] hover:bg-[#0070c0]/10"
                    onClick={() => onEditContact?.(contact)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}

            {visible.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">No contacts found.</div>
            ) : null}
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t border-border bg-muted/10 sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <AddContactModal />
          </div>

          <div className="flex items-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-[120px]">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="outline"
              className="w-[160px] border-[#0070c0] text-[#0070c0] hover:bg-[#0070c0]/10"
              onClick={() => {
                onGoToAddressBook?.()
                setOpen(false)
              }}
            >
              Go To Address Book
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

