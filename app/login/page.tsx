import Image from "next/image"
import Link from "next/link"
import { Eye, Package2, RefreshCcw } from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Left Column - Image Background */}
      <div className="hidden lg:relative lg:flex lg:flex-col justify-center items-center">
        <Image
          src="/login-bg.png"
          alt="Shipping Simplfied"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-4xl font-bold text-white tracking-tight">
          Shipping Simplified
        </h1>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 h-screen overflow-y-auto bg-background">
        <div className="mx-auto w-full max-w-[400px] flex flex-col justify-between min-h-full py-8">

          {/* Header Area */}
          <div className="flex items-center justify-between mb-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Package2 className="h-6 w-6" />
              <span>ULS FREIGHT</span>
            </Link>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ModeToggle />
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                To access your ULS FREIGHT account, sign in below.
              </h2>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username*</Label>
                  <Input id="username" placeholder="" required />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password*</Label>
                  <div className="relative">
                    <Input id="password" type="password" required className="pr-10" />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm font-medium leading-none cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* reCAPTCHA Mockup */}
              <div className="border border-border rounded bg-card p-3 flex grow items-center justify-between w-[300px] mt-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 border-2 border-muted-foreground rounded bg-background"></div>
                  <span className="text-sm font-medium text-foreground">I'm not a robot</span>
                </div>
                <div className="flex flex-col items-center">
                  <RefreshCcw className="h-6 w-6 text-primary mb-1" />
                  <span className="text-[10px] text-muted-foreground text-center">reCAPTCHA<br />Privacy - Terms</span>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6 bg-[#4ba3d5] hover:bg-[#388bbd] text-white py-6 text-lg font-semibold rounded-md">
                Start Shipping!
              </Button>
            </form>
          </div>

          {/* Footer Area */}
          <div className="mt-16 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="#" className="text-primary hover:underline font-medium">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
