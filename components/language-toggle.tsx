"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useEffect, useState } from "react"
import { useUser } from "@/hooks/useUser"
import { updateUserSettings } from "@/api/services/auth.api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { useAuth } from "@/context/auth.context"

export function LanguageToggle() {
  const { user } = useAuth()
  const [language, setLanguage] = useState("en")

  const updateUserSettingsMutation = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      toast.success("Language updated successfully")
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data?.message)
    }
  })

  const handleLanguageChange = (lang: "en" | "fr") => {
    if (user) {
      updateUserSettingsMutation.mutate({ language: lang })
    }
    setLanguage(lang)
    if (user) {
      updateUserSettingsMutation.mutate({ language: lang })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-sm font-medium text-black dark:text-white hover:text-primary/80 flex items-center gap-2 px-2"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {language === "en" ? "English" : "Français"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-max" align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          English
        </DropdownMenuItem>

        <DropdownMenuItem disabled onClick={() => handleLanguageChange("fr")}>
          Français (Coming Soon)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}