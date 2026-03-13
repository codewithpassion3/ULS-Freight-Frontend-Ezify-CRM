// otp-flow-context.tsx
"use client";
import { createContext, useContext, useState } from "react"

type Purpose = "email_verification" | "password_reset"

interface OTPFlowState {
    email?: string
    purpose?: Purpose
    token?: string
    setToken?: (token: string) => void
    setFlow: (email: string, purpose: Purpose) => void
}

const OTPFlowContext = createContext<OTPFlowState | null>(null)

export function OTPFlowProvider({ children }: { children: React.ReactNode }) {
    const [email, setEmail] = useState<string>()
    const [purpose, setPurpose] = useState<Purpose>()
    const [token, setToken] = useState<string>()

    const setFlow = (email: string, purpose: Purpose) => {
        setEmail(email)
        setPurpose(purpose)
    }


    return (
        <OTPFlowContext.Provider value={{ email, purpose, setFlow, token, setToken }}>
            {children}
        </OTPFlowContext.Provider>
    )
}

export const useOTPFlow = () => {
    const context = useContext(OTPFlowContext)
    if (!context) throw new Error("useOTPFlow must be used inside provider")
    return context
}