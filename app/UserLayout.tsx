"use client";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Infobar from "@/components/common/Infobar";
import { Loader } from "@/components/common/Loader";
import { useAuth } from "@/context/auth.context";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const exceptionalRoutes = ["/otp-verification", "/reset-password"];
  const pathname = usePathname();
  const isExceptionalRoute = exceptionalRoutes.includes(pathname);
  const { user, isLoading, isPending } = useAuth();
  if (isLoading || isPending || user === undefined) {
    return <Loader />
  }
  return (
    !isExceptionalRoute ?
      <>
        <Header />
        {/* <Infobar/> */}
        <main className="mx-auto container pt-20 flex flex-col min-h-screen bg-[#FAFAFA] dark:bg-[#242424]">
          {children}
        </main>
        <Footer />
      </> :
      <>
        {children}
      </>
  );
}