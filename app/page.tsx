"use client";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { Loader } from "@/components/common/Loader";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { data, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/login");
    }
  }, [data, isLoading, router]);


  return (
    isLoading ? (
      <Loader />
    ) : (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-700">
          <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-gray-700 sm:items-start">
            <div></div>
          </main>
        </div>
        <Footer />
      </>
    )
  );
}
