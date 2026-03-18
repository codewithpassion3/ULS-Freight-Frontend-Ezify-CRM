"use client";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { Loader } from "@/components/common/Loader";
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
  return (
    !isExceptionalRoute ?
      <>
        <Header />
        <main className="mx-auto max-w-[1600px] px-4 py-6 md:px-6 lg:px-8 pt-16 flex flex-col min-h-screen">
          {children}
        </main>
        <Footer />
      </> :
      <>
        {children}
      </>
  );
}