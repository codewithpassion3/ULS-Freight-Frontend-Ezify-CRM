"use client"

import * as React from "react"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const [language, setLanguage] = React.useState("English")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2 px-2">
          <Globe className="h-4 w-4" />
          {language !== "English" ? "Français" : "English"} {/* Shows alternative language as the trigger label */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("English")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Français")}>
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
