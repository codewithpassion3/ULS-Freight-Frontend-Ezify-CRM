"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md text-center shadow-xl">
                <CardHeader>
                    <CardTitle className="text-6xl font-bold tracking-tight">
                        404
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                </CardHeader>

                <CardContent>
                    <div className="text-sm text-muted-foreground">
                        It might have been moved, deleted, or you typed the wrong URL.
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center gap-3">
                    <Link href="/">
                        <Button>Go Home</Button>
                    </Link>

                    <Button
                        variant="outline"
                        onClick={(() => router.back())}
                    >
                        Go Back
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}