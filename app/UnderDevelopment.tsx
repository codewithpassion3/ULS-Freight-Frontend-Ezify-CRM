"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function UnderDevelopment() {
    const router = useRouter()

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md text-center shadow-xl">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold tracking-tight">
                        🚧 Under Development
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">
                        This module is currently under development.
                    </p>
                </CardHeader>

                <CardContent>
                    <div className="text-sm text-muted-foreground">
                        We're working hard to bring this feature to you soon.
                        Please check back later.
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center gap-3">
                    <Link href="/">
                        <Button>Go Home</Button>
                    </Link>

                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Go Back
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}