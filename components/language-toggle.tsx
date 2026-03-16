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

export function LanguageToggle() {
  const { data } = useUser()
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    if (data?.user?.settings?.language) {
      setLanguage(data.user.settings.language)
    }
  }, [data])

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
    setLanguage(lang)
    updateUserSettingsMutation.mutate({ language: lang })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-2 px-2"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {language === "en" ? "English" : "Français"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
          English
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}