"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/hooks/useUser"
import { useEffect } from "react"
import { toast } from "sonner"
import { updateUserSettings } from "@/api/services/auth.api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const { data } = useUser()
  useEffect(() => {
    if (data) {
      setTheme(data.user?.settings?.dark_mode || "light")
    }
  }, [data])
  const updateUserSettingsMutation = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      toast.success("Settings updated successfully")
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data?.message)
    }
  })
  const handleThemeChange = (theme: string) => {
    setTheme(theme)
    updateUserSettingsMutation.mutate({ dark_mode: theme })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
