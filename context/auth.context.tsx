"use client"
import React, { createContext, useContext, ReactNode } from "react"
import { useUser } from "@/hooks/useUser"

interface AuthContextType {
    user: any; // Using any for now to match the implicit useUser return type shape if it's not exported
    isLoading: boolean;
    isPending: boolean;
    error: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: user, isLoading, isPending, error } = useUser()
    
    const value = React.useMemo(() => ({ user, isLoading, isPending, error }), [user, isLoading, isPending, error]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
