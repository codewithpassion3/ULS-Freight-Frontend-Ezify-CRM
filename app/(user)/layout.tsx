"use client";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { Loader } from "@/components/common/Loader";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: user, isLoading, isPending } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/login");
    }
  }, [user]);
  if (isLoading) return <Loader />
  return (
    user ?
      <>
        <Header user={user} />
        <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 pt-16 flex flex-col min-h-screen">
          {children}
        </main>
        <Footer />
      </> : ""
  );
}