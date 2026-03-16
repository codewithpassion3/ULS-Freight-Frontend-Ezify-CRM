"use client"
import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header"
import { Loader } from "@/components/common/Loader";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/login");
    }
  }, [data, isLoading, router]);
  return (
    <div className="min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 pt-16 flex flex-col min-h-screen">
            {children}
          </main>
          <Footer />
        </>
      )}

    </div>
  )
}